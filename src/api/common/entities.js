 /** 
 * @typedef { { id: number, name: string, timestamp: string, email: string, status: string, professional: boolean, organizationId?: number, linkedUserId?: number, foreignIntroducingBroker?: number } } User
 * 
 * @typedef { { id: number, name: string, userId: number, accountType: 'Customer' | 'Giveup' | 'House' | 'Omnibus' | 'Wash', active: boolean, clearingHouseId: number, riskCategoryId: number, autoLiqProfileId: number, marginAccountType: 'Hedger' | 'Speculator', legalStatus: 'Corporation' | 'GP' | 'IRA' | 'Individual' | 'Joint' | 'LLC' | 'LLP' | 'LP' | 'Trust', timestamp: string, readonly?: boolean } } Account
 * 
 * @typedef { { id: number, adminAction?: 'AgreedOnLiqOnlyModeByAutoLiq' | 'AgreedOnLiquidationByAutoLiq' | 'DisableAutoLiq' | 'LiquidateImmediately' | 'LiquidateOnlyModeImmediately' | 'LockTradingImmediately' | 'Normal' | 'PlaceAutoLiqOnHold', adminTimestamp?: string, liquidateOnly?: string, userTriggeredLiqOnly?: boolean } } AccountRiskStatus
 * 
 * @typedef { { id: number, timestamp: string, riskTimePeriodId: number, initialMargin: number, maintenanceMargin: number, autoLiqLevel?: number, liqOnlyLevel?: number, totalUsedMargin: number, fullInitialMargin: number } } MarginSnapshot
 * 
 * @typedef {{ day: number, month: number, year: number }} TradeDate
 * 
 * @typedef {'Canceled' | 'Completed' | 'Expired' | 'Filled' | 'Rejected' | 'PendingCancel' | 'PendingNew' | 'PendingReplace' | 'Suspended' | 'Unknown' | 'Working'} OrdStatus
 * 
 * @typedef {{ id: number, changesLocked?: boolean, marginPercentageAlert?: number, dailyLossPercentageAlert?: number, dailyLossAlert?: number, marginPercentageLiqOnly?: number, dailyLossPercentageLiqOnly?: number, dailyLossLiqOnly?: number, marginPercentageAutoLiq?: number, dailyLossPercentageAutoLiq?: number, dailyLossAutoLiq?: number, weeklyLossAutoLiq?: number, flattenTimestamp?: string, trailingMaxDrawdown?: number, trailingMaxDrawdownLimit?: number, trailingMaxDrawdownMode?: 'EOD' | 'RealTime', dailyProfitAutoLiq?: number, weeklyProfitAutoLiq?: number }} UserAccountAutoLiq
 * 
 * @typedef {{ id: number, accountId: number, timestamp: string, tradeDate: TradeDate, currencyId: number, amount: number, realizedPnL?: number, weekRealizedPnL?: number }} CashBalance
 * 
 * @typedef {{ id: number, name: string, symbol?: string }} Currency
 * 
 * @typedef {{ id: number, accountId: number, contractId: number, timestamp: string, tradeDate: TradeDate, netPos: number, netPrice?: number, bought: number, boughtValue: number, sold: number, soldValue: number, prevPos: number, prevPrice?: number }} Position
 * 
 * @typedef {{ id: number, positionId: number, buyFillId: number, sellFillId: number, qty: number, buyPrice: number, sellPrice: number, active: boolean }} FillPair
 * 
 * @typedef {{ id: number, accountId: number, contractId?: number, spreadDefinitionId?: number, timestamp: string, action: 'Buy' | 'Sell', ordStatus: OrdStatus, executionProviderId?: number, ocoId?: number, parentId?: number, linkedId?: number, admin: boolean}} Order
 * 
 * @typedef {{ id: number, name: string, contractMaturityId: number }} Contract
 * 
 * @typedef {{ id: number, productId: number, expirationMonth: number, expirationDate: string, firstIntentDate?: string, underlyingId?: number, isFront: boolean }} ContractMaturity
 * 
 * @typedef {{ id: number, name: string, currencyId: number, productType: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', description: string, exchangeId: number, contractGroupId: number, riskDiscountContractGroupId?: number, status: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'ReadyToTrade' | 'Verified', months?: string, isSecured?: boolean, valuePerPoint: number, priceFormatType: 'Decimal' | 'Fractional', priceFormat: number, tickSize: number }} Product
 * 
 * @typedef {{ id: number, name: string }} Exchange
 * 
 * @typedef {{ id: number, timestamp: string, spreadType: 'Bundle' | 'BundleSpread' | 'Butterfly' | 'CalendarSpread' | 'Condor' | 'Crack' | 'DoubleButterfly' | 'General' | 'IntercommoditySpread' | 'LaggedIntercommoditySpread' | 'Pack' | 'PackButterfly' | 'PackSpread' | 'ReducedTickCalendarSpread' | 'ReverseIntercommoditySpread' | 'ReverseSpread' | 'Strip' | 'TreasuryIntercommoditySpread', uds: boolean} } SpreadDefinition
 * 
 * @typedef {'AtExecution' | 'ExecutionRejected' | 'ExecutionStopped' | 'ExecutionSuspended' | 'OnHold' | 'Pending' | 'PendingExecution' | 'Replaced' | 'RiksPassed' | 'RiskRejected'} CommandStatus
 * 
 * @typedef {{ id: number, orderId: number, timestamp: string, clOrdId?: string, commandType: 'Cancel' | 'New' | 'Modify', commandStatus: CommandStatus, senderId?: number, userSessionId?: number, activationTime?: string, customTag50?: string, isAutomated?: boolean}} Command
 * 
 * @typedef {'AccountClosed' | 'AdvancedTrailingStopUnsupported' | 'AnotherCommandPending' | 'BackMonthProhibited' | 'ExecutionProviderNotConfigured' | 'ExecutionProviderUnavailable' | 'InvalidContract' | 'InvalidPrice' | 'LiquidationOnly' | 'LiquidationOnlyBeforeExpiration' | 'MaxOrderQtyIsNotSpecified' | 'MaxOrderQtyLimitReached' | 'MaxPosLimitMisconfigured' | 'MaxPosLimitReached' | 'MaxTotalPosLimitReached' | 'MultipleAccountPlanRequired' | 'NoQuote' | 'NotEnoughLiquidity' | 'OtherExecutionRelated' | 'ParentRejected' | 'RiskCheckTimeout' | 'SessionClosed' | 'Success' | 'TooLate' | 'TradingLocked' | 'TrailingStopNonOrderQtyModify' | 'Unauthorized' | 'UnknownReason' | 'Unsupported'} RejectReason
 * 
 * @typedef {{ id: number, commandId: number, timestamp: string, commandStatus: CommandStatus, rejectReason?: RejectReason, text?: string, ordStatus?: OrdStatus }} CommandReport
 * 
 * @typedef {'Canceled' | 'Completed' | 'DoneForDay' | 'Expired' | 'New' | 'OrderStatus' | 'PendingCancel' | 'PendingNew' | 'PendingReplace' | 'Rejected' | 'Replaced' | 'Stopped' | 'Suspended' | 'Trade' | 'TradeCancel' | 'TradeCorrect'} ExecType
 * 
 * @typedef {{ id: number, commandId: number, name: string, accountId: number, contractId: number, timestamp: string, tradeDate?: TradeDate, orderId: number, execType: ExecType, execRefId?: string, ordStatus?: OrdStatus, action: 'Buy' | 'Sell', cumQty?: number, avgPx?: number, lastQty?: number, lastPx?: number, rejectReason?: RejectReason, text?: string, exchangeOrderId?: string }} ExecutionReport
 * 
 * @typedef {'Limit' | 'MIT' | 'Market' | 'Stop' | 'StopLimit' | 'TrailingStop' | 'TrailingStopLimit'} OrderType
 * 
 * @typedef {'Day' | 'FOK' | 'GTC' | 'GTD' | 'IOC'} TimeInForce
 * 
 * @typedef {{ id: number, orderId: number, orderQty: number, orderType: OrderType, price?: number, stopPrice?: number, maxShow?: number, pegDifference? number, timeInForce?: TimeInForce, expireTime?: string, text?: string }} OrderVersion
 * 
 * @typedef {{ id: number, orderId: number, contractId: number, timestamp: string, tradeDate: TradeDate, action: 'Buy' | 'Sell', qty: number, price: number, active: boolean, finallyPaired: number}} Fill
 * 
 * @typedef {'ActiveStrategy' | 'ExecutionFailed' | 'ExecutionFinished' | 'ExecutionInterrupted' | 'InactiveStrategy' | 'NotEnoughLiquidity' | 'StoppedByUser'} StrategyStatus
 * 
 * @typedef {{ id: number, accountId: number, timestamp: string, contractId: number, OrderStrategyTypeId: number, initiatorId?: number, action: 'Buy' | 'Sell', params?: string, uuid?: string, status: StrategyStatus, failureMessage?: string, senderId? number, customTag50?: string, userSessionId?: number}} OrderStrategy
 * 
 * @typedef {{ id: number, orderStrategyId: number, orderId: number, label: string }} OrderStrategyLink
 * 
 * @typedef {{ id: number, userId: number, propertyId: number, value?: string }} UserProperty
 * 
 * @typedef {{ id: number, name: string, propertyType: 'Boolean' | 'Enum' | 'String' | 'Integer', enumOptions?: string, defaultValue?: string}} Property
 * 
 * @typedef {{ id: number, userId: number, timestamp: string, planPrice: number, creditCardTransactionId?: number, cashBalanceLogId?: number, creditCardId: number, accountId?: number, pluginName: string, approval: boolean, entitlementId?: number, startDate: TradeDate, expirationDate?: TradeDate, paidAmount: number, autorenewal?: boolean, planCategories?: string }} UserPlugin
 * 
 * @typedef {{ id: number, name: string }} ContractGroup
 * 
 * @typedef {{ id: number, name: string, enabled: boolean }} OrderStrategyType
 * 
 * @typedef { User | Account | UserAccountPositionLimit | UserAccountRiskParameter | AccountRiskStatus | MarginSnapshot | UserAccountAutoLiq | CashBalance | Currency | Position | FillPair | Order | Contract | ContractMaturity | Product | Exchange | SpreadDefinition | Command | CommandReport | ExecutionReport | OrderVersion | Fill | OrderStrategy | OrderStrategyLink | UserProperty | Property | UserPlugin | ContractGroup | OrderStrategyType } TdvEntity
 * 
 * @typedef {{ action: 'Buy' | 'Sell', clOrdId?: string, orderType: OrderType, price?: number, stopPrice?: number, maxShow?: number, pegDifference?: number, timeInForce?: TimeInForce, expireTime?: string, text?: string }} OSOBracket
 * 
 * @typedef {{ id: number, contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'Verified', contractGroupId?: number, active: boolean, maxOpeningOrderQty?: number, maxClosingOrderQty?: number, maxBackMonth?: number, preExpirationDays?: number, marginPercentage?: number, marginDollarValue?: number, hardLimit?: number, userAccountPositionLimitId: number }} UserAccountPositionLimit
 * 
 * @typedef {{ contractId?: number, productId?: number, exchangeId?: number, productType?: 'CommonStock' | 'Continuous' | 'Cryptocurrency' | 'Futures' | 'MarketInternals' | 'Options' | 'Spread', riskDiscountContractGroupId?: number, productVerificationStatus?: 'Inactive' | 'Locked' | 'ReadyForContracts' | 'Verified', contractGroupId?: number, active: boolean, riskTimePeriod?: number, totalBy: 'Contract' | 'ContractGroup' | 'DiscountGroup' | 'Exchange' | 'Overall' | 'Product' | 'ProductType', shortLimit?: number, longLimit?: number, exposedLimit?: number, description?: string, accountId: number }} UserAccountRiskParameter
 * 
 * @typedef { 'userAccountPositionLimit' | 'userAccountRiskParameter' | 'user' | 'account' | 'accountRiskStatus' | 'marginSnapshot' | 'userAccountAutoLiq' | 'cashBalance' | 'currency' | 'position' | 'fillPair' | 'order' | 'contract' | 'contractMaturity' | 'product' | 'exchange' | 'spreadDefinition' | 'command' | 'commandReport' | 'executionReport' | 'orderVersion' | 'fill' | 'orderStrategy' | 'orderStrategyLink' | 'userProperty' | 'property' | 'userPlugin' | 'contractGroup' | 'orderStrategyType' } EntityType
 */