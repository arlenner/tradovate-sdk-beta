import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';
import * as types from './entities.js';

export function entitySuggest(app, simSocket, liveSocket) {
    /**
     * Call the `/${entityType}/suggest` endpoint.
     * 
     * @param {{entityType: types.EntityType, env: 'live' | 'demo', t: string, l: number }} param0
     * @returns {Promise<types.TdvEntity>}
     */
    return async function entitySuggest({entityType, t, l = 10, env = 'demo'}) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/${entityType}/suggest?t=${t}&l=${l}`;

        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, query, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'GET', headers });
        }
    }
}