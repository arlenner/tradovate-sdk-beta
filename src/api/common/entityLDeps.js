import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';
import * as types from './entities.js';

export function entityLDeps(app, simSocket, liveSocket) {
    /**
     * Calls the `/${entityType}/ldeps` endpoint.
     * 
     * @param {{entityType: types.EntityType, masterids: number[], env: 'live' | 'demo' }} param0
     * @returns {Promise<types.TdvEntity>}
     */
    return async function entityLDeps({entityType, masterids, env = 'demo'}) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const ids = masterids.join(',');
        const endpoint = `/${entityType}/ldeps?masterids=${ids}`;

        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, query, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'GET', headers });
        }
    }
}