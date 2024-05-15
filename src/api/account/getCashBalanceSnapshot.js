import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function getCashBalanceSnapshot(app, simSocket, liveSocket) {
    /**
     * 
     * @param {{ accountId: number, env: 'demo' | 'live' }} param0 
     */
    return async function getCashBalanceSnapshot({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/account/getCashBalanceSnapshot';
        const url = chooseUrl(env);

        if(liveSocket || simSocket) {           
            const ep = endpoint.slice(1);
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}