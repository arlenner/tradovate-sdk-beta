import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function placeOCO(app, simSocket, liveSocket) {
    /**
     * Call the `/order/placeOCO` endpoint.
     * 
     * @param {{ body: { accountSpec?: string, accountId?: number, clOrdId?: string, action: 'Buy' | 'Sell', symbol: string, orderQty: number, orderType: types.OrderType, price?: number, stopPrice?: number, maxShow?: number, pegDifference?: number, timeInForce?: types.TimeInForce, expireTime?: string, text?: string, activationTime?: string, customTag50?: string, isAutomated?: boolean, other: { action: 'Buy' | 'Sell', clOrdId?: string, orderType: types.OrderType, price?: number, stopPrice?: number, maxShow?: number, pegDifference?: number, timeInForce?: types.TimeInForce, expireTime?: string, text?: string }}}} param0 
    */
    return async function placeOCO({ body, env = 'live' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/order/placeOCO';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}