import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function liquidatePosition(app, simSocket, liveSocket) {
    /**
     * Call the `/order/liquidatePosition` endpoint.
     * 
     * @param {{ body: { accountId: number, contractId: number, admin: boolean, customTag50?: string }, env: 'live' | 'demo' }} param0 
     */
    return async function liquidatePosition({ body, env = 'demo' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/order/liquidatePosition`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}