const initialState = {
    myStocks: [],
    mySymbols: [],
    myQuotes: {},
    nonOwnedStocks: [],
    nonOwnedSymbols: [],
    quotes: {},
    tab: 'owned',
    addCompany:'',
    addSymbol:''
}


//////Action Types/////
const UPDATE_MY_STOCKS = "UPDATE_MY_STOCKS";
const UPDATE_MY_SYMBOLS = "UPDATE_MY_SYMBOLS";
const UPDATE_MY_QUOTES = "UPDATE_MY_QUOTES";
const UPDATE_NONOWNEDSTOCKS = "UPDATE_ALLSTOCKS";
const UPDATE_NONOWNEDSYMBOLS = "UPDATE_NONOWNEDSYMBOLS";
const UPDATE_QUOTES = "UPDATE_QUOTES";
const UPDATE_TAB = "UPDATE_TAB";
const UPDATE_ADD_COMPANY="UPDATE_ADD_COMPANY";
const UPDATE_ADD_SYMBOL="UPDATE_ADD_SYMBOL";
const UPDATE_HANDLE_ADD_TO_WATCHLIST="UPDATE_HANDLE_ADD_TO_WATCHLIST";

/////Switch/////
function reducer(state = initialState, action) {
    switch (action.type) {
        
        case UPDATE_MY_STOCKS:
            return Object.assign({}, state, { myStocks: action.payload });
        case UPDATE_MY_SYMBOLS:
            return Object.assign({}, state, { mySymbols: action.payload });
        case UPDATE_MY_QUOTES:
            return Object.assign({}, state, { myQuotes: action.payload });
        case UPDATE_NONOWNEDSTOCKS:
            return Object.assign({}, state, { nonOwnedStocks: action.payload });
        case UPDATE_NONOWNEDSYMBOLS:
            return Object.assign({}, state, { nonOwnedSymbols: action.payload })
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
                addCompany:'',
                addSymbol:''
            }
        default:
            return state;
    }
}

//Action Creators

export function updateMyStocks(myStocks) {
    return {
        type: UPDATE_MY_STOCKS,
        payload: myStocks
    }
}
export function updateMySymbols(mySymbols) {
    return {
        type: UPDATE_MY_SYMBOLS,
        payload: mySymbols
    }
}
export function updateMyQuotes(myQuotes) {
    return {
        type: UPDATE_MY_QUOTES,
        payload: myQuotes
    }
}
export function updateNonOwnedStocks(nonOwnedStocks) {
    return {
        type: UPDATE_NONOWNEDSTOCKS,
        payload: nonOwnedStocks
    }
}
export function updateNonOwnedSymbols(nonOwnedSymbols) {
    return {
        type: UPDATE_NONOWNEDSYMBOLS,
        payload: nonOwnedSymbols
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
export function updateHandleAddToWatchlist(){
    return{
        type: UPDATE_HANDLE_ADD_TO_WATCHLIST
    }
}


export default reducer;