import _assign from "lodash/assign";

import { SAVE_BOOK, RESET_BOOK_CHANNEL } from "../action/types";

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
      return {
        ask,
        bid,
        symbol,
      };
    case RESET_BOOK_CHANNEL:
      return initialState;
    default:
      return state;
  }
}
