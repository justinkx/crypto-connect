import { spawn } from "redux-saga/effects";

import tickerSaga from "./saga/ticker.saga";
import tickerPairSaga from "./saga/tickerPair.saga";
import websocketConnectionSaga from "./saga/ws.connection.saga";
import wsMessageSaga from "./saga/ws.message.saga";
import bookSaga from "./saga/book.saga";

export default function* rootSaga() {
  yield spawn(websocketConnectionSaga);
  yield spawn(wsMessageSaga);
  yield spawn(tickerSaga);
  yield spawn(tickerPairSaga);
  yield spawn(bookSaga);
}
