const initialState = {
    user: {},
    myStocks: [],
    myQuotes: {},
    nonOwnedStocks: [],
    pending: [],
    quotes: {},
    tab: 'owned',
    addCompany: '',
    addSymbol: '',
    buySell: '',
    tradeQty: 0,
    orderType: '',
    targetPrice: 0,
    pendingQuantity: 0,
    pendingTrigger: 0,
    orderInfo: []
}


//////Action Types/////
const UPDATE_USER= "UPDATE_USER";
const UPDATE_MY_STOCKS = "UPDATE_MY_STOCKS";
const UPDATE_NONOWNEDSTOCKS = "UPDATE_NONOWNEDSTOCKS";
const UPDATE_PENDING = "UPDATE_PENDING";
const UPDATE_QUOTES = "UPDATE_QUOTES";
const UPDATE_TAB = "UPDATE_TAB";
const UPDATE_ADD_COMPANY = "UPDATE_ADD_COMPANY";
const UPDATE_ADD_SYMBOL = "UPDATE_ADD_SYMBOL";
const UPDATE_HANDLE_ADD_TO_WATCHLIST = "UPDATE_HANDLE_ADD_TO_WATCHLIST";
const UPDATE_BUY_SELL = "UPDATE_BUY_SELL";
const UPDATE_ORDER_TYPE = "UPDATE_ORDER_TYPE";
const UPDATE_TARGET_PRICE = "UPDATE_TARGET_PRICE";
const UPDATE_TRADE_QTY = "UPDATE_TRADE_QTY";
const UPDATE_PENDING_QUANTITY = "UPDATE_PENDING_QUANTITY";
const UPDATE_PENDING_TRIGGER = "UPDATE_PENDING_TRIGGER";
const UPDATE_ORDER_INFO = "UPDATE_ORDER_INFO";

/////Switch/////
function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({},state,{user:action.payload})
        case UPDATE_MY_STOCKS:
            return Object.assign({}, state, { myStocks: action.payload });
        case UPDATE_NONOWNEDSTOCKS:
            return Object.assign({}, state, { nonOwnedStocks: action.payload });
        case UPDATE_PENDING:
            return Object.assign({}, state, { pending: action.payload });
        case UPDATE_QUOTES:
            return Object.assign({}, state, { quotes: action.payload })
        case UPDATE_TAB:
            return Object.assign({}, state, { tab: action.payload })
        case UPDATE_ADD_COMPANY:
            return Object.assign({}, state, { addCompany: action.payload })
        case UPDATE_ADD_SYMBOL:
            return Object.assign({}, state, { addSymbol: action.payload })
        case UPDATE_HANDLE_ADD_TO_WATCHLIST:
            return {
                addCompany: '',
                addSymbol: ''
            }
        case UPDATE_BUY_SELL:
            return Object.assign({}, state, { buySell: action.payload })
        case UPDATE_TRADE_QTY:
            return Object.assign({}, state, { tradeQty: action.payload })
        case UPDATE_ORDER_TYPE:
            return Object.assign({}, state, { orderType: action.payload })
        case UPDATE_TARGET_PRICE:
            return Object.assign({}, state, { targetPrice: action.payload })
        case UPDATE_PENDING_QUANTITY:
            return Object.assign({}, state, { pendingQuantity: action.payload })
        case UPDATE_PENDING_TRIGGER:
            return Object.assign({}, state, { pendingTrigger: action.payload })
        case UPDATE_ORDER_INFO:
            return Object.assign({}, state, { orderInfo: action.payload })
        default:
            return state;
    }
}

//Action Creators
export function updateUser(data){
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export function updateMyStocks(myStocks) {
    return {
        type: UPDATE_MY_STOCKS,
        payload: myStocks
    }
}
export function updateNonOwnedStocks(nonOwnedStocks) {
    return {
        type: UPDATE_NONOWNEDSTOCKS,
        payload: nonOwnedStocks
    }
}
export function updatePending(pending) {
    return {
        type: UPDATE_PENDING,
        payload: pending
    }
}
export function updateQuotes(quotes) {
    return {
        type: UPDATE_QUOTES,
        payload: quotes
    }
}
export function updateTab(tab) {
    return {
        type: UPDATE_TAB,
        payload: tab
    }
}
export function updateAddCompany(addCompany) {
    return {
        type: UPDATE_ADD_COMPANY,
        payload: addCompany
    }
}
export function updateAddSymbol(addSymbol) {
    return {
        type: UPDATE_ADD_SYMBOL,
        payload: addSymbol
    }
}
export function updateBuySell(buySell) {
    return {
        type: UPDATE_BUY_SELL,
        payload: buySell
    }
}
export function updateTradeQty(tradeQty) {
    return {
        type: UPDATE_TRADE_QTY,
        payload: tradeQty
    }
}
export function updateOrderType(orderType) {
    return {
        type: UPDATE_ORDER_TYPE,
        payload: orderType
    }
}
export function updateHandleAddToWatchlist() {
    return {
        type: UPDATE_HANDLE_ADD_TO_WATCHLIST
    }
}
export function updateTargetPrice(targetPrice) {
    return {
        type: UPDATE_TARGET_PRICE,
        payload: targetPrice
    }
}
export function updatePendingQuantity(pendingQuantity) {
    return {
        type: UPDATE_PENDING_QUANTITY,
        payload: pendingQuantity
    }
}
export function updatePendingTrigger(pendingTrigger) {
    return {
        type: UPDATE_PENDING_TRIGGER,
        payload: pendingTrigger
    }
}
export function updateOrderInfo(orderInfo){
    return{
        type: UPDATE_ORDER_INFO,
        payload: orderInfo
    }
}

export default reducer;