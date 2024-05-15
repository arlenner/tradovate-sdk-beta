import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function userAccountPositionLimitCreate(app, simSocket, liveSocket) {
    /**
     * Call the `/userAccountPositionLimit/create` endpoint.
     * 
     * @param {{ body: { contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'Verified', contractGroupId?: number, active: boolean, riskTimePeriod?: number, totalBy: 'Contract' | 'ContractGroup' | 'DiscountGroup' | 'Exchange' | 'Overall' | 'Product' | 'ProductType', shortLimit?: number, longLimit?: number, exposedLimit?: number, description?: string, accountId: number }, env: 'live' | 'demo' }} param0 
     */
    return async function userAccountPositionLimitCreate({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = `/userAccountPositionLimit/create`;
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}