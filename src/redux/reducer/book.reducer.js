import _assign from "lodash/assign";

import { SAVE_BOOK } from "../action/types";

const initialState = {
  ask: {},
  bid: {},
  symbol: "",
};

export default function bookReducer(state = initialState, action) {
  const {
    type,
    book: { ask, bid, symbol },
  } = action;
  switch (type) {
    case SAVE_BOOK:
      const _ask = _assign({}, state.ask, ask);
      const _bid = _assign({}, state.bid, bid);
      const newBookState = _assign({}, state, _ask, _bid, { symbol });
      return newBookState;
    default:
      return state;
  }
}
