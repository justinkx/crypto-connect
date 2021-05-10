import { put, takeLatest, select } from "redux-saga/effects";
import { send } from "@giantmachines/redux-websocket";

import {
  INITIALIZE_TRADES_CHANNEL,
  RESET_TRADES_CHANNEL,
} from "../action/types";
import { getSelectedPair } from "../selectors/tickerPair.selector";

function* tradesListenerSaga() {
  const pair = yield select(getSelectedPair);
  if (pair) {
    yield put(
      send({
        method: "SUBSCRIBE",
        params: [`${pair}@trade`],
        id: 10,
      })
    );
  }
}

function* tradesResetSaga() {
  const pair = yield select(getSelectedPair);
  if (pair) {
    yield put(
      send({
        method: "UNSUBSCRIBE",
        params: [`${pair}@trade`],
        id: 102,
      })
    );
  }
}

export default function* tradesSaga() {
  yield takeLatest(INITIALIZE_TRADES_CHANNEL, tradesListenerSaga);
  yield takeLatest([RESET_TRADES_CHANNEL], tradesResetSaga);
}
