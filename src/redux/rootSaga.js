import { spawn } from "redux-saga/effects";

import tickerSaga from "./saga/ticker.saga";
import tickerPairSaga from "./saga/tickerPair.saga";

export default function* rootSaga() {
  yield spawn(tickerSaga);
  yield spawn(tickerPairSaga);
}
