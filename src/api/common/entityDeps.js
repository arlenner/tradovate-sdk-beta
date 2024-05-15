import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';
import * as types from './entities.js';

export function entityDeps(app, simSocket, liveSocket) {
    /**
     * Call the `/${entityType}/deps` endpoint.
     * 
     * @param {{ entityType: types.EntityType, masterid: number, env: 'live' | 'demo' }} param0
     * @returns {Promise<types.TdvEntity>}
     */
    return async function entityDeps({entityType, masterid, env = 'demo'}) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);

        const endpoint = `/${entityType}/deps?masterid=${masterid}`;

        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, query, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'GET', headers });
        }
    }
}