import { put, select, takeEvery, all } from "redux-saga/effects";

import {
  MESSAGE,
  OPEN,
  ERROR,
  BROKEN,
  BEGIN_RECONNECT,
  CLOSED,
} from "../action/types";
import { initializeTicker, saveTickers } from "../action/ticker.action";
import { tickerTransform } from "../adaptor/tickers.adaptor";
import { getSelectedPair } from "../selectors/tickerPair.selector";
import { tickerPairAdaptor } from "../adaptor/tickerPair.adaptor";
import { savePairData } from "../action/tickerPair.action";
import { showSuccessToast, showErrorToast } from "../action/toast.action";

function* reduxWebsocketMessage(action) {
  const { payload } = action;
  const parsedMessage = JSON.parse(payload?.message);
  const pair = yield select(getSelectedPair);

  try {
    switch (parsedMessage?.stream) {
      case "!miniTicker@arr":
        const tickers = tickerTransform(parsedMessage.data);
        yield put(saveTickers(tickers));
        break;
      case `${pair}@ticker`:
        const data = tickerPairAdaptor(parsedMessage.data);
        yield put(savePairData(data));
        break;
    }
  } catch (error) {
    console.log("error", error);
  }
}

function* socketErrorSaga(action) {
  const { type } = action;
  switch (type) {
    case CLOSED:
    case ERROR:
      yield put(
        showErrorToast({
          text1: "Connection Closed",
          text2: "An unexpected error occured. Socket connection closed",
        })
      );
      return;
    case BROKEN:
      yield put(
        showErrorToast({
          text1: "Connection Broken",
          text2: "An unexpected error occured. Socket connection is broken",
        })
      );
      return;
    case BEGIN_RECONNECT:
      yield put(
        showSuccessToast({
          text1: "Begin Reconnect",
          text2: "We are trying our best to reconnect back to binance socket",
        })
      );
      return;
  }
}

function* reduxWebsocketOpen() {
  yield put(
    showSuccessToast({
      text1: "Conected",
      text2:
        "Successfully connected to binance socket.Trying to open a channel connection",
    })
  );
  yield put(initializeTicker());
}
export default function* wsMessageSaga() {
  yield all([
    takeEvery(MESSAGE, reduxWebsocketMessage),
    takeEvery(OPEN, reduxWebsocketOpen),
    takeEvery([ERROR, BROKEN, BEGIN_RECONNECT, CLOSED], socketErrorSaga),
  ]);
}
