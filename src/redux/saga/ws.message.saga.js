import { put, select, takeEvery, all } from "redux-saga/effects";

import { MESSAGE, OPEN, SAVE_TICKER } from "../action/types";
import { initializeTicker, saveTickers } from "../action/ticker.action";
import { tickerTransform } from "../adaptor/tickers.adaptor";
import { getSelectedPair } from "../selectors/tickerPair.selector";
import { tickerPairAdaptor } from "../adaptor/tickerPair.adaptor";
import { savePairData } from "../action/tickerPair.action";

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

function* reduxWebsocketOpen() {
  yield put(initializeTicker());
}
export default function* wsMessageSaga() {
  yield all([
    takeEvery(MESSAGE, reduxWebsocketMessage),
    takeEvery(OPEN, reduxWebsocketOpen),
  ]);
}
