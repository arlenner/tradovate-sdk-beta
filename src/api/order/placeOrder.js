import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function placeOrder(app, simSocket, liveSocket) {
    /**
     * Call the `/order/placeOrder` endpoint.
     * 
     * @param {{ body: { accountSpec?: string, accountId?: number, clOrdId?: string, action: 'Buy' | 'Sell', symbol: string, orderQty: number, orderType: 'Limit' | 'MIT' | 'Market' | 'Stop' | 'TrailingStop' | 'StopLimit' | 'TrailingStopLimit', price?: number, stopPrice?: number, maxShow?: number, pegDifference?: number, timeInForce?: 'Day' | 'FOK' | 'GTD' | 'GTC' | 'IOC', expireTime?: string, text?: string, activationTime?: string, customTag50?: string, isAutomated?: boolean}, env: 'live' | 'demo'}} param0 
     */
    return async function placeOrder({ body, env = 'demo' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/order/placeOrder';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}