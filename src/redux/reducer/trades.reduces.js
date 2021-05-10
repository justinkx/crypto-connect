import _assign from "lodash/assign";

import { SAVE_TRADES } from "../action/types";

const initialState = {};

export default function tradesReducer(state = initialState, action) {
  const { trades, type } = action;
  switch (type) {
    case SAVE_TRADES:
      const newState = _assign({}, state, trades);
      return newState;

    default:
      return state;
  }
}
