import { put, takeLatest } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import { INITIALIZE_TICKER_CHANNEL } from "../action/types";

function* initializeWebSocketsChannel() {
  yield put(
    send({
      method: "SET_PROPERTY",
      params: ["combined", true],
      id: 5,
    })
  );
  yield put(
    send({
      method: "SUBSCRIBE",
      params: ["!miniTicker@arr"],
      id: 1,
    })
  );
}

export default function* tickerSaga() {
  yield takeLatest(INITIALIZE_TICKER_CHANNEL, initializeWebSocketsChannel);
}
