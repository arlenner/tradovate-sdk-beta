import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function requestTradingPermission(app, simSocket, liveSocket) {
    /**
     * 
     * @param { { body: { accountId: number, ctaContact: string, ctaEmail: string }, env: 'live' | 'demo' } } param0 
     */
    return async function requestTradingPermission({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/user/requestTradingPermission';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}