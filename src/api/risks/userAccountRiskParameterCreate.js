import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function userAccountRiskParameterCreate(app, simSocket, liveSocket) {
    /**
     * Call the `/userAccountRiskParameter/create` endpoint.
     * 
     * @param {{ body: { id?: number, contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'Verified', contractGroupId?: number, active: boolean, maxOpeningOrderQty?: number, maxClosingOrderQty?: number, maxBackMonth?: number, preExpirationDays?: number, marginPercentage?: number, marginDollarValue?: number, hardLimit?: number, userAccountPositionLimitId: number }, env: 'live' | 'demo' }} param0 
     */
    return async function userAccountRiskParameterCreate({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/userAccountRiskParameter/create';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}