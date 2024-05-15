import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';
import * as types from './entities.js';

export function entityItems(app, simSocket, liveSocket) {
    /**
     * Call the `/${entityType}/items` endpoint.
     *  
     * @param {{entityType: types.EntityType, ids: number[], env: 'demo' | 'live'}} param0 
     * @returns {Promise<types.TdvEntity>}
     */
    return async function entityItems({ entityType, ids, env = 'live' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/${entityType}/items?ids=${ids.join(',')}`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, query, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'GET', headers });
        }
    }
}