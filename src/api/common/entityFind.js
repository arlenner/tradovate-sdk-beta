import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';
import * as types from './entities.js';

export function entityFind(app, simSocket, liveSocket) {
    /**
     * Call the `/${entityType}/find` endpoint.
     * 
     * @param {{ entityType: types.EntityType, name: string, env: 'live' | 'demo' }} param0
     * @returns {Promise<types.TdvEntity>}
     */
    return async function entityFind({entityType, name, env = 'demo'}) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/${entityType}/find?name=${name}`;

        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, query, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'GET', headers });
        }
    }
}