import { put, takeLatest, select } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import { SET_TICKER_PAIR, RESET_TICKER_PAIR } from "../action/types";
import { startTickerPairSocket } from "../action/tickerPair.action";
import { getSelectedPair } from "../selectors/tickerPair.selector";
import { initializeBook } from "../action/book.action";

function* tickerPairListenerSaga() {
  yield put(startTickerPairSocket());
  const pair = yield select(getSelectedPair);
  if (pair) {
    yield put(
      send({
        method: "SUBSCRIBE",
        params: [`${pair}@ticker`],
        id: 2,
      })
    );
    yield put(initializeBook());
  }
}
function* tickerResetSaga() {
  const pair = yield select(getSelectedPair);
  yield put(
    send({
      method: "UNSUBSCRIBE",
      params: [`${pair}@ticker`],
      id: 312,
    })
  );
}
export default function* tickerPairSaga() {
  yield takeLatest(SET_TICKER_PAIR, tickerPairListenerSaga);
  yield takeLatest(RESET_TICKER_PAIR, tickerResetSaga);
}
