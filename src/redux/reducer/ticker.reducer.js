import { SAVE_TICKER } from "../action/types";
import _assign from "lodash/assign";

const initialState = {};

export default function tickerReducer(state = initialState, action) {
  const { tickers, type } = action;
  switch (type) {
    case SAVE_TICKER:
      const newState = _assign({}, state, tickers);
      return newState;
    default:
      return state;
  }
}
