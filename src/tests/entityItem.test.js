import { stupid } from "./stupidtester.js"

export const entityItemTest = async (SDK) => {
    return stupid()
        .dBox('Test entity/item with query 799 (ES)')
        .expect(await SDK.api.sim.product.item(799))
        .toEqual({
            id: 799,
            name: 'ES',
            currencyId: 1,
            productType: 'Futures',
            description: 'E-Mini S&P 500',
            exchangeId: 2,
            exchangeChannelId: 4,
            contractGroupId: 2,
            riskDiscountContractGroupId: 1,
            status: 'Verified',
            months: 'HMUZ',
            valuePerPoint: 50,
            priceFormatType: 'Decimal',
            priceFormat: -2,
            tickSize: 0.25,
            allowProviderContractInfo: false,
            isMicro: false,
            marketDataSource: 'Auto',
            lookupWeight: 0,
            hasReplay: true,
            rolloverMonths: 'HMUZ'
          })
}