import { chooseUrl } from '../../utils/chooseUrl.js';
import { getHeaders } from '../../utils/tryFetch.js';

export function createEvaluationAccounts(app, simSocket, liveSocket) {
    /**
     * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, contractGroupId?: number, maxOpeningOrderQty?: number, maxClosingOrderQty?: number, maxBackMonth?: number, preExpirationDays?: number, marginPercentage?: number, marginDollarValue?: number, hardLimit?: boolean }} PreTradeRiskParameter
     * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'ReadyToTrade' | 'Verified', contractGroupId?: number, active: boolean, riskTimePeriodId?: number, totalBy: 'Contract' | 'ContractGroup' | 'DiscountGroup' | 'Exchange' | 'Overall' | 'Product' | 'ProductType', shortLimit?: number, longLimit?: number, exposedLimit?: number, description?: string, parameters: Array<PreTradeRiskParameter>}} PreTradeRisk
     * @typedef {{marginPercentageAlert?: number, dailyLossPercentageAlert?: number, dailyLossAlert?: number, marginPercentageLiqOnly?: number, dailyLossPercentageLiqOnly?: number, dailyLossLiqOnly?: number, marginPercentageAutoLiq?: number, dailyLossPercentageAutoLiq?: number, dailyLossAutoLiq?: number, weeklyLossAutoLiq?: number, flattenTimestamp?: string, trailingMaxDrawdown?: number, trailingMaxDrawdownLimit?: number, trailingMaxDrawdownMode?: 'EOD' | 'RealTime', dailyProfitAutoLiq?: number, weeklyProfitAutoLiq?: number, doNotUnlock?: boolean }} PostTradeRisk
     * @typedef {{ userId: number, templateAccountId: number, name: string, initialBalance: number, preTradeRisk: Array<PreTradeRisk>, postTradeRisk: PostTradeRisk }} EvaluationAccount
     * @param {{ body: { accounts: Array<EvaluationAccount> }, env: 'live' | 'demo' }} param0 
     */
    return async function createEvaluationAccounts({ body, env }) {
        const { accessToken } = app.Storage.getAuthResponseData();

        const headers = getHeaders(accessToken);
        const endpoint = '/user/createEvaluationAccounts';
        const url = chooseUrl(env);
        if(liveSocket || simSocket) {
            const [ep, query] = endpoint.slice(1).split('?');
            return await app.wsSend({ url: ep, body, env });
        } else {
            return await app.fetch(url + endpoint, { method: 'POST', headers, body });
        }
    }
}