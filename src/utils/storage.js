import { URLS } from "../config/urls.js";
import { tryFetch, getHeaders }  from "./tryFetch.js";
import { default as axios } from "axios";

/**
 * Runtime Caching tool. Will be emptied on a reset - no database backing.
 */
export const Storage = (app) => ({
    _app: app,
    _subscriptions: {},
    _cache: {},
    _userProductMap: [],
    clients: [],
    mode: 'prod',
    /**
     * Set the auth response data (like token expiry, admin user data, etc).
     * @param {Object} authResponse this value should be the response from the `/auth/accessTokenRequest` operation.
     */
    setAuthResponseData(authResponse) {
        this._authResponseData = authResponse;
    },

    /**
     * Retrieve auth'd admin user data
     * @returns {{ accessToken: string, expirationTime: string, passwordExpirationTime: string, userStatus: string, userId: number, name: string, hasLive: boolean }}
     */
    getAuthResponseData() {
        return this._authResponseData;
    },

    /**
     * Set the initial user cache
     * @param {Object} syncResp 
     * @param {'live' | 'demo'} mode
     */
    initCache(syncResp, mode) {
        this._cache[mode] = syncResp;
        console.log(mode, 'CACHE KEYS', Object.keys(this._cache[mode]));
    },

    /**
     * Returns the full cached store
     * @param {'live' | 'demo'} mode
     * @returns {{[k:string]:Array<{[k2:string]:any}>}}
     */
    getFullCache(mode) {
        return this._cache[mode];
    },

    /**
     * Search for an item in the local cache, returns `null` if not defined
     * @param {string} key cache field to look up
     * @param {number} id entityId to find
     * @returns {any | null}
     */
    getCachedOrDefault(key, id, shouldUseLive = false) {
        // const singlularKey = convertSingular(key);
        // console.log(Object.keys(this._cache));
        const mode = shouldUseLive ? 'live' : 'demo';
        return this._cache[mode]?.[key]?.find(e => e.id === id);
    },

    getRelatedOrHttp(key, depType, masterid, shouldUseLive = false) {
        return new Promise(async (res, rej) => {
            const mode = shouldUseLive ? 'live' : 'demo';
            let mitem = this._cache[mode]?.[key]?.find(e => e[`${depType}Id`] === masterid);
            if(!mitem) {
                console.log(key, depType, masterid, `live? ${shouldUseLive}`, 'NOT FOUND LOCALLY, MAKING REQUEST...');
                const singlularKey = convertSingular(key);
                let {data: _mitem} = await axios.get(
                    (this.mode === 'prod' ? 
                        shouldUseLive ? URLS.live : URLS.demo
                    :   shouldUseLive ? URLS.liveD : URLS.demoD)+`/${singlularKey}/deps?masterid=${masterid}`, {
                        headers: getHeaders(this.getAuthResponseData().accessToken)
                    }
                ).catch(rej)
                if(_mitem) {
                    mitem = _mitem;
                }
                res(mitem);
            }
            res(mitem);
        })
    },

    /**
     * Gets the cached entity or requests it from API
     * @param {string} key store key, ex. 'accountRiskStatuses'
     * @param {number} id entity ID
     * @param {boolean} shouldUseLive default false, just in case the data requested is live
     */
    async getCachedOrHttp(key, id, shouldUseLive = false) {
   
        console.log('[getCachedOrHttp]', key, id, 'live? '+shouldUseLive);
        const mEnt = this.getCachedOrDefault(key, id, shouldUseLive);
        const env = shouldUseLive ? 'live' : 'demo';
        if(mEnt) {
            console.log('[getCachedOrHttp] Entity found!');
            return mEnt;
        } else {
            console.log('[getCachedOrHttp] Entity found!');
            const singlularKey = convertSingular(key);
            return new Promise(async (res, rej) => {
                const {data: ent} = await axios.get(
                    (this.mode === 'prod' ? 
                        shouldUseLive ? URLS.live : URLS.demo
                    :   shouldUseLive ? URLS.liveD : URLS.demoD)+`/${singlularKey}/item?id=${id}`, {
                        headers: getHeaders(this.getAuthResponseData().accessToken)
                    }
                ).catch(rej);
                this.updateCache(key, ent, env);
                res(ent);
            });
        }
    },

    getCachedByNameOrHttp(key, name, shouldUseLive = false) {
        const singlularKey = convertSingular(key);
        const env = shouldUseLive ? 'live' : 'demo';
        const mEnt = this._cache[env][key]?.find(item => item.name === name);
        if(mEnt) {
            return mEnt;
        } else {
            return new Promise(async (res, rej) => {
                const ent = await tryFetch(
                    (this.mode === 'prod' ? 
                        shouldUseLive ? URLS.live : URLS.demo
                    :   shouldUseLive ? URLS.liveD : URLS.demoD)+`/${singlularKey}/find?name=${name}`, {
                        method: "GET",
                        headers: getHeaders(this.getAuthResponseData().accessToken)
                    }
                ).catch(rej);
                this.updateCache(key, ent, env);
                res(ent);
            });
        }
    },

    getStore(key, live = false) {
        const env = live ? 'live' : 'demo'
        const maybeStore = this._cache[env][key];
        if(maybeStore) {
            return maybeStore;
        }
        throw new Error(`Store with key '${key}' not found.`);
    },

    /**
     * 
     * @param {string} k store key, ex. 'accountRiskStatuses'
     * @param {any} item  
     * @param {'live' | 'demo'} mode
     */
    updateCache(k, item, mode) {
        // console.log(`[${mode}] Auto-updating repo '${k}', item ID ${item.id}.`)
        this._cache[mode][k] ||= [];
        const store = this._cache[mode][k];        
        const idx = store.indexOf(e => e.id === item.id);
        if(idx > -1) {
            store[idx] = item;
        } else {
            store.push(item);
        }
        
    },

    /**
     * Add an unsubscribe function to the global scope. This only exists for easy cleanup
     * @param {string} name subscription key
     * @param {() => void} disposer unsubscribe function
     */
    setGlobalSubscription(name, disposer) {
        this._subscriptions[name] = disposer;
    },

    /**
     * Disposes a subscription by its key, if it exists.
     * @param {string} name subscription key
     */
    disposeGlobalSubscription(name) {
        if(this._subscriptions[name]) {
            this._subscriptions[name]();
            delete this._subscriptions[name];
        }
    },

    /**
     * Clear the global subscriptions. 
     */
    clearGlobalSubscriptions() {
        Object.keys(this._subscriptions).forEach(k => {
            this._subscriptions[k]();
        });
        this._subscriptions = {};
    },

    /**
     * set the mode for token renewals, it is 'prod' by default
     * @param {'devel' | 'prod'} mode 
     */
    setMode(mode) {
        this.mode = mode;
    },

    watchTokenRenewal() {
        if(this._runningWatchTokenRenewal) {
            clearInterval(this._runningWatchTokenRenewal);
        }
        this._runningWatchTokenRenewal = setInterval(async () => {
            const { expirationTime, accessToken } = this.getAuthResponseData();
            const exp = new Date(expirationTime).getTime();
            const fifteenBefore = exp - 15*60*1000;
            const now = new Date().getTime();
            if(fifteenBefore - now <= 0) {           
                const url = this.mode === 'prod' ? URLS.prod.live : URLS.devel.live;
                const newAuthData = await app.fetch(url+'/auth/renewAccessToken', {
                    method: 'GET',
                    headers: getHeaders(accessToken)
                });
                this.setAuthResponseData(newAuthData);
            }
        }, 1000);
    },

});

function convertSingular(word) {
    if(word === 'userSessionStats') {
        return word;
    } else if(word.endsWith("ies")) {
        return word.slice(0, -3)+'y';
    } else if(word.endsWith('es')) {
        return word.slice(0, -2);
    } else if(word.endsWith('s')) {
        return word.slice(0, -1);
    } else {
        return word;
    }
}

