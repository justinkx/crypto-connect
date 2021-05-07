import { put, take, takeLatest } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import { INITIALIZE_TICKER_CHANNEL, SAVE_TICKER } from "../action/types";
import { tickerTransform } from "../adaptor/tickers.adaptor";

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
