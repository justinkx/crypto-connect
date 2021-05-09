import _assign from "lodash/assign";

import { SAVE_BOOK, RESET_BOOK_CHANNEL } from "../action/types";

const initialState = {
  ask: {},
  bid: {},
  symbol: "",
  firstUpdateId: "",
  finalUpdateId: "",
};

export default function bookReducer(state = initialState, action) {
  const { type, book } = action;
  switch (type) {
    case SAVE_BOOK:
      const {
        ask = {},
        bid = {},
        symbol = "",
        firstUpdateId,
        finalUpdateId,
      } = book;
      return {
        ask,
        bid,
        symbol,
        firstUpdateId,
        finalUpdateId,
      };
    case RESET_BOOK_CHANNEL:
      return initialState;
    default:
      return state;
  }
}
