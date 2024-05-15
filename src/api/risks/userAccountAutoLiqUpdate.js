import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function userAccountAutoLiqUpdate(app, simSocket, liveSocket) {
    /**
     * Call the `/userAccountAutoLiq/update` endpoint.
     * 
     * @param {{body: { id?: number, changesLocked?: boolean, marginPercentageAlert?: number, dailyLossPercentageAlert?: number, dailyLossAlert?: number, marginPercentageLiqOnly?: number, dailyLossPercentageLiqOnly?: number, dailyLossLiqOnly?: number, marginPercentageAutoLiq?: number, dailyLossPercentageAutoLiq?: number, dailyLossAutoLiq?: number, weeklyLossAutoLiq?: number, flattenTimestamp?: string, trailingMaxDrawdown?: number, dailyProfitAutoLiq?: number, weeklyProfitAutoLiq?: number}, env: 'live' | 'demo'}} param0 
     */
    return async function userAccountAutoLiqUpdate({ body, env = 'demo' }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/userAccountAutoLiq/update`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}