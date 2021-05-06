import { combineReducers } from "redux";

import tickerReducer from "./reducer/ticker.reducer";
import tickerPairReducer from "./reducer/tickerPair.reducer";

const rootReducer = combineReducers({
  ticker: tickerReducer,
  tickerPair: tickerPairReducer,
});

export default rootReducer;
