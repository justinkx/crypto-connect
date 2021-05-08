import _assign from "lodash/assign";

import { SAVE_BOOK } from "../action/types";

const initialState = {
  ask: {},
  bid: {},
  symbol: "",
};

export default function bookReducer(state = initialState, action) {
  const { type, book } = action;
  switch (type) {
    case SAVE_BOOK:
      const { ask = {}, bid = {}, symbol = "" } = book;
      const _ask = _assign({}, state.ask, ask);
      const _bid = _assign({}, state.bid, bid);
      const newBookState = _assign(
        {},
        state,
        { ask: _ask },
        { bid: _bid },
        { symbol }
      );
      return newBookState;
    default:
      return state;
  }
}
