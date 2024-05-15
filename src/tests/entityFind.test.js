import { stupid } from "./stupidtester.js"

export const entityFindTest = async (SDK) => {
    return stupid()
        .dBox('Test Find product/find')
        .expect(await SDK.api.sim.product.find('NQ'))
        .toEqual({
            id: 814,
            name: 'NQ',
            currencyId: 1,
            productType: 'Futures',
            description: 'E-Mini NASDAQ 100',
            exchangeId: 2,
            exchangeChannelId: 4,
            contractGroupId: 20,
            riskDiscountContractGroupId: 1,
            status: 'Verified',
            months: 'HMUZ',
            valuePerPoint: 20,
            priceFormatType: 'Decimal',
            priceFormat: -2,
            tickSize: 0.25,
            allowProviderContractInfo: false,
            isMicro: false,
            marketDataSource: 'Auto',
            lookupWeight: 0,
            hasReplay: true
          })
}