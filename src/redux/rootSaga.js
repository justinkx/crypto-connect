import { spawn } from "redux-saga/effects";

import tickerSaga from "./saga/ticker.saga";

export default function* rootSaga() {
  yield spawn(tickerSaga);
}
