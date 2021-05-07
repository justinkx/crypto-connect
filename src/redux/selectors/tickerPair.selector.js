import { createSelector } from "reselect";
import _toLower from "lodash/toLower";

export const getReducer = (state) => state.tickerPair || {};

export const getSelectedPair = createSelector(getReducer, (tickerPair) =>
  _toLower(tickerPair.pair)
);

export const getPairClosePrice = createSelector(
  getReducer,
  (tickerPair) => tickerPair.lastPrice
);
