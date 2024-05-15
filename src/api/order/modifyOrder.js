import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function modifyOrder(app, simSocket, liveSocket) {
    /**
     * Call the `/order/modifyOrder` endpoint.
     * 
     * @param {{ body: { orderId: number, clOrdId?: string, orderQty: number, orderType: types.OrderType, price?: number, stopPrice?: number, maxShow?: number, pegDIfference?: number, timeInForce?: types.TimeInForce, expireTime?: string, text?: string, activationTime?: string, customTag50?: string, isAutomated?: boolean }, env: 'live' | 'demo' }} param0 
     */
    return async function modifyOrder({ body, env = 'demo' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/order/modifyOrder`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}