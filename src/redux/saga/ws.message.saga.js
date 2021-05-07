import { put, take, takeEvery, all } from "redux-saga/effects";

import { MESSAGE, OPEN, SAVE_TICKER } from "../action/types";
import { initializeTicker } from "../action/ticker.action";
import { tickerTransform } from "../adaptor/tickers.adaptor";

function* reduxWebsocketMessage(action) {
  const { payload } = action;
  const parsedMessage = JSON.parse(payload?.message);
  try {
    switch (parsedMessage?.stream) {
      case "!miniTicker@arr":
        const tickers = tickerTransform(parsedMessage.data);
        yield put({ type: SAVE_TICKER, tickers: tickers });
        break;
    }
  } catch (error) {
    console.log("error", error);
  }
}

function* reduxWebsocketOpen() {
  yield put(initializeTicker());
}
export default function* wsMessageSaga() {
  yield all([
    takeEvery(MESSAGE, reduxWebsocketMessage),
    takeEvery(OPEN, reduxWebsocketOpen),
  ]);
}
