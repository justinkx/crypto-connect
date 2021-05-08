import { combineReducers } from "redux";

import tickerReducer from "./reducer/ticker.reducer";
import tickerPairReducer from "./reducer/tickerPair.reducer";
import ToastReducer from "./reducer/toast.reducer";

const rootReducer = combineReducers({
  ticker: tickerReducer,
  tickerPair: tickerPairReducer,
  toast: ToastReducer,
});

export default rootReducer;
