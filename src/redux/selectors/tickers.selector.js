import {
  createSelector,
  defaultMemoize,
  createSelectorCreator,
} from "reselect";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getReducer = (state) => state.ticker;
export const getSymbols = (state) => Object.keys(getReducer(state));

export const getTickerSymbols = createSelector(getReducer, (tickers) =>
  Object.keys(tickers)
);

export const getSymbolsForPair = createDeepEqualSelector(
  getTickerSymbols,
  (symbols) =>
    memoizeOne((suffix = "USDT") => {
      let symbolForPairArray = [];
      for (i = 0; i < symbols.length; i++) {
        const pair = symbols[i];
        if (pair.endsWith(suffix)) {
          symbolForPairArray = [...symbolForPairArray, symbols[i]];
          continue;
        }
      }
      return symbolForPairArray;
    })
);

export const getSymbolTicker = createDeepEqualSelector(getReducer, (tickers) =>
  memoizeOne((symbol = "BTCUSD") => tickers[symbol])
);
