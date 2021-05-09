import { combineReducers } from "redux";

import tickerReducer from "./reducer/ticker.reducer";
import tickerPairReducer from "./reducer/tickerPair.reducer";
import ToastReducer from "./reducer/toast.reducer";
import bookReducer from "./reducer/book.reducer";

const rootReducer = combineReducers({
  ticker: tickerReducer,
  tickerPair: tickerPairReducer,
  toast: ToastReducer,
  book: bookReducer,
});

export default rootReducer;
