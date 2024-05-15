import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';


/**
 * Call the `/auth/me` endpoint.
 */
export const me = (app, simSocket, liveSocket) => async function me(env = 'live') {
    const { accessToken } = app.Storage.getAuthResponseData();
    
    const headers = getHeaders(accessToken);
    
    const url = chooseUrl(env);

    const endpoint = `/auth/me`;

    if(liveSocket || simSocket) {
        const [ep, query] = endpoint.slice(1).split('?');
        return await app.wsSend({ url: ep, query, env });
    } else {
        return await app.fetch(url + endpoint, { method: 'GET', headers });
    }
}
