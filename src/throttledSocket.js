import { WebSocket } from "ws";

/**
 * Extremely minimal WebSocket wrapper.
 */
export class ThrottledSocket {
    url;
    ws;
    counter = 0;
    subscribers = [];
    verbose = false;

    constructor(url, config = {}) {
        this.url = url;
        this.verbose = config.verbose || false;
    }

    async connect(accessToken) {
        const ws = new WebSocket(this.url);
        ws.setMaxListeners(0);
        this.ws = ws;
        return new Promise(async (res, rej) => {
            this.ws.addEventListener('open', async () => {
                const response = await this.send({ url: 'authorize', body: accessToken });
                if(response && response.s && response.s === 200) {
                    res()
                } else {
                    rej('WebSocket authorization failed. Please check that you have a valid access token.');
                }
            });
            this.ws.addEventListener('message', () => {
                checkHeartbeat(this.ws);
            });
        });
    }

    send({url, query = '', body = ''}) {
        return new Promise((res, rej) => {
            const index = ++this.counter;
            if(this.verbose) {
                console.log(`sending: ${url}\n${index}\n${query}\n${typeof body === 'string' ? body : JSON.stringify(body)}`);
            }
            const timeout = setTimeout(() => {
                rej('Response took longer than 500 seconds.');
            }, 500 * 1000);
            const waitForResponse = (msg) => {
                const [T, data] = decodeWSMsg(msg.data);
                if(data && data.length > 0) {
                    data.forEach(datum => {
                        const { i, d } = datum;
                        if(i && i === index) {
                            clearTimeout(timeout);
                            if(d && d['p-ticket']) {
                                const time = d['p-time'];
                                console.log('RATE LIMIT ACTIVE', JSON.stringify(d, null, 2));
                                const ticket = d['p-ticket'];
                                let newBody = '';
                                if(body && body != '') {
                                    newBody = { ...body, 'p-ticket': ticket };
                                }
                                setTimeout(async () => {
                                    const dat = await this.send({ url, query, body: newBody });
                                    res(dat)
                                    this.off('message', waitForResponse);
                                }, time*1000);
                            } else {
                                res(datum);
                                this.off('message', waitForResponse);
                            }
                        }
                    });
                }
            }
            this.on('message', waitForResponse);
            this.ws.send(`${url}\n${index}\n${query}\n${typeof body === 'string' ? body : JSON.stringify(body)}`);
        });
    }

    on(type, callback) {
        const offCallback = () => {
            this.off(type, callback);
        }
        this.subscribers.push(offCallback);
        this.ws.addEventListener(type, callback);
    }
    
    off(type, callback) {
        this.ws.removeEventListener(type, callback);
        this.subscribers.splice(this.subscribers.indexOf(callback), 1);
    }

    disconnect() {
        if(this.ws && (this.ws.readyState !== WebSocket.CLOSED || this.ws.readyState !== WebSocket.CLOSING)) {
            this.ws.close(1000, 'Manual disconnect requested.');
        }
    }

    dispose() {
        this.subscribers.forEach(cb => cb());
        this.subscribers = [];
    }
}

export function decodeWSMsg (raw) {
    const T = raw[0];
    let data;
    if(raw.length > 1) {
        data = JSON.parse(raw.slice(1));
    }
    return [T, data];
};

let lastTime;
function checkHeartbeat(ws) {
    if(!lastTime) {
        lastTime = new Date().getTime()
    }
    const now = new Date().getTime();
    if(now - lastTime > 2500) {
        // console.log('[]')
        ws.send('[]');
    }
}
