import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function createEvaluationUsers(app, simSocket, liveSocket) {
    /**
     * 
     * @typedef {{ name: string, email: string, password: string, firstName: string, lastName: string, tradovateSubscriptionPlanId: number, entitlementIds: Array<number>}} EvaluationUser
     * @param { { body: { users: Array<EvaluationUser> }, env: 'live' | 'demo' } } param0 
     */
    return async function createEvaluationUsers({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/user/createEvaluationUsers';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}