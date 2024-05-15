import { SDK } from "../index.js";
import { stupid } from "./stupidtester.js";


/**
 * 
 * @param {SDK} SDK 
 */
export const testBatchCreation = async (SDK) => {
    const evalUsers = new Array(100).fill(0)
        .map((_, i) => 20200 + i)
        .map(n => ({
            name: `OtherTestUser${n}`,
            email: `xyz.test.${n}@xyz.mail`,
            firstName: 'Bill',
            lastName: 'Rando',
            password: '--QrQQ2SDF$',
            tradovateSubscriptionPlanId: 72,
            entitlementIds: [79] //ATO-TradingView, my test org's TV entitlement
        }));   

    
    const { results: users } = await SDK.api.live.user.createEvaluationUsers({
        users: evalUsers
    });

    console.log(users);

    const evalAccts = users
        .map(({userId}, i) => ({
            name: `OTHERTEST${20200+i}`,
            initialBalance: 50000,
            templateAccountId: 157696,  //template 50k account owned by ATO org
            userId,
            //example auto-liq, replace with your data
            postTradeRisk: {
                dailyLossAutoLiq: 1000,
                trailingMaxDrawdown: 2500,
                trailingMaxDrawdownLimit: 50100,
                trailingMaxDrawdownMode: 'RealTime'
            },
            //example risk params, replace with your data
            preTradeRisk: [{
                active: true,
                totalBy: 'Product',
                exposedLimit: 500,
                //example restricted product
                parameters: [{
                    hardLimit: true,
                    maxOpeningOrderQty: 0,
                    productId: 1478420, //BTC product ID in devel
                }]
            }]
        }))

        
    const { results: accounts } = await SDK.api.sim.user.createEvaluationAccounts({
        accounts: evalAccts
    });
    console.log(accounts);

    return stupid()
        .dBox('Test Batch User Creation')
        .expect(accounts)
        .matches(accounts => accounts.length && accounts.length > 0 && Array.isArray(accounts));
}