import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function signupOrganizationMember(app, simSocket, liveSocket) {
    /**
     * 
     * @param { { body: { name: string, email: string, password: string, firstName: string, lastName: string }, env: 'live' | 'demo' } } param0 
     */
    return async function signupOrganizationMember(body) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/user/signuporganizationmember';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}