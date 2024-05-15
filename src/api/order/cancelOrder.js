import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function cancelOrder(app, simSocket, liveSocket) {
    /**
     * Call the `/order/cancelOrder` endpoint.
     * 
     * @param {{ body: { orderId: number, clOrdId?: string, activationTime?: string, customTag50?: string, isAutomated?: boolean }, env: 'demo' | 'live'}} param0 
     */
    return async function cancelOrder({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/order/cancelOrder`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}