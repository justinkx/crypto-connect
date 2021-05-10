import _assign from "lodash/assign";

import { SAVE_TRADES, RESET_TRADES_CHANNEL } from "../action/types";

const initialState = {};

export default function tradesReducer(state = initialState, action) {
  const { trades, type } = action;
  switch (type) {
    case SAVE_TRADES:
      return trades;
    case RESET_TRADES_CHANNEL:
      return initialState;
    default:
      return state;
  }
}
