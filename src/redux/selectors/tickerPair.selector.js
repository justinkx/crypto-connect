import { createSelector } from "reselect";
import _toLower from "lodash/toLower";

export const getReducer = (state) => state.tickerPair || {};

export const getSelectedPair = createSelector(getReducer, (tickerPair) =>
  _toLower(tickerPair.pair)
);

export const getPairClosePrice = createSelector(getReducer, (tickerPair) => ({
  lastPrice: tickerPair.lastPrice || null,
  totalNumberOfTrades: tickerPair.totalNumberOfTrades || null,
  bestBidPrice: tickerPair.bestBidPrice || null,
  bestAskPrice: tickerPair.bestAskPrice || null,
}));
