import {
  SET_TICKER_PAIR,
  SAVE_PAIR_DATA,
  RESET_TICKER_PAIR,
  START_TICKER_PAIR_SOCKET,
} from "./types";

export const setTickerPair = (pair) => ({ type: SET_TICKER_PAIR, pair });
export const savePairData = (data) => ({ type: SAVE_PAIR_DATA, data });
export const resetTickerPair = () => ({ type: RESET_TICKER_PAIR });
export const startTickerPairSocket = () => ({ type: START_TICKER_PAIR_SOCKET });
