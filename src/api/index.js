import {entityDeps} from "./common/entityDeps.js";
import {entityFind} from "./common/entityFind.js";
import {entityItem} from "./common/entityItem.js";
import {entityItems} from "./common/entityItems.js";
import {entityLDeps} from "./common/entityLDeps.js";
import {entityList} from "./common/entityList.js";
import {entitySuggest} from "./common/entitySuggest.js";
import {userAccountPositionLimitCreate} from "./risks/userAccountPositionLimitCreate.js";
import {userAccountRiskParameterDelete} from "./risks/userAccountRiskParameterDelete.js";
import {userAccountPositionLimitDelete} from "./risks/userAccountPositionLimitDelete.js";
import {userAccountPositionLimitUpdate} from "./risks/userAccountPositionLimitUpdate.js";
import {userAccountRiskParameterCreate} from "./risks/userAccountRiskParameterCreate.js";
import {userAccountRiskParameterUpdate} from "./risks/userAccountRiskParameterUpdate.js";
import {userAccountAutoLiqUpdate} from "./risks/userAccountAutoLiqUpdate.js";
import {getCashBalanceSnapshot} from "./account/getCashBalanceSnapshot.js";
import {accessTokenRequest} from "./auth/accessTokenRequest.js";
import {renewAccessToken} from "./auth/renewAccessToken.js";
import {cancelOrder} from "./order/cancelOrder.js";
import {liquidatePosition} from "./order/liquidatePosition.js";
import {modifyOrder} from "./order/modifyOrder.js";
import {placeOCO} from "./order/placeOCO.js";
import {placeOSO} from "./order/placeOSO.js";
import {placeOrder} from "./order/placeOrder.js";
import {acceptTradingPermission} from "./user/acceptTradingPermission.js";
import {requestTradingPermission} from "./user/requestTradingPermission.js";
import {revokeTradingPermission} from "./user/revokeTradingPermission.js";
import {updateContactInfo} from "./contactInfo/updateContactInfo.js";
import {signupOrganizationMember} from "./user/signupOrganizationMember.js";
import {openDemoAccount} from "./user/openDemoAccount.js";
import {addTradovateSubscription} from "./user/addTradovateSubscription.js";
import {addMarketDataSubscription} from "./user/addMarketDataSubscription.js";
import {changeDemoBalance} from "./cashBalance/changeDemoBalance.js";
import {checkUserNameExists} from "./user/checkUserNameExists.js";
import { ThrottledSocket, decodeWSMsg } from "../throttledSocket.js";
import {me} from "./auth/me.js";
import { createEvaluationUsers } from "./user/createEvaluationUsers.js";
import { createEvaluationAccounts } from "./user/createEvaluationAccounts.js";

const restApi = {
    live: {
        account: {
            list: async () => await (entityList(null, null)({ entityType: 'account', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'account', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'account', ids, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'account', l: length, t: text, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'account', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'account', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'account', name, env: 'live' }))
        },

        accountRiskStatus: {
            list: async () => await (entityList(null, null)({ entityType: 'accountRiskStatus', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'accountRiskStatus', id, env: 'live' })),
            deps: async (masterid) => (await entityDeps(null, null)({ entityType: 'accountRiskStatus', masterid, env: 'live' })),
            ldeps: async (masterids) => (await entityLDeps(null, null)({ entityType: 'accountRiskStatus', masterids, env: 'live' }))
        },

        userAccountPositionLimit: {
            userAccountPositionLimitCreate: async (body) => await (userAccountPositionLimitCreate(null, null)({ body, env: 'live' })),
            userAccountPositionLimitDelete: async (body) => await (userAccountPositionLimitDelete(null, null)({ body, env: 'live' })),
            userAccountPositionLimitUpdate: async (body) => await (userAccountPositionLimitUpdate(null, null)({ body, env: 'live' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountPositionLimit', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountPositionLimit', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userAccountPositionLimit', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountPositionLimit', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountPositionLimit', masterids, env: 'live' }))
        },

        userAccountRiskParameter: {
            userAccountRiskParameterCreate: async (body) => await (userAccountRiskParameterCreate(null, null)({ body, env: 'live' })),
            userAccountRiskParameterDelete: async (body) => await (userAccountRiskParameterDelete(null, null)({ body, env: 'live' })),
            userAccountRiskParameterUpdate: async (body) => await (userAccountRiskParameterUpdate(null, null)({ body, env: 'live' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountRiskParameter', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountRiskParameter', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userAccountRiskParameter', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountRiskParameter', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountRiskParameter', masterids, env: 'live' }))
        },

        userAccountAutoLiq: {
            userAccountAutoLiqUpdate: async (body) => await (userAccountAutoLiqUpdate(null, null)({ body, env: 'live' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountAutoLiq', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountRiskParameter', id, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountRiskParameter', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountRiskParameter', masterids, env: 'live' }))
        },

        user: {
            /**
             * @param {{ tradingPermissionId: number }} body 
             * @returns 
             */
            async acceptTradingPermission(body) { return await (acceptTradingPermission(null, null)({ body, env: 'live'})); },
            /**
             * @param {{ accountId: number, ctaContact: string, ctaEmail: string }} body 
             * @returns 
             */
            async requestTradingPermission(body) { return await (requestTradingPermission(null, null)({ body, env: 'live' })); },
            /**
             * @param {{ tradingPermissionId: number }} body 
             * @returns 
             */
            async revokeTradingPermission(body) { return await (revokeTradingPermission(null, null)({ body, env: 'live' })); },
            /**
             * @param {{ name: string, email: string, password: string, firstName: string, lastName: string }} body 
             * @returns 
             */
            async signupOrganizationMember(body) { return await (signupOrganizationMember(null, null)(body, 'live')); },
            /**
             * @param {{ templateAccountId?: number, name?: string, initialBalance?: number }} body 
             * @returns 
             */
            async openDemoAccount(body) { return await (openDemoAccount(null, null)({ body, env: 'live' })); },
            /**
             * @param {{ tradovateSubscriptionPlanId: number, userId: number }} body 
             * @returns 
             */
            async addTradovateSubscription(body) { return await (addTradovateSubscription(null, null)({ body, env: 'live' })); },
            /**
             * @param {{ marketDataSubscriptionPlanIds: number[] }} body 
             * @returns 
             */
            async addMarketDataSubscription(body) { return await (addMarketDataSubscription(null, null)({ body, env: 'live' })); },
            /**
             * @param {{name: string}} body 
             * @returns 
             */
            /**
             * 
             * @typedef {{ name: string, email: string, password: string, firstName: string, lastName: string, tradovateSubscriptionPlanId: number, entitlementIds: Array<number>}} EvaluationUser
             * @param {{ users: Array<EvaluationUser> }} body 
             * @returns {Promise<{results: Array<{userId: number}>}>}
             */
            async createEvaluationUsers(body) { return await (createEvaluationUsers()({ body, env: 'live' }))},
            
            async checkUserNameExists(body) { return await (checkUserNameExists(null, null)({ body, env: 'live' })); },
            list: async () => await (entityList(null, null)({ entityType: 'user', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'user', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'user', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'user', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'user', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'user', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'user', l: length, t: text, env: 'live' })),
        },

        marginSnapshot: {
            list: async () => await (entityList(null, null)({ entityType: 'marginSnapshot', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marginSnapshot', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marginSnapshot', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marginSnapshot', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marginSnapshot', masterids, env: 'live' })),
        },

        cashBalance: {
            /**
             * @param {{ accountId: number }} body 
             * @returns 
             */
            getCashBalanceSnapshot: async(body) => await (getCashBalanceSnapshot(null, null)({ accountId: body.accountId, env: 'live'})),
            list: async () => await (entityList(null, null)({ entityType: 'cashBalance', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'cashBalance', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'cashBalance', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'cashBalance', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'cashBalance', masterids, env: 'live' })),
        },

        currency: {
            list: async () => await (entityList(null, null)({ entityType: 'currency', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'currency', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'currency', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'currency', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'currency', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'currency', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'currency', l: length, t: text, env: 'live' })),
        },

        position: {
            list: async () => await (entityList(null, null)({ entityType: 'position', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'position', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'position', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'position', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'position', masterids, env: 'live' })),
        },

        fillPair: {
            list: async () => await (entityList(null, null)({ entityType: 'fillPair', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'fillPair', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'fillPair', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'fillPair', masterid, env: 'live' })),
            ldeps: async (masterids) => await entityLDeps(null, null)({ entityType: 'fillPair', masterids, env: 'live' }),
        },

        contract: {
            item: async (id) => await (entityItem(null, null)({ entityType: 'contract', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contract', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contract', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contract', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'contract', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'contract', l: length, t: text, env: 'live' })),
        },

        contractMaturity: {
            list: async () => await (entityList(null, null)({ entityType: 'contractMaturity', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'contractMaturity', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contractMaturity', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contractMaturity', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contractMaturity', masterids, env: 'live' })),
        },

        product: {
            list: async () => await (entityList(null, null)({ entityType: 'product', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'product', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'product', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'product', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'product', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'product', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'product', l: length, t: text, env: 'live' })),
        },

        exchange: {
            list: async () => await (entityList(null, null)({ entityType: 'exchange', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'exchange', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'exchange', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'exchange', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'exchange', masterids, env: 'live' })),
        },

        spreadDefinition: {
            list: async () => await (entityList(null, null)({ entityType: 'spreadDefinition', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'spreadDefinition', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'spreadDefinition', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'spreadDefinition', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'spreadDefinition', masterids, env: 'live' })),
        },

        command: {
            list: async () => await (entityList(null, null)({ entityType: 'command', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'command', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'command', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'command', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'command', masterids, env: 'live' })),
        },

        commandReport: {
            list: async () => await (entityList(null, null)({ entityType: 'commandReport', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'commandReport', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'commandReport', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'commandReport', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'commandReport', masterids, env: 'live' })),
        },

        executionReport: {
            list: async () => await (entityList(null, null)({ entityType: 'executionReport', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'executionReport', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'executionReport', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'executionReport', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'executionReport', masterids, env: 'live' })),
        },

        orderVersion: {
            list: async () => await (entityList(null, null)({ entityType: 'orderVersion', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderVersion', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderVersion', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderVersion', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderVersion', masterids, env: 'live' })),
        },

        fill: {
            list: async () => await (entityList(null, null)({ entityType: 'fill', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'fill', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'fill', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'fill', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'fill', masterids, env: 'live' })),
        },

        orderStrategy: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategy', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategy', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategy', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategy', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategy', masterids, env: 'live' })),
        },
        
        orderStrategyLink: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategyLink', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategyLink', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategyLink', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategyLink', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategyLink', masterids, env: 'live' })),
        },

        userProperty: {
            list: async () => await (entityList(null, null)({ entityType: 'userProperty', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userProperty', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userProperty', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userProperty', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userProperty', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'userProperty', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'userProperty', l: length, t: text, env: 'live' })),
        },

        property: {
            list: async () => await (entityList(null, null)({ entityType: 'property', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'property', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'property', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'property', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'property', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'property', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'property', l: length, t: text, env: 'live' })),
        },

        userPlugin: {
            list: async () => await (entityList(null, null)({ entityType: 'userPlugin', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userPlugin', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userPlugin', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userPlugin', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userPlugin', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'userPlugin', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'userPlugin', l: length, t: text, env: 'live' })),
        },

        contractGroup: {
            list: async () => await (entityList(null, null)({ entityType: 'contractGroup', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'contractGroup', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contractGroup', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contractGroup', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contractGroup', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'contractGroup', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'contractGroup', l: length, t: text, env: 'live' })),
        },

        orderStrategyType: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategyType', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategyType', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategyType', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategyType', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategyType', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'orderStrategyType', name, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'orderStrategyType', l: length, t: text, env: 'live' })),
        },

        tradovateSubscriptionPlan: {
            list: async () => await (entityList(null, null)({ entityType: 'tradovateSubscriptionPlan', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'tradovateSubscriptionPlan', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'tradovateSubscriptionPlan', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'tradovateSubscriptionPlan', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'tradovateSubscriptionPlan', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'tradovateSubscriptionPlan', name, env: 'live' })),
        },

        tradovateSubscription: {
            list: async () => await (entityList(null, null)({ entityType: 'tradovateSubscription', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'tradovateSubscription', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'tradovateSubscription', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'tradovateSubscription', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'tradovateSubscription', masterids, env: 'live' })),
        },

        marketDataSubscription: {
            list: async () => await (entityList(null, null)({ entityType: 'marketDataSubscription', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marketDataSubscription', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marketDataSubscription', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marketDataSubscription', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marketDataSubscription', masterids, env: 'live' })),
        },

        marketDataSubscriptionPlan: {
            list: async () => await (entityList(null, null)({ entityType: 'marketDataSubscriptionPlan', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marketDataSubscriptionPlan', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marketDataSubscriptionPlan', ids, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marketDataSubscriptionPlan', masterid, env })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marketDataSubscriptionPlan', masterids, env: 'live' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'marketDataSubscriptionPlan', name, env: 'live' })),
        },

        contactInfo: {
            updateContactInfo: async (body) => await (updateContactInfo(null, null)({ body, env: 'live' })),
        },

        auth: {
            accessTokenRequest: async (credentials) => await accessTokenRequest({ credentials }, 'live'),
            renewAccessToken: async (token) => await renewAccessToken({ token, env: 'live' }),
        },

        order: {
            cancelOrder: async body => await (cancelOrder(null, null)({ body, env: 'live' })),
            liquidatePosition: async body => await (liquidatePosition(null, null)({ body, env: 'live' })),
            modifyOrder: async body => await (modifyOrder(null, null)({ body, env: 'live' })),
            placeOCO: async body => await (placeOCO(null, null)({ body, env: 'live' })),
            placeOSO: async body => await (placeOSO(null, null)({ body, env: 'live' })),
            placeOrder: async body => await (placeOrder(null, null)({ body, env: 'live' })),
            list: async () => await (entityList(null, null)({ entityType: 'order', env: 'live' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'order', id, env: 'live' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'order', ids, env: 'live' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'order', l: length, t: text, env: 'live' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'order', masterid, env: 'live' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'order', masterids, env: 'live' }))
        },

        contactInfo: {
            /**
             * 
             * @param {{ userId: number, name: string, firstName: string, lastName: string, streetAddress1: string, city: string, state?: string, country: string, postCode?: string, phone: string }} body 
             * @returns 
             */
            updateContactInfo: async (body) => await (updateContactInfo(null, null)({ body, env: 'live' })),
        },
    },
    sim: {
        account: {
            list: async () => await (entityList(null, null)({ entityType: 'account', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'account', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'account', ids, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'account', l: length, t: text, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'account', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'account', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'account', name, env: 'demo' }))
        },

        accountRiskStatus: {
            list: async () => await (entityList(null, null)({ entityType: 'accountRiskStatus', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'accountRiskStatus', id, env: 'demo' })),
            deps: async (masterid) => (await entityDeps(null, null)({ entityType: 'accountRiskStatus', masterid, env: 'demo' })),
            ldeps: async (masterids) => (await entityLDeps(null, null)({ entityType: 'accountRiskStatus', masterids, env: 'demo' }))
        },

        userAccountPositionLimit: {
            userAccountPositionLimitCreate: async (body) => await (userAccountPositionLimitCreate(null, null)({ body, env: 'demo' })),
            userAccountPositionLimitDelete: async (body) => await (userAccountPositionLimitDelete(null, null)({ body, env: 'demo' })),
            userAccountPositionLimitUpdate: async (body) => await (userAccountPositionLimitUpdate(null, null)({ body, env: 'demo' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountPositionLimit', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountPositionLimit', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userAccountPositionLimit', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountPositionLimit', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountPositionLimit', masterids, env: 'demo' }))
        },

        userAccountRiskParameter: {
            userAccountRiskParameterCreate: async (body) => await (userAccountRiskParameterCreate(null, null)({ body, env: 'demo' })),
            userAccountRiskParameterDelete: async (body) => await (userAccountRiskParameterDelete(null, null)({ body, env: 'demo' })),
            userAccountRiskParameterUpdate: async (body) => await (userAccountRiskParameterUpdate(null, null)({ body, env: 'demo' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountRiskParameter', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountRiskParameter', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userAccountRiskParameter', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountRiskParameter', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountRiskParameter', masterids, env: 'demo' }))
        },

        userAccountAutoLiq: {
            userAccountAutoLiqUpdate: async (body) => await (userAccountAutoLiqUpdate(null, null)({ body, env: 'demo' })),
            list: async () => await (entityList(null, null)({ entityType: 'userAccountAutoLiq', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userAccountRiskParameter', id, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userAccountRiskParameter', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userAccountRiskParameter', masterids, env: 'demo' }))
        },

        user: {
            /**
             * @param {{ tradingPermissionId: number }} body 
             * @returns 
             */
            async acceptTradingPermission(body) { return await (acceptTradingPermission(null, null)({ body, env: 'demo'})); },
            /**
             * @param {{ accountId: number, ctaContact: string, ctaEmail: string }} body 
             * @returns 
             */
            async requestTradingPermission(body) { return await (requestTradingPermission(null, null)({ body, env: 'demo' })); },
            /**
             * @param {{ tradingPermissionId: number }} body 
             * @returns 
             */
            async revokeTradingPermission(body) { return await (revokeTradingPermission(null, null)({ body, env: 'demo' })); },
            /**
             * @param {{ name: string, email: string, password: string, firstName: string, lastName: string }} body 
             * @returns 
             */
            async signupOrganizationMember(body) { return await (signupOrganizationMember(null, null)(body, 'demo')); },
            /**
             * @param {{ templateAccountId?: number, name?: string, initialBalance?: number }} body 
             * @returns 
             */
            async openDemoAccount(body) { return await (openDemoAccount(null, null)({ body, env: 'demo' })); },
            /**
             * @param {{ tradovateSubscriptionPlanId: number, userId: number }} body 
             * @returns 
             */
            async addTradovateSubscription(body) { return await (addTradovateSubscription(null, null)({ body, env: 'demo' })); },
            /**
             * @param {{ marketDataSubscriptionPlanIds: number[], userId: number, accountId: number }} body 
             * @returns 
             */
            async addMarketDataSubscription(body) { return await (addMarketDataSubscription(null, null)({ body, env: 'demo' })); },
            /**
             * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, contractGroupId?: number, maxOpeningOrderQty?: number, maxClosingOrderQty?: number, maxBackMonth?: number, preExpirationDays?: number, marginPercentage?: number, marginDollarValue?: number, hardLimit?: boolean }} PreTradeRiskParameter
             * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'ReadyToTrade' | 'Verified', contractGroupId?: number, active: boolean, riskTimePeriodId?: number, totalBy: 'Contract' | 'ContractGroup' | 'DiscountGroup' | 'Exchange' | 'Overall' | 'Product' | 'ProductType', shortLimit?: number, longLimit?: number, exposedLimit?: number, description?: string, parameters: Array<PreTradeRiskParameter>}} PreTradeRisk
             * @typedef {{marginPercentageAlert?: number, dailyLossPercentageAlert?: number, dailyLossAlert?: number, marginPercentageLiqOnly?: number, dailyLossPercentageLiqOnly?: number, dailyLossLiqOnly?: number, marginPercentageAutoLiq?: number, dailyLossPercentageAutoLiq?: number, dailyLossAutoLiq?: number, weeklyLossAutoLiq?: number, flattenTimestamp?: string, trailingMaxDrawdown?: number, trailingMaxDrawdownLimit?: number, trailingMaxDrawdownMode?: 'EOD' | 'RealTime', dailyProfitAutoLiq?: number, weeklyProfitAutoLiq?: number, doNotUnlock?: boolean }} PostTradeRisk
             * @typedef {{ userId: number, templateAccountId: number, name: string, initialBalance: number, preTradeRisk: Array<PreTradeRisk>, postTradeRisk: PostTradeRisk }} EvaluationAccount
             * @param {{ accounts: Array<EvaluationAccount> }} body
             * @returns {Promise<{results: Array<{accountId: number}>}>}
             */
            async createEvaluationAccounts(body) { return await (createEvaluationAccounts()({ body, env: 'demo' })); },
            list: async () => await (entityList(null, null)({ entityType: 'user', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'user', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'user', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'user', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'user', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'user', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'user', l: length, t: text, env: 'demo' })),
        },

        marginSnapshot: {
            list: async () => await (entityList(null, null)({ entityType: 'marginSnapshot', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marginSnapshot', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marginSnapshot', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marginSnapshot', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marginSnapshot', masterids, env: 'demo' })),
        },

        cashBalance: {
            /**
             * @param {{ accountId: number, cashChange: number }} body 
             * @returns 
             */
            changeDemoBalance: async (body) => await (changeDemoBalance(null, null)(body)),
            /**
             * @param {{ accountId: number }} body 
             * @returns 
             */
            getCashBalanceSnapshot: async(body) => await (getCashBalanceSnapshot(null, null)({ accountId: body.accountId, env: 'demo'})),
            list: async () => await (entityList(null, null)({ entityType: 'cashBalance', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'cashBalance', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'cashBalance', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'cashBalance', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'cashBalance', masterids, env: 'demo' })),
        },

        currency: {
            list: async () => await (entityList(null, null)({ entityType: 'currency', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'currency', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'currency', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'currency', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'currency', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'currency', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'currency', l: length, t: text, env: 'demo' })),
        },

        position: {
            list: async () => await (entityList(null, null)({ entityType: 'position', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'position', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'position', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'position', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'position', masterids, env: 'demo' })),
        },

        fillPair: {
            list: async () => await (entityList(null, null)({ entityType: 'fillPair', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'fillPair', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'fillPair', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'fillPair', masterid, env: 'demo' })),
            ldeps: async (masterids) => await entityLDeps(null, null)({ entityType: 'fillPair', masterids, env: 'demo' }),
        },

        contract: {
            item: async (id) => await (entityItem(null, null)({ entityType: 'contract', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contract', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contract', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contract', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'contract', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'contract', l: length, t: text, env: 'demo' })),
        },

        contractMaturity: {
            list: async () => await (entityList(null, null)({ entityType: 'contractMaturity', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'contractMaturity', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contractMaturity', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contractMaturity', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contractMaturity', masterids, env: 'demo' })),
        },

        product: {
            list: async () => await (entityList(null, null)({ entityType: 'product', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'product', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'product', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'product', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'product', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'product', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'product', l: length, t: text, env: 'demo' })),
        },

        exchange: {
            list: async () => await (entityList(null, null)({ entityType: 'exchange', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'exchange', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'exchange', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'exchange', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'exchange', masterids, env: 'demo' })),
        },

        spreadDefinition: {
            list: async () => await (entityList(null, null)({ entityType: 'spreadDefinition', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'spreadDefinition', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'spreadDefinition', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'spreadDefinition', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'spreadDefinition', masterids, env: 'demo' })),
        },

        command: {
            list: async () => await (entityList(null, null)({ entityType: 'command', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'command', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'command', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'command', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'command', masterids, env: 'demo' })),
        },

        commandReport: {
            list: async () => await (entityList(null, null)({ entityType: 'commandReport', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'commandReport', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'commandReport', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'commandReport', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'commandReport', masterids, env: 'demo' })),
        },

        executionReport: {
            list: async () => await (entityList(null, null)({ entityType: 'executionReport', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'executionReport', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'executionReport', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'executionReport', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'executionReport', masterids, env: 'demo' })),
        },

        orderVersion: {
            list: async () => await (entityList(null, null)({ entityType: 'orderVersion', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderVersion', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderVersion', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderVersion', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderVersion', masterids, env: 'demo' })),
        },

        fill: {
            list: async () => await (entityList(null, null)({ entityType: 'fill', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'fill', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'fill', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'fill', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'fill', masterids, env: 'demo' })),
        },

        orderStrategy: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategy', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategy', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategy', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategy', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategy', masterids, env: 'demo' })),
        },
        
        orderStrategyLink: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategyLink', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategyLink', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategyLink', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategyLink', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategyLink', masterids, env: 'demo' })),
        },

        userProperty: {
            list: async () => await (entityList(null, null)({ entityType: 'userProperty', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userProperty', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userProperty', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userProperty', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userProperty', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'userProperty', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'userProperty', l: length, t: text, env: 'demo' })),
        },

        property: {
            list: async () => await (entityList(null, null)({ entityType: 'property', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'property', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'property', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'property', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'property', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'property', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'property', l: length, t: text, env: 'demo' })),
        },

        userPlugin: {
            list: async () => await (entityList(null, null)({ entityType: 'userPlugin', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'userPlugin', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'userPlugin', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'userPlugin', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'userPlugin', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'userPlugin', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'userPlugin', l: length, t: text, env: 'demo' })),
        },

        contractGroup: {
            list: async () => await (entityList(null, null)({ entityType: 'contractGroup', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'contractGroup', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'contractGroup', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'contractGroup', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'contractGroup', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'contractGroup', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'contractGroup', l: length, t: text, env: 'demo' })),
        },

        orderStrategyType: {
            list: async () => await (entityList(null, null)({ entityType: 'orderStrategyType', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'orderStrategyType', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'orderStrategyType', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'orderStrategyType', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'orderStrategyType', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'orderStrategyType', name, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'orderStrategyType', l: length, t: text, env: 'demo' })),
        },

        tradovateSubscriptionPlan: {
            list: async () => await (entityList(null, null)({ entityType: 'tradovateSubscriptionPlan', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'tradovateSubscriptionPlan', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'tradovateSubscriptionPlan', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'tradovateSubscriptionPlan', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'tradovateSubscriptionPlan', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'tradovateSubscriptionPlan', name, env: 'demo' })),
        },

        tradovateSubscription: {
            list: async () => await (entityList(null, null)({ entityType: 'tradovateSubscription', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'tradovateSubscription', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'tradovateSubscription', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'tradovateSubscription', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'tradovateSubscription', masterids, env: 'demo' })),
        },

        marketDataSubscription: {
            list: async () => await (entityList(null, null)({ entityType: 'marketDataSubscription', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marketDataSubscription', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marketDataSubscription', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marketDataSubscription', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marketDataSubscription', masterids, env: 'demo' })),
        },

        marketDataSubscriptionPlan: {
            list: async () => await (entityList(null, null)({ entityType: 'marketDataSubscriptionPlan', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'marketDataSubscriptionPlan', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'marketDataSubscriptionPlan', ids, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'marketDataSubscriptionPlan', masterid, env })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'marketDataSubscriptionPlan', masterids, env: 'demo' })),
            find: async (name) => await (entityFind(null, null)({ entityType: 'marketDataSubscriptionPlan', name, env: 'demo' })),
        },

        contactInfo: {
            updateContactInfo: async (body) => await (updateContactInfo(null, null)({ body, env: 'demo' })),
        },

        auth: {
            accessTokenRequest: async (credentials) => await accessTokenRequest({ credentials }, 'demo'),
            renewAccessToken: async (token) => await renewAccessToken({ token, env: 'demo' }),
        },

        order: {
            cancelOrder: async body => await (cancelOrder(null, null)({ body, env: 'demo' })),
            liquidatePosition: async body => await (liquidatePosition(null, null)({ body, env: 'demo' })),
            modifyOrder: async body => await (modifyOrder(null, null)({ body, env: 'demo' })),
            placeOCO: async body => await (placeOCO(null, null)({ body, env: 'demo' })),
            placeOSO: async body => await (placeOSO(null, null)({ body, env: 'demo' })),
            placeOrder: async body => await (placeOrder(null, null)({ body, env: 'demo' })),
            list: async () => await (entityList(null, null)({ entityType: 'order', env: 'demo' })),
            item: async (id) => await (entityItem(null, null)({ entityType: 'order', id, env: 'demo' })),
            items: async (ids) => await (entityItems(null, null)({ entityType: 'order', ids, env: 'demo' })),
            suggest: async (text, length) => await (entitySuggest(null, null)({ entityType: 'order', l: length, t: text, env: 'demo' })),
            deps: async (masterid) => await (entityDeps(null, null)({ entityType: 'order', masterid, env: 'demo' })),
            ldeps: async (masterids) => await (entityLDeps(null, null)({ entityType: 'order', masterids, env: 'demo' }))
        },

        contactInfo: {
            /**
             * 
             * @param {{ userId: number, name: string, firstName: string, lastName: string, streetAddress1: string, city: string, state?: string, country: string, postCode?: string, phone: string }} body 
             * @returns 
             */
            updateContactInfo: async (body) => await (updateContactInfo(null, null)({ body, env: 'demo' })),
        },
    }
};

/** @typedef {typeof restApi} NtApi */

/**
 * @param {ThrottledSocket} simSocket
 * @param {ThrottledSocket} liveSocket
 * @returns { NtApi }
 */
export const buildApi = (app, simSocket, liveSocket) => {
    return ({
        live: {
            /**
             * Returns unsubscribe fn
             * @param {string} entityType entity type to listen for
             * @param {(entity: {[k:string]:any}) => void} callback 
             * @returns {() => void}
             */
            onSim(entityType, callback) {
                return simSocket.on('message', (msg) => {
                    const [T, data] = decodeWSMsg(msg.data);
                    if(data) {
                        data.forEach(dat => {
                            if(dat.d?.entityType === entityType) {
                                callback(dat.d);
                            }
                        });
                    }
                })
            },
            async sendSim(params) {
                return await simSocket.send(params);
            },
            /**
             * Returns unsubscribe fn
             * @param {string} entityType entity type to listen for
             * @param {(entity: {[k:string]:any}) => void} callback 
             * @returns {() => void}
             */
            onLive(entityType, callback) {
                return liveSocket.on('message', (msg) => {
                    const [T, data] = decodeWSMsg(msg.data);
                    if(data) {
                        data.forEach(dat => {
                            if(dat.d?.entityType === entityType) {
                                callback(dat.d);
                            }
                        });
                    }
                })
            },
            async sendLive(params) {
                return await liveSocket.send(params);
            },
            account: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'account', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'account', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'account', ids, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'account', l: length, t: text, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'account', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'account', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'account', name, env: 'live' }))
            },

            accountRiskStatus: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', id, env: 'live' })),
                deps: async (masterid) => (await entityDeps(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', masterid, env: 'live' })),
                ldeps: async (masterids) => (await entityLDeps(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', masterids, env: 'live' }))
            },

            userAccountPositionLimit: {
                userAccountPositionLimitCreate: async (body) => await (userAccountPositionLimitCreate(app, simSocket, liveSocket)({ body, env: 'live' })),
                userAccountPositionLimitDelete: async (body) => await (userAccountPositionLimitDelete(app, simSocket, liveSocket)({ body, env: 'live' })),
                userAccountPositionLimitUpdate: async (body) => await (userAccountPositionLimitUpdate(app, simSocket, liveSocket)({ body, env: 'live' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', masterids, env: 'live' }))
            },

            userAccountRiskParameter: {
                userAccountRiskParameterCreate: async (body) => await (userAccountRiskParameterCreate(app, simSocket, liveSocket)({ body, env: 'live' })),
                userAccountRiskParameterDelete: async (body) => await (userAccountRiskParameterDelete(app, simSocket, liveSocket)({ body, env: 'live' })),
                userAccountRiskParameterUpdate: async (body) => await (userAccountRiskParameterUpdate(app, simSocket, liveSocket)({ body, env: 'live' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterids, env: 'live' }))
            },

            userAccountAutoLiq: {
                userAccountAutoLiqUpdate: async (body) => await (userAccountAutoLiqUpdate(app, simSocket, liveSocket)({ body, env: 'live' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountAutoLiq', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', id, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterids, env: 'live' }))
            },

            user: {
                /**
                 * @param {{ tradingPermissionId: number }} body 
                 * @returns 
                 */
                async acceptTradingPermission(body) { return await (acceptTradingPermission(app, simSocket, liveSocket)({ body, env: 'live'})); },
                /**
                 * @param {{ accountId: number, ctaContact: string, ctaEmail: string }} body 
                 * @returns 
                 */
                async requestTradingPermission(body) { return await (requestTradingPermission(app, simSocket, liveSocket)({ body, env: 'live' })); },
                /**
                 * @param {{ tradingPermissionId: number }} body 
                 * @returns 
                 */
                async revokeTradingPermission(body) { return await (revokeTradingPermission(app, simSocket, liveSocket)({ body, env: 'live' })); },
                /**
                 * @param {{ name: string, email: string, password: string, firstName: string, lastName: string }} body 
                 * @returns 
                 */
                async signupOrganizationMember(body) { return await (signupOrganizationMember(app, simSocket, liveSocket)(body, 'live')); },
                /**
                 * @param {{ templateAccountId?: number, name?: string, initialBalance?: number }} body 
                 * @returns 
                 */
                async openDemoAccount(body) { return await (openDemoAccount(app, simSocket, liveSocket)({ body, env: 'live' })); },
                /**
                 * @param {{ tradovateSubscriptionPlanId: number, userId: number }} body 
                 * @returns 
                 */
                async addTradovateSubscription(body) { return await (addTradovateSubscription(app, simSocket, liveSocket)({ body, env: 'live' })); },
                /**
                 * @param {{ marketDataSubscriptionPlanIds: number[] }} body 
                 * @returns 
                 */
                async addMarketDataSubscription(body) { return await (addMarketDataSubscription(app, simSocket, liveSocket)({ body, env: 'live' })); },
                /**
                 * 
                 * @typedef {{ name: string, email: string, password: string, firstName: string, lastName: string, tradovateSubscriptionPlanId: number, entitlementIds: Array<number>}} EvaluationUser
                 * @param {{ users: Array<EvaluationUser> }} body 
                 */
                async createEvaluationUsers(body) { return await (createEvaluationUsers(app, simSocket, liveSocket)({ body, env: 'live' }))},
                
                /**
                 * @param {{name: string}} body 
                 * @returns 
                 */
                async checkUserNameExists(body) { return await (checkUserNameExists(app, simSocket, liveSocket)({ body, env: 'live' })); },
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'user', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'user', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'user', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'user', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'user', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'user', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'user', l: length, t: text, env: 'live' })),
            },

            marginSnapshot: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', masterids, env: 'live' })),
            },

            cashBalance: {
                /**
                 * @param {{ accountId: number }} body 
                 * @returns 
                 */
                getCashBalanceSnapshot: async(body) => await (getCashBalanceSnapshot(app, simSocket, liveSocket)({ accountId: body.accountId, env: 'live'})),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'cashBalance', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'cashBalance', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'cashBalance', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'cashBalance', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'cashBalance', masterids, env: 'live' })),
            },

            currency: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'currency', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'currency', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'currency', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'currency', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'currency', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'currency', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'currency', l: length, t: text, env: 'live' })),
            },

            position: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'position', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'position', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'position', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'position', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'position', masterids, env: 'live' })),
            },

            fillPair: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'fillPair', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'fillPair', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'fillPair', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'fillPair', masterid, env: 'live' })),
                ldeps: async (masterids) => await entityLDeps(app, simSocket, liveSocket)({ entityType: 'fillPair', masterids, env: 'live' }),
            },

            contract: {
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contract', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contract', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contract', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contract', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'contract', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'contract', l: length, t: text, env: 'live' })),
            },

            contractMaturity: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'contractMaturity', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contractMaturity', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contractMaturity', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contractMaturity', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contractMaturity', masterids, env: 'live' })),
            },

            product: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'product', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'product', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'product', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'product', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'product', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'product', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'product', l: length, t: text, env: 'live' })),
            },

            exchange: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'exchange', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'exchange', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'exchange', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'exchange', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'exchange', masterids, env: 'live' })),
            },

            spreadDefinition: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', masterids, env: 'live' })),
            },

            command: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'command', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'command', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'command', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'command', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'command', masterids, env: 'live' })),
            },

            commandReport: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'commandReport', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'commandReport', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'commandReport', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'commandReport', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'commandReport', masterids, env: 'live' })),
            },

            executionReport: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'executionReport', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'executionReport', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'executionReport', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'executionReport', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'executionReport', masterids, env: 'live' })),
            },

            orderVersion: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderVersion', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderVersion', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderVersion', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderVersion', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderVersion', masterids, env: 'live' })),
            },

            fill: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'fill', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'fill', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'fill', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'fill', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'fill', masterids, env: 'live' })),
            },

            orderStrategy: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategy', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategy', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategy', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategy', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategy', masterids, env: 'live' })),
            },
            
            orderStrategyLink: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', masterids, env: 'live' })),
            },

            userProperty: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userProperty', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userProperty', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userProperty', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userProperty', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userProperty', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'userProperty', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'userProperty', l: length, t: text, env: 'live' })),
            },

            property: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'property', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'property', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'property', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'property', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'property', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'property', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'property', l: length, t: text, env: 'live' })),
            },

            userPlugin: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userPlugin', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userPlugin', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userPlugin', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userPlugin', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userPlugin', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'userPlugin', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'userPlugin', l: length, t: text, env: 'live' })),
            },

            contractGroup: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'contractGroup', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contractGroup', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contractGroup', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contractGroup', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contractGroup', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'contractGroup', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'contractGroup', l: length, t: text, env: 'live' })),
            },

            orderStrategyType: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', name, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', l: length, t: text, env: 'live' })),
            },

            tradovateSubscriptionPlan: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', name, env: 'live' })),
            },

            tradovateSubscription: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', masterids, env: 'live' })),
            },

            marketDataSubscription: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', masterids, env: 'live' })),
            },

            marketDataSubscriptionPlan: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', ids, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', masterid, env })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', masterids, env: 'live' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', name, env: 'live' })),
            },

            contactInfo: {
                updateContactInfo: async (body) => await (updateContactInfo(app, simSocket, liveSocket)({ body, env: 'live' })),
            },

            auth: {
                me: async () => await me(app)('live'),
                accessTokenRequest: async (credentials) => await accessTokenRequest({ credentials }, 'live'),
                renewAccessToken: async () => await renewAccessToken(app)({ env: 'live' }),
            },

            order: {
                cancelOrder: async body => await (cancelOrder(app, simSocket, liveSocket)({ body, env: 'live' })),
                liquidatePosition: async body => await (liquidatePosition(app, simSocket, liveSocket)({ body, env: 'live' })),
                modifyOrder: async body => await (modifyOrder(app, simSocket, liveSocket)({ body, env: 'live' })),
                placeOCO: async body => await (placeOCO(app, simSocket, liveSocket)({ body, env: 'live' })),
                placeOSO: async body => await (placeOSO(app, simSocket, liveSocket)({ body, env: 'live' })),
                placeOrder: async body => await (placeOrder(app, simSocket, liveSocket)({ body, env: 'live' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'order', env: 'live' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'order', id, env: 'live' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'order', ids, env: 'live' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'order', l: length, t: text, env: 'live' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'order', masterid, env: 'live' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'order', masterids, env: 'live' }))
            },

            contactInfo: {
                /**
                 * 
                 * @param {{ userId: number, name: string, firstName: string, lastName: string, streetAddress1: string, city: string, state?: string, country: string, postCode?: string, phone: string }} body 
                 * @returns 
                 */
                updateContactInfo: async (body) => await (updateContactInfo(app, simSocket, liveSocket)({ body, env: 'live' })),
            },
        },
        sim: {
            /**
             * Returns unsubscribe fn
             * @param {string} entityType entity type to listen for
             * @param {(entity: {[k:string]:any}) => void} callback 
             * @returns {() => void}
             */
            on(entityType, callback) {
                return simSocket.subscribe(({ d }) => {
                    if(d.entityType === entityType) {
                        callback(d);
                    }
                })
            },
            async send(params) {
                return await simSocket.send(params);
            },
            account: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'account', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'account', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'account', ids, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'account', l: length, t: text, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'account', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'account', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'account', name, env: 'demo' }))
            },

            accountRiskStatus: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', id, env: 'demo' })),
                deps: async (masterid) => (await entityDeps(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', masterid, env: 'demo' })),
                ldeps: async (masterids) => (await entityLDeps(app, simSocket, liveSocket)({ entityType: 'accountRiskStatus', masterids, env: 'demo' }))
            },

            userAccountPositionLimit: {
                userAccountPositionLimitCreate: async (body) => await (userAccountPositionLimitCreate(app, simSocket, liveSocket)({ body, env: 'demo' })),
                userAccountPositionLimitDelete: async (body) => await (userAccountPositionLimitDelete(app, simSocket, liveSocket)({ body, env: 'demo' })),
                userAccountPositionLimitUpdate: async (body) => await (userAccountPositionLimitUpdate(app, simSocket, liveSocket)({ body, env: 'demo' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountPositionLimit', masterids, env: 'demo' }))
            },

            userAccountRiskParameter: {
                userAccountRiskParameterCreate: async (body) => await (userAccountRiskParameterCreate(app, simSocket, liveSocket)({ body, env: 'demo' })),
                userAccountRiskParameterDelete: async (body) => await (userAccountRiskParameterDelete(app, simSocket, liveSocket)({ body, env: 'demo' })),
                userAccountRiskParameterUpdate: async (body) => await (userAccountRiskParameterUpdate(app, simSocket, liveSocket)({ body, env: 'demo' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterids, env: 'demo' }))
            },

            userAccountAutoLiq: {
                userAccountAutoLiqUpdate: async (body) => await (userAccountAutoLiqUpdate(app, simSocket, liveSocket)({ body, env: 'demo' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userAccountAutoLiq', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', id, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userAccountRiskParameter', masterids, env: 'demo' }))
            },

            user: {
                /**
                 * @param {{ tradingPermissionId: number }} body 
                 * @returns 
                 */
                async acceptTradingPermission(body) { return await (acceptTradingPermission(app, simSocket, liveSocket)({ body, env: 'demo'})); },
                /**
                 * @param {{ accountId: number, ctaContact: string, ctaEmail: string }} body 
                 * @returns 
                 */
                async requestTradingPermission(body) { return await (requestTradingPermission(app, simSocket, liveSocket)({ body, env: 'demo' })); },
                /**
                 * @param {{ tradingPermissionId: number }} body 
                 * @returns 
                 */
                async revokeTradingPermission(body) { return await (revokeTradingPermission(app, simSocket, liveSocket)({ body, env: 'demo' })); },
                /**
                 * @param {{ name: string, email: string, password: string, firstName: string, lastName: string }} body 
                 * @returns 
                 */
                async signupOrganizationMember(body) { return await (signupOrganizationMember(app, simSocket, liveSocket)(body, 'demo')); },
                /**
                 * @param {{ templateAccountId?: number, name?: string, initialBalance?: number }} body 
                 * @returns 
                 */
                async openDemoAccount(body) { return await (openDemoAccount(app, simSocket, liveSocket)({ body, env: 'demo' })); },
                /**
                 * @param {{ tradovateSubscriptionPlanId: number, userId: number }} body 
                 * @returns 
                 */
                async addTradovateSubscription(body) { return await (addTradovateSubscription(app, simSocket, liveSocket)({ body, env: 'demo' })); },
                /**
                 * @param {{ marketDataSubscriptionPlanIds: number[], userId: number, accountId: number }} body 
                 * @returns 
                 */
                async addMarketDataSubscription(body) { return await (addMarketDataSubscription(app, simSocket, liveSocket)({ body, env: 'demo' })); },
                /**
                 * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, contractGroupId?: number, maxOpeningOrderQty?: number, maxClosingOrderQty?: number, maxBackMonth?: number, preExpirationDays?: number, marginPercentage?: number, marginDollarValue?: number, hardLimit?: boolean }} PreTradeRiskParameter
                 * @typedef {{contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'ReadyToTrade' | 'Verified', contractGroupId?: number, active: boolean, riskTimePeriodId?: number, totalBy: 'Contract' | 'ContractGroup' | 'DiscountGroup' | 'Exchange' | 'Overall' | 'Product' | 'ProductType', shortLimit?: number, longLimit?: number, exposedLimit?: number, description?: string, parameters: Array<PreTradeRiskParameter>}} PreTradeRisk
                 * @typedef {{marginPercentageAlert?: number, dailyLossPercentageAlert?: number, dailyLossAlert?: number, marginPercentageLiqOnly?: number, dailyLossPercentageLiqOnly?: number, dailyLossLiqOnly?: number, marginPercentageAutoLiq?: number, dailyLossPercentageAutoLiq?: number, dailyLossAutoLiq?: number, weeklyLossAutoLiq?: number, flattenTimestamp?: string, trailingMaxDrawdown?: number, trailingMaxDrawdownLimit?: number, trailingMaxDrawdownMode?: 'EOD' | 'RealTime', dailyProfitAutoLiq?: number, weeklyProfitAutoLiq?: number, doNotUnlock?: boolean }} PostTradeRisk
                 * @typedef {{ userId: number, templateAccountId: number, name: string, initialBalance: number, preTradeRisk: Array<PreTradeRisk>, postTradeRisk: PostTradeRisk }} EvaluationAccount
                 * @param {{ accounts: Array<EvaluationAccount> }} body
                 */
                async createEvaluationAccounts(body) { return await (createEvaluationAccounts(app, simSocket, liveSocket)({ body, env: 'demo' })); },

                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'user', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'user', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'user', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'user', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'user', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'user', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'user', l: length, t: text, env: 'demo' })),
            },

            marginSnapshot: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marginSnapshot', masterids, env: 'demo' })),
            },

            cashBalance: {
                /**
                 * @param {{ accountId: number, cashChange: number }} body 
                 * @returns 
                 */
                changeDemoBalance: async (body) => await (changeDemoBalance(app, simSocket, liveSocket)(body)),
                /**
                 * @param {{ accountId: number }} body 
                 * @returns 
                 */
                getCashBalanceSnapshot: async(body) => await (getCashBalanceSnapshot(app, simSocket, liveSocket)({ accountId: body.accountId, env: 'demo'})),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'cashBalance', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'cashBalance', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'cashBalance', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'cashBalance', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'cashBalance', masterids, env: 'demo' })),
            },

            currency: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'currency', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'currency', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'currency', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'currency', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'currency', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'currency', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'currency', l: length, t: text, env: 'demo' })),
            },

            position: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'position', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'position', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'position', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'position', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'position', masterids, env: 'demo' })),
            },

            fillPair: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'fillPair', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'fillPair', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'fillPair', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'fillPair', masterid, env: 'demo' })),
                ldeps: async (masterids) => await entityLDeps(app, simSocket, liveSocket)({ entityType: 'fillPair', masterids, env: 'demo' }),
            },

            contract: {
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contract', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contract', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contract', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contract', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'contract', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'contract', l: length, t: text, env: 'demo' })),
            },

            contractMaturity: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'contractMaturity', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contractMaturity', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contractMaturity', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contractMaturity', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contractMaturity', masterids, env: 'demo' })),
            },

            product: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'product', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'product', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'product', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'product', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'product', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'product', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'product', l: length, t: text, env: 'demo' })),
            },

            exchange: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'exchange', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'exchange', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'exchange', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'exchange', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'exchange', masterids, env: 'demo' })),
            },

            spreadDefinition: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'spreadDefinition', masterids, env: 'demo' })),
            },

            command: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'command', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'command', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'command', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'command', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'command', masterids, env: 'demo' })),
            },

            commandReport: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'commandReport', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'commandReport', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'commandReport', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'commandReport', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'commandReport', masterids, env: 'demo' })),
            },

            executionReport: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'executionReport', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'executionReport', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'executionReport', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'executionReport', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'executionReport', masterids, env: 'demo' })),
            },

            orderVersion: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderVersion', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderVersion', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderVersion', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderVersion', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderVersion', masterids, env: 'demo' })),
            },

            fill: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'fill', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'fill', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'fill', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'fill', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'fill', masterids, env: 'demo' })),
            },

            orderStrategy: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategy', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategy', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategy', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategy', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategy', masterids, env: 'demo' })),
            },
            
            orderStrategyLink: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyLink', masterids, env: 'demo' })),
            },

            userProperty: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userProperty', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userProperty', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userProperty', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userProperty', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userProperty', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'userProperty', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'userProperty', l: length, t: text, env: 'demo' })),
            },

            property: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'property', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'property', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'property', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'property', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'property', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'property', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'property', l: length, t: text, env: 'demo' })),
            },

            userPlugin: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'userPlugin', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'userPlugin', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'userPlugin', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'userPlugin', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'userPlugin', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'userPlugin', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'userPlugin', l: length, t: text, env: 'demo' })),
            },

            contractGroup: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'contractGroup', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'contractGroup', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'contractGroup', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'contractGroup', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'contractGroup', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'contractGroup', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'contractGroup', l: length, t: text, env: 'demo' })),
            },

            orderStrategyType: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', name, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'orderStrategyType', l: length, t: text, env: 'demo' })),
            },

            tradovateSubscriptionPlan: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'tradovateSubscriptionPlan', name, env: 'demo' })),
            },

            tradovateSubscription: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'tradovateSubscription', masterids, env: 'demo' })),
            },

            marketDataSubscription: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscription', masterids, env: 'demo' })),
            },

            marketDataSubscriptionPlan: {
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', ids, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', masterid, env })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', masterids, env: 'demo' })),
                find: async (name) => await (entityFind(app, simSocket, liveSocket)({ entityType: 'marketDataSubscriptionPlan', name, env: 'demo' })),
            },

            contactInfo: {
                updateContactInfo: async (body) => await (updateContactInfo(app, simSocket, liveSocket)({ body, env: 'demo' })),
            },

            order: {
                cancelOrder: async body => await (cancelOrder(app, simSocket, liveSocket)({ body, env: 'demo' })),
                liquidatePosition: async body => await (liquidatePosition(app, simSocket, liveSocket)({ body, env: 'demo' })),
                modifyOrder: async body => await (modifyOrder(app, simSocket, liveSocket)({ body, env: 'demo' })),
                placeOCO: async body => await (placeOCO(app, simSocket, liveSocket)({ body, env: 'demo' })),
                placeOSO: async body => await (placeOSO(app, simSocket, liveSocket)({ body, env: 'demo' })),
                placeOrder: async body => await (placeOrder(app, simSocket, liveSocket)({ body, env: 'demo' })),
                list: async () => await (entityList(app, simSocket, liveSocket)({ entityType: 'order', env: 'demo' })),
                item: async (id) => await (entityItem(app, simSocket, liveSocket)({ entityType: 'order', id, env: 'demo' })),
                items: async (ids) => await (entityItems(app, simSocket, liveSocket)({ entityType: 'order', ids, env: 'demo' })),
                suggest: async (text, length) => await (entitySuggest(app, simSocket, liveSocket)({ entityType: 'order', l: length, t: text, env: 'demo' })),
                deps: async (masterid) => await (entityDeps(app, simSocket, liveSocket)({ entityType: 'order', masterid, env: 'demo' })),
                ldeps: async (masterids) => await (entityLDeps(app, simSocket, liveSocket)({ entityType: 'order', masterids, env: 'demo' }))
            },

            contactInfo: {
                /**
                 * 
                 * @param {{ userId: number, name: string, firstName: string, lastName: string, streetAddress1: string, city: string, state?: string, country: string, postCode?: string, phone: string }} body 
                 * @returns 
                 */
                updateContactInfo: async (body) => await (updateContactInfo(app, simSocket, liveSocket)({ body, env: 'demo' })),
            },
        }
    });
}