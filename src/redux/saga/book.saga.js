import { put, takeLatest, select } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import {
  RESET_BOOK_CHANNEL,
  INITIALIZE_BOOK_CHANNEL,
  RESET_TICKER_PAIR,
} from "../action/types";
import { getSelectedPair } from "../selectors/tickerPair.selector";

function* bookListenerSaga() {
  const pair = yield select(getSelectedPair);
  if (pair) {
    yield put(
      send({
        method: "SUBSCRIBE",
        params: [`${pair}@depth5@1000ms`],
        id: 2,
      })
    );
  }
}
function* bookResetSaga() {
  const pair = yield select(getSelectedPair);
  console.log("reset-pair", pair);
  if (pair) {
    yield put(
      send({
        method: "UNSUBSCRIBE",
        params: [`${pair}@depth5@1000ms`],
        id: 312,
      })
    );
  }
}

export default function* bookSaga() {
  yield takeLatest(INITIALIZE_BOOK_CHANNEL, bookListenerSaga);
  yield takeLatest([RESET_BOOK_CHANNEL, RESET_TICKER_PAIR], bookResetSaga);
}
