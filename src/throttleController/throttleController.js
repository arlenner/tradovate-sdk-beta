import { GLOBAL_CONFIG } from "../config/global.js";
import { URLS } from "../config/urls.js";
import { ThrottledSocket } from "../throttledSocket.js";
import { ThrottleEvents } from "./throttleEvents.js";
import { tryFetch, getHeaders } from "../utils/tryFetch.js";
import { Storage } from "../utils/storage.js";
import { buildApi } from "../api/index.js";
import { __rej_configs } from "./reject_config.js";

const waitForMs = ms => 
    new Promise(res => {
        setTimeout(() => res(), ms)
    });

const urls = URLS[GLOBAL_CONFIG.release];

function QItem(id, type, request) {
    this.id = id;
    this.type = type;
    this.request = request;
}

function QResp(id, resp, status) {
    this.id = id;
    this.status = status;
    this.response = resp;
}

let __rejections = { totalRejections: 0 };

export const ThrottleController = {
    _lastId: 0,
    /**@type { 'off' | 'on' | 'paused' } */
    _mode: 'off',
    _hrCt: 0,
    _minCt: 0,
    _secCt: 0,
    _lastSessionCheck: null,
    _resolving: false,
    _release: 'devel',
    _history: [],
    _totalCallsMade: 0,
    //calls per minute
    _rate: 0,
    _elapsedMs: 0,
    limitPerHour: 5000,
    limitPerMinute: 1000,
    limitPerSecond: 1000,
    verbose: false,
    auth: {
        accessToken: null,
        expiration: null,
    },
    sockets: {
        simSocket: null,
        liveSocket: null
    },
    queue: [],
}

ThrottleController.getThreshold = function() {    
    const sthresh = ThrottleController._secCt / ThrottleController.limitPerSecond;
    const mthresh = ThrottleController._minCt / ThrottleController.limitPerMinute;
    const hthresh = ThrottleController._hrCt / ThrottleController.limitPerHour;

    const max = Math.max(sthresh, mthresh, hthresh);    
    const type = 
        sthresh === max ? 'Second' 
    :   mthresh === max ? 'Minute' 
    :   hthresh === max ? 'Hour' 
    :   /*else*/          'Hour'
    ;

    const ct = 
        type === 'Hour'     ? ThrottleController._hrCt 
    :   type === 'Minute'   ? ThrottleController._minCt 
    :   /*else*/              ThrottleController._secCt
    ;

    const allowance = 
        type === 'Hour'     ? ThrottleController.limitPerHour 
    :   type === 'Minute'   ? ThrottleController.limitPerMinute 
    :   /*else*/              ThrottleController.limitPerSecond
    ;

    return { fraction: max, type, count: ct, allowance };
}

ThrottleController.clearStats = function() {
    const now = new Date().getTime();
    if(now - this._lastSessionCheck >= 60 * 60 * 1000) {
        ThrottleController._hrCt = 0;
        ThrottleController._minCt = 0;
        ThrottleController._secCt = 0;
        ThrottleController._lastSessionCheck = now;
    }
}

ThrottleController.averageRate = function() {
    return ThrottleController._totalCallsMade / (ThrottleController._elapsedMs / 60*1000)
}

ThrottleController.increment = function() {
    ThrottleController._totalCallsMade++;
    ThrottleController._rate = ThrottleController._minCt / ThrottleController.limitPerMinute;
    ThrottleController._hrCt++;
    ThrottleController._minCt++;
    ThrottleController._secCt++;
    let reason;
    if(ThrottleController._secCt >= ThrottleController.limitPerSecond) {
        reason = `Limit of ${ThrottleController.limitPerSecond}/sec reached, pausing execution.`;
        ThrottleEvents.emit('pause', reason);
    }
    if(ThrottleController._minCt >= ThrottleController.limitPerMinute) {
        reason = `Limit of ${ThrottleController.limitPerMinute}/min reached, pausing execution.`;
        ThrottleEvents.emit('pause', reason);
    }
    if(ThrottleController._hrCt >= ThrottleController.limitPerHour) {
        reason = `Limit of ${ThrottleController.limitPerHour}/hr reached, pausing execution.`;
        ThrottleEvents.emit('pause', reason);
    }
}

ThrottleController.push = function(item) {
    this.queue.push(item);
    if(ThrottleController._mode === 'paused') {
        console.log('API is paused due to rate limit. Pushing to queue.', ThrottleController.queue.length);
    }
    ThrottleEvents.emit('push', item);
}

ThrottleController.resolve = async function() {    
    if(ThrottleController._resolving || ThrottleController._mode === 'paused') return;

    ThrottleController._resolving = true;
    while(ThrottleController.queue.length > 0 && ThrottleController._mode !== 'paused') {
        //threshold limits
        const { fraction, count, type, allowance } = ThrottleController.getThreshold();

        const basis = 
            type === 'Hour'     ? ThrottleController.hourLeft 
        :   type === 'Minute'   ? ThrottleController.minLeft 
        :                         ThrottleController.secLeft
        ;

        const hour = 1000 * 60 * 60;
        const minute = 1000 * 60;
        const sec = 1000;

        //intervalTime - elapsedIntervalAmount
        const timeLeft = 
            type === 'Hour'     ? hour - (basis * hour)
        :   type === "Minute"   ? minute - (basis * minute) 
        :                         sec - basis * sec
        ;

        const callsLeft = allowance - count;

        console.log(`${type.slice(0,1)} rem.`, allowance - count, 'h/m/s rem. %', ThrottleController.hourLeft.toFixed(3), ThrottleController.minLeft.toFixed(3), ThrottleController._rate.toFixed(3), ThrottleController.averageRate().toFixed(3));

        //pre-limit section, prevent p-ticket/p-time responses
        const rUrl = getUrl(ThrottleController.queue[0]);
        console.log('rurl', rUrl);
        const rejections = __rejections[rUrl];
        const rConf = __rej_configs[rUrl] || __rej_configs['*'];
        const limit = rConf.limit;

        //if a call would exceed the failure limit, triggering p-ticket/p-time responses, prevent that call.
        if(rejections && (rejections + 1) >= limit) {
            console.warn(`[SDK Rate Limiter] Call stopped. Making call to op '${rUrl}' would exceed ${limit} failures this hour: ${rConf.message}`)
            break;
        }
        //as time remaining in the chosen period decreases, the delay decreases
        const delay = timeLeft / callsLeft;
        console.log(`${(fraction*100).toFixed(2)}% ${type} allowance. Delay ${delay}ms`);
        await waitForMs(delay);
   
        
        const item = ThrottleController.queue.pop();

        const race = setTimeout(() => {
            ThrottleEvents.emit('reject', item);
        }, 30000);

        if(item.type === 'fetch') {
            const response = await tryFetch(item.request.url, {
                ...item.request.config, 
                headers: {
                    ...item.request.config.headers, 
                    Authorization: `Bearer ${ThrottleController.Storage.getAuthResponseData().accessToken}`
                }
            });
            
            ThrottleController.increment();                    
            ThrottleEvents.emit('in', new QResp(item.id, response, response.status));
            if(response.status >= 400) {
                pushRejection(rUrl);
            }
            clearTimeout(race);
            
        } 
        else if(item.type === 'wss') {
            const socket = item.request.env === 'demo' ? ThrottleController.sockets.simSocket : ThrottleController.sockets.liveSocket;            
            let { s, d: response } = await socket.send(item.request);
            if(response === '') response = null;
            ThrottleController.increment();  
            if(s && s >= 400) {
                pushRejection(rUrl);
            }
            ThrottleEvents.emit('in', new QResp(item.id, response, s));
            clearTimeout(race);
        }

        console.log(
            'h|m|s|qlen', 
            ThrottleController._hrCt, 
            ThrottleController._minCt, 
            ThrottleController._secCt, 
            ThrottleController.queue.length, 
            __rejections
        );

        if(ThrottleController._mode === 'paused') {
            ThrottleController._resolving = false;
            break;
        }

    }
    if(ThrottleController.queue.length === 0) {
        ThrottleController._resolving = false;
    }
}

ThrottleController.resume = function() {
    ThrottleController._mode = 'on';
    if(ThrottleController.queue.length > 0) {
        ThrottleController.resolve();
    }
}

ThrottleController.pause = function(reason) {
    console.warn(reason);
    ThrottleController._mode = 'paused';
}

ThrottleController.fetch = async function(url, config) {
    const qitem = new QItem(++ThrottleController._lastId, 'fetch', { url, config: {...config, verbose: ThrottleController.verbose} });
    const promise = new Promise(async (res, rej) => {
        ThrottleEvents.on('reject', item => {
            if(item.id === qitem.id) {
                rej(item);
            }
        })
        ThrottleEvents.on('in', qin => {
            if(qin.id === qitem.id) {
                res(qin.response);
            }
        });
    });
    ThrottleController.push(qitem);
    return promise;
}

ThrottleController.wsSend = async function({url, query, body, env = 'demo'}) {
    const qitem = new QItem(++ThrottleController._lastId, 'wss', { url, query, body, env });
    const promise = new Promise(async (res, rej) => {
        ThrottleEvents.on('reject', item => {
            if(item.id === qitem.id) {
                rej(item);
            }
        })
        ThrottleEvents.on('in', qin => {
            if(qin.id === qitem.id) {
                res(qin.response);
            }
        });
    });
    ThrottleController.push(qitem);
    return promise;
}


/**
 * 
 * @param {{ id: number, type: 'fetch' | 'wss', request: any }} item 
 */
ThrottleController.handleRejections = async function(item) {
    const correctedUrl = getUrl(item);    
    console.log('correctedUrl',correctedUrl, __rejections);
    pushRejection(correctedUrl);    
}

/**
 * Start a new throttled session. Internal.
 * @param {*} credentials 
 * @param {*} param1 
 */
ThrottleController.startSession = async function(credentials, {limitPerHour, limitPerMinute, limitPerSecond, release, verbose=false} = {}) {
    __rejections = { totalRejections: 0 };
    ThrottleController._release = release;
    ThrottleController.verbose = verbose;
    ThrottleController.lastUpdatedHour = new Date().getTime();
    ThrottleController.lastUpdatedMin = new Date().getTime();
    ThrottleController.lastUpdatedSec = new Date().getTime();

    //amount of time left per period measured between 0 and 1
    ThrottleController.hourLeft = 1;
    ThrottleController.minLeft = 1;
    ThrottleController.secLeft = 1;

    const {data: auth} = await tryFetch(urls.live+'/auth/accessTokenRequest', {
        method: 'POST',
        body: credentials
    });

    //Hour reset
    const hourReset = () => {
        setTimeout(() => {
            const now = new Date().getTime();
            ThrottleController._hrCt = 0;
            ThrottleController.lastUpdatedHour = now;
            __rejections = { totalRejections: 0 };
            if(ThrottleController._mode === 'paused') {
                ThrottleEvents.emit('resume');
            }
            hourReset();
        }, 60 * 60 * 1000);
    }

    const minuteReset = () => {
        setTimeout(() => {
            const now = new Date().getTime();
            ThrottleController._minCt = 0;
            ThrottleController.lastUpdatedMin = now;
            //TEST ONLY        
            if(ThrottleController._mode === 'paused') {
                ThrottleEvents.emit('resume');
            }
            minuteReset();
        }, 60 * 1000);
    }

    const secondReset = () => {
        setTimeout(() => {
            const now = new Date().getTime();
            ThrottleController._elapsedMs += now - ThrottleController.lastUpdatedSec;
            ThrottleController._secCt = 0;
            ThrottleController.lastUpdatedSec = now;
            ThrottleController.hourLeft = ((ThrottleController.lastUpdatedHour + 60 * 60 * 1000) - now) / (60 * 60 * 1000);
            ThrottleController.minLeft = ((ThrottleController.lastUpdatedMin + 60 * 1000) - now) / (60 * 1000);
            secondReset();
        }, 1000);
    }

    const subSecondCounter = () => {
        setTimeout(() => {
            const now = new Date().getTime();
            ThrottleController.secLeft = ((ThrottleController.lastUpdatedSec + 1000) - now) / 1000;
            subSecondCounter();
        }, 100);
    }

    //start timers, hopefully this works on browsers as well since they are recursive fns instead of intervals.
    hourReset();
    minuteReset();
    secondReset();
    subSecondCounter();

    const {data:props} = await tryFetch(urls.live+'/userProperty/deps?masterid='+auth.userId, { 
        method: 'GET', 
        headers: getHeaders(auth.accessToken)
    });

    //setup logged in user limits based on props, if they are present, otherwise default to retail.
    if(props && props.length && props.length > 0) {
        let perH, perM, perS;

        if(release === 'devel') {
            perH = props.find(x => x.propertyId === 37);
            perM = props.find(x => x.propertyId === 38);
            perS = props.find(x => x.propertyId === 39);
        } else {
            perH = props.find(x => x.propertyId === 31);
            perM = props.find(x => x.propertyId === 32);
            perS = props.find(x => x.propertyId === 33);
        }

        if(perH) limitPerHour = perH.value;
        if(perM) limitPerHour = perM.value;
        if(perS) limitPerHour = perS.value;
    }
    ThrottleController.Storage = Storage(ThrottleController);

    ThrottleController.Storage.setAuthResponseData(auth);
    ThrottleController.Storage.watchTokenRenewal();

    ThrottleController.limitPerHour = limitPerHour || 5000;
    ThrottleController.limitPerMinute = limitPerMinute || 1000;
    ThrottleController.limitPerSecond = limitPerSecond || 1000;
    ThrottleController._mode = 'on';

    ThrottleController.sockets.simSocket = new ThrottledSocket(URLS[ThrottleController._release].simWss, { verbose });
    ThrottleController.sockets.liveSocket = new ThrottledSocket(URLS[ThrottleController._release].liveWss, { verbose });
    await ThrottleController.sockets.simSocket.connect(auth.accessToken);
    await ThrottleController.sockets.liveSocket.connect(auth.accessToken);

    ThrottleEvents.on('push', ThrottleController.resolve);
    ThrottleEvents.on('pause', ThrottleController.pause);
    ThrottleEvents.on('resume', ThrottleController.resume);
    ThrottleEvents.on('reject', ThrottleController.handleRejections);

    ThrottleController.api = buildApi(
        ThrottleController, 
        ThrottleController.sockets.simSocket, 
        ThrottleController.sockets.liveSocket
    );
}

export function getRejections() { return __rejections };

function getUrl(qitem) {
    return (
        qitem.type === 'fetch'  ? qitem.request.url.split('v1/')[1].split('?')[0]
    :   qitem.type === 'wss'    ? qitem.request.url
    :                             '*'
    );
}

function pushRejection(urlKey) {
    __rejections[urlKey] ||= 0;
    ++__rejections[urlKey];
    ++__rejections.totalRejections;
}