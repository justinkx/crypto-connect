import { INITIALIZE_TICKER_CHANNEL, SAVE_TICKER } from "./types";

export const initializeTicker = () => ({ type: INITIALIZE_TICKER_CHANNEL });
export const saveTickers = (tickers) => ({ type: SAVE_TICKER, tickers });
