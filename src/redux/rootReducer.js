import { combineReducers } from "redux";

import tickerReducer from "./reducer/ticker.reducer";
import tickerPairReducer from "./reducer/tickerPair.reducer";
import ToastReducer from "./reducer/toast.reducer";
import bookReducer from "./reducer/book.reducer";
import tradesReducer from "./reducer/trades.reduces";

const rootReducer = combineReducers({
  ticker: tickerReducer,
  tickerPair: tickerPairReducer,
  toast: ToastReducer,
  book: bookReducer,
  trades: tradesReducer,
});

export default rootReducer;
