import { createSelector } from "reselect";
import _values from "lodash/values";

export const getTradesReducer = (state) => state.trades || {};

export const getTrades = createSelector(getTradesReducer, (trades) =>
  _values(trades)
);
