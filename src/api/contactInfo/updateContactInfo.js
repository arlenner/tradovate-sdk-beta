import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

/**
 * 
 * @param { { body: { userId: number, firstName: string, lastName: string, streetAddress1: string, city: string, state?: string, country: string, postCode?: string, phone: string }, env: 'live' | 'demo' } } param0 
 */
export function updateContactInfo(app, simSocket, liveSocket) {
    return async function updateContactInfo({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/contactInfo/updateContactInfo';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}