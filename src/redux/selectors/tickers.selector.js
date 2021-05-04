import { createSelector } from "reselect";

export const getReducer = (state) => state.ticker;
export const getSymbols = (state) => Object.keys(getReducer(state));

export const getTickerSymbols = createSelector(
  getSymbols,
  (symbols) => symbols
);
