import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function userAccountPositionLimitDelete(app, simSocket, liveSocket) {
    /**
     * Call the /userAccountPositionLimit/deleteUserAccountPositionLimit endpoint
     * @param {{ body: { userAccountPositionLimitId: number }, env: 'live' | 'demo'}} param0 
     * @returns 
     */
    return async function userAccountPositionLimitCreate({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/userAccountPositionLimit/deleteUserAccountPositionLimit`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}