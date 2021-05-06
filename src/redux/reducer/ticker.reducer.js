import { SAVE_TICKER } from "../action/types";

const initialState = {};

export default function tickerReducer(state = initialState, action) {
  const { tickers, type } = action;
  switch (type) {
    case SAVE_TICKER:
      return { ...state, ...tickers };
    default:
      return state;
  }
}
