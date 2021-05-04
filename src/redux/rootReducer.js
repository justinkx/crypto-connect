import { combineReducers } from "redux";

import tickerReducer from "./reducer/ticker.reducer";

const rootReducer = combineReducers({
  ticker: tickerReducer,
});

export default rootReducer;
