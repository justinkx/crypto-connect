import {
  INITIALIZE_TRADES_CHANNEL,
  SAVE_TRADES,
  RESET_TRADES_CHANNEL,
} from "./types";

export const initializeChannel = () => ({ type: INITIALIZE_TRADES_CHANNEL });

export const saveTrades = (trades) => ({ type: SAVE_TRADES, trades });

export const resetTradesChannel = () => ({ type: RESET_TRADES_CHANNEL });
