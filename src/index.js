import { buildApi } from "./api/index.js";
import { ThrottleController } from "./throttleController/throttleController.js";

let initialized = false;

const T = buildApi(ThrottleController);

/**
 * @typedef {typeof T} API
 */


const environment = {
    release: 'prod',
    initialized: false,
    syncd: false,
};

/**
 * ### Tradovate SDK
 * The Tradovate Software Development Kit is designed to help jump-start Tradovate powered projects. Whether
 * you are an individual looking to create trading tools, or a Tradovate Partner Program vendor, you will find many
 * pre-implemented and minimally-biased features:
 * - Automated API Rate-Limit throttling
 * - 
 */
export const SDK = {
    /**
     * ## Initialize the Tradovate API SDK
     * This operation will create a new session using your API Key and Credentials. It will also open and connect a WebSocket for
     * both the Live and Sim environments. 
     * 
     * **Please be aware of the implications of starting a new session**. Each user has a
     * maximum of 2 connected sessions or unique IP addresses. Opening a new session in another service will count toward this limit.
     * If a new session is opened after the quota is reached, the oldest session will be expired and subsequent requests from services
     * connected using that session's `accessToken` will return 408 and 502 errors with limited logging on our backend. 
     * If you are using fragmented services or headless services it is advised that you run a single service to manage the session
     * tokens. You can then maintain a single session and forward the `accessToken`s from your token service to dependent services.
     * 
     * ### Usage
     * 
     * ```js
     * const { api } = await SDK.initialize({
     *     name: "MyTradovateUsername",
     *     password: "SooperSecretPassword123!",
     *     appId: "MyTradovateApp",
     *     appVersion: "1.0.0",
     *     cid: 100,
     *     sec: "12345-abcdef-..."
     * });
     * 
     * const esProduct = await api.sim.product.find('ES');
     *  //=> {
     *  //     id: 799,
     *  //     name: 'ES',
     *  //     currencyId: 1,
     *  //     productType: 'Futures',
     *  //     description: 'E-Mini S&P 500',
     *  //     exchangeId: 2,
     *  //     exchangeChannelId: 4,
     *  //     contractGroupId: 2,
     *  //     riskDiscountContractGroupId: 1,
     *  //     status: 'Verified',
     *  //     months: 'HMUZ',
     *  //     valuePerPoint: 50,
     *  //     priceFormatType: 'Decimal',
     *  //     priceFormat: -2,
     *  //     tickSize: 0.25,
     *  //     allowProviderContractInfo: false,
     *  //     isMicro: false,
     *  //     marketDataSource: 'Auto',
     *  //     lookupWeight: 0,
     *  //     hasReplay: true,
     *  //     rolloverMonths: 'HMUZ'
     *  //   }
     * ```
     * @param {{name: string, password: string, cid: number, sec: string, deviceId?: string, appId: string, appVersion: string}} credentials 
     * @param {{ limitPerHour?: number, limitPerMinute?: number, limitPerSec?:number, release: 'devel' | 'prod', verbose?: boolean }} config 
     * @returns {typeof this}
     */
    async initialize (credentials, config = { release: 'prod', verbose: false }) {
        if(environment.initialized) {
            throw new Error('[TradovateSDK.initialize] Attempt to call SDK.initialize while the Tradovate SDK is already initialized.');
        }
        await ThrottleController.startSession(credentials, config);
        environment.initialized = true;
        environment.release = config.release;
        return this;
    },
    oAuthLogin: async (serverUrl) => {
        await ThrottleController.fetch(serverUrl)
    },
    /**
     * A wrapper around all Tradovate API functions
     * 
     * ### Usage
     * ```js
     * //initialize the SDK
     * const { api } = await SDK.initialize({
     *     name: "MyTradovateUsername",
     *     password: "SooperSecretPassword123!",
     *     appId: "MyTradovateApp",
     *     appVersion: "1.0.0",
     *     cid: 100,
     *     sec: "12345-abcdef-..."
     * });
     * 
     * //Request some data from the API
     * const esProduct = await api.sim.product.find('ES');
     *  //=> {
     *  //     id: 799,
     *  //     name: 'ES',
     *  //     currencyId: 1,
     *  //     productType: 'Futures',
     *  //     description: 'E-Mini S&P 500',
     *  //     exchangeId: 2,
     *  //     exchangeChannelId: 4,
     *  //     contractGroupId: 2,
     *  //     riskDiscountContractGroupId: 1,
     *  //     status: 'Verified',
     *  //     months: 'HMUZ',
     *  //     valuePerPoint: 50,
     *  //     priceFormatType: 'Decimal',
     *  //     priceFormat: -2,
     *  //     tickSize: 0.25,
     *  //     allowProviderContractInfo: false,
     *  //     isMicro: false,
     *  //     marketDataSource: 'Auto',
     *  //     lookupWeight: 0,
     *  //     hasReplay: true,
     *  //     rolloverMonths: 'HMUZ'
     *  //   }
     * ```
     * @type {API}
     */
    get api() {
        if(!environment.initialized) {
            throw new Error('[TradovateSDK.api] Attempt to access SDK.api while the Tradovate SDK not initialized.');
        }
        return ThrottleController.api;
    },
    /**
     * Subscribe to asynchronous updates from the WebSocket related to any `userId`s passed as the `users` array parameter.
     * 
     * ### Usage
     * 
     * ```js
     * //initialize the SDK
     * const { api, sync } = await SDK.initialize({
     *     name: "MyTradovateUsername",
     *     password: "SooperSecretPassword123!",
     *     appId: "MyTradovateApp",
     *     appVersion: "1.0.0",
     *     cid: 100,
     *     sec: "12345-abcdef-..."
     * });
     * 
     * //start the sync, pass your userId
     * await sync([12345]);
     * 
     * 
     * ```
     * 
     * @param {Array<number>} userIds the IDs of users to watch. Usually, this is just 1 item - your own userId.
     */
    sync: async (userIds) => {
        if(!environment.initialized) {
            throw new Error('[TradovateSDK.sync] Attempt to access SDK.sync while the Tradovate SDK not initialized.');
        }
        const initialCache = await ThrottleController.wsSend({
            url: 'user/syncRequest',
            body: {
                users: userIds,
                splitResponses: true,
            }
        });

        ThrottleController.Storage.initCache(initialCache, 'demo');
    },

    /**
     * Listen to incoming WebSocket events. Websocket events have the following basic shape:
     * 
     * ```js
     * {
     *     e: 'props' | 'shutdown' | 'md' | 'clock',
     *     d: {
     *         entityType: 'account' | 'order' | ...,       //any entity type, singular, camelCase.
     *         eventType: 'Created' | 'Updated' | 'Deleted',//type of action on the affected entity
     *         entity: {                                    //copy of updated entity object
     *             ...
     *         }
     *     }
     * }
     * ```
     * 
     * - `'props'` events are the most generally useful in your application, and will record any changes to entities related to your user
     * - `'shutdown'` is highly useful for catching irregular shutdowns and especially helping you understand when you've opened too many sessions.
     * - `'md'`, `'clock'` - these are used for Market Data and Market Replay respectively. You will only be able to access these events will special privileges granted by the CME and Tradovate.
     * 
     * ### Errors
     * This function will throw errors when
     * - `SDK` is not initialized or is still initializing
     * - `SDK.sync` hasn't been called or is not yet complete
     * @param {'live' | 'sim'} env which environment to call into.
     * @param {({ e: 'props' | 'shutdown' | 'md' | 'clock', d: { entityType: string, eventType: 'Created' | 'Updated' | 'Deleted', entity: { [k:string]: any } } | { reason: string, reasonCode: string } }) => void} callback subscriber function that you want to add.
     * @returns {() => void} returns unsubscribe function - calling this fn will remove the event listener.
     */
    on: (env, callback) => {
        if(!environment.initialized) {
            throw new Error(`[TradovateSDK.on] Attempt to subscribe to events while the Tradovate SDK is not initialized.`);
        } else if(!environment.syncd) {
            throw new Error(`[TradovateSDK.on] Attempt to subscribe to events while the Tradovate SDK is not subscribed to server events. To subscribe to server events, please call 'SDK.sync([yourUserId])'.`);
        }
        const socket = env === 'live' ? ThrottleController.sockets.liveSocket : ThrottleController.sockets.simSocket;
        return socket.on('message', callback);
    },

    /**
     * Unsubscribe a listener from the real-time data stream. No-op if the listener has already been removed.
     * @param {'live' | 'sim'} env which environment to call into.
     * @param {*} callback 
     */
    off: (env, callback) => {
        if(!environment.initialized) {
            console.warn(`[TradovateSDK.off] Attempt to unsubscribe from events while the Tradovate SDK is not initialized.`);
        } else if(!environment.syncd) {
            console.warn(`[TradovateSDK.off] Attempt to unsubscribe from events while the Tradovate SDK is not subscribed to server events. To subscribe to server events, please call 'SDK.sync([yourUserId])'.`);
        }
        const socket = env === 'live' ? ThrottleController.sockets.liveSocket : ThrottleController.sockets.simSocket;
        socket.off('message', callback);
    },

    
}