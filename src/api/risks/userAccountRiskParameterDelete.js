import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function userAccountRiskParameterDelete(app, simSocket, liveSocket) {
    /**
     * Call the `/userAccountRiskParameter/deleteuseraccountriskparameter` endpoint.
     * 
     * @param {{ body: { userAccountRiskParameterId: number }, env: 'live' | 'demo' }} param0 
     */
    return async function userAccountRiskParameterDelete({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/userAccountRiskParameter/deleteuseraccountriskparameter';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}