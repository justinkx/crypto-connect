import { put, select, takeEvery, all } from "redux-saga/effects";
import _assign from "lodash/assign";
import _identity from "lodash/identity";
import _pickBy from "lodash/pickBy";
import _keys from "lodash/keys";
import _findLast from "lodash/findLast";

import {
  MESSAGE,
  OPEN,
  ERROR,
  BROKEN,
  BEGIN_RECONNECT,
  CLOSED,
} from "../action/types";
import { initializeTicker, saveTickers } from "../action/ticker.action";
import { saveBook } from "../action/book.action";
import { tickerTransform } from "../adaptor/tickers.adaptor";
import { getSelectedPair } from "../selectors/tickerPair.selector";
import { tickerPairAdaptor } from "../adaptor/tickerPair.adaptor";
import { savePairData } from "../action/tickerPair.action";
import { showSuccessToast, showErrorToast } from "../action/toast.action";
import { transformBook } from "../adaptor/book.adaptor";
import { getReducer } from "../selectors/book.selector";
import { transformedTrade } from "../adaptor/trades.adaptor";
import { getTradesReducer } from "../selectors/trades.selector";
import { saveTrades } from "../action/trades.action";

function* reduxWebsocketMessage(action) {
  const { payload } = action;
  const parsedMessage = JSON.parse(payload?.message);
  const pair = yield select(getSelectedPair);

  try {
    switch (parsedMessage?.stream) {
      case "!miniTicker@arr":
        const tickers = tickerTransform(parsedMessage.data);
        return yield put(saveTickers(tickers));
      case `${pair}@ticker`:
        const data = tickerPairAdaptor(parsedMessage.data);
        return yield put(savePairData(data));
      case `${pair}@depth@1000ms`:
        const { ask, bid } = yield select(getReducer);
        const book = transformBook(parsedMessage.data);
        const _ask = _pickBy(_assign({}, ask, book.ask), _identity);
        const _bid = _pickBy(_assign({}, bid, book.bid), _identity);
        return yield put(
          saveBook({
            bid: _bid,
            ask: _ask,
            symbol: pair,
            firstUpdateId: book.firstUpdateId,
            finalUpdateId: book.finalUpdateId,
          })
        );
      case `${pair}@trade`:
        const newTrades = transformedTrade(parsedMessage.data);
        const currTrades = yield select(getTradesReducer);
        const tradeKeys = _keys(currTrades);
        if (tradeKeys.length === 20) {
          const replaceKey = _findLast(tradeKeys);
          delete currTrades[replaceKey];
          const nextTrades = _assign({}, newTrades, currTrades);
          return yield put(saveTrades(nextTrades));
        } else {
          const nextTrades = _assign({}, newTrades, currTrades);
          return yield put(saveTrades(nextTrades));
        }
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
