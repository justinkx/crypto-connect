import {
  SET_TICKER_PAIR,
  SAVE_PAIR_DATA,
  RESET_TICKER_PAIR,
} from "../action/types";

const initialState = {
  pair: null,
  eventType: "",
  eventTime: null,
  symbol: "",
  priceChange: "",
  priceChangePercentage: "",
  weightedAveragePrice: "",
  firstTradePrice: "",
  lastPrice: "",
  lastQuandity: "",
  bestBidPrice: "",
  bestBidQuantity: "",
  bestAskPrice: "",
  bestAskQuantity: "",
  openPrice: "",
  highPrice: "",
  lowPrice: "",
  totalTradedBaseAssetVolume: "",
  totalTradedQuoteAssetVolume: "",
  statisticsOpenTime: null,
  statisticsCloseTime: null,
  firstTradeId: null,
  lastTradeId: null,
  totalNumberOfTrades: null,
};

export default function tickerPairReducer(state = initialState, action) {
  const { data, pair, type } = action;
  switch (type) {
    case SET_TICKER_PAIR:
      return { ...state, pair: pair };
    case SAVE_PAIR_DATA:
      return { ...state, ...data };
    case RESET_TICKER_PAIR:
      return initialState;
    default:
      return state;
  }
}
