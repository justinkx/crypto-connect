import { eventChannel } from "redux-saga";
import { put, take, takeLatest, spawn, race, select } from "redux-saga/effects";

import {
  SET_TICKER_PAIR,
  SAVE_PAIR_DATA,
  RESET_TICKER_PAIR,
  START_TICKER_PAIR_SOCKET,
} from "../action/types";
import {
  savePairData,
  startTickerPairSocket,
} from "../action/tickerPair.action";
import { tickerPairAdaptor } from "../adaptor/tickerPair.adaptor";
import { getSelectedPair } from "../selectors/tickerPair.selector";

function* initializeWebSocketsChannel() {
  const pair = yield select(getSelectedPair);

  const channel = eventChannel((emitter) => {
    const mySocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@ticker`
    );
    const onTickerMessage = (message) => {
      emitter({
        type: SAVE_PAIR_DATA,
        payload: JSON.parse(message.data),
      });
    };
    const onTickersError = (error) => {
      console.log("error", error);
    };
    mySocket.addEventListener("message", onTickerMessage);
    mySocket.addEventListener("error", onTickersError);
    return () => {
      mySocket.removeEventListener("message", onTickerMessage);
    };
  });
  while (true) {
    try {
      const { messageAction, resetAction } = yield race({
        messageAction: take(channel),
        resetAction: take(RESET_TICKER_PAIR),
      });
      if (resetAction) {
        channel.close();
        return;
      }
      const { payload } = messageAction;
      const data = tickerPairAdaptor(payload);
      yield put(savePairData(data));
    } catch (error) {
      console.log("error", error);
    }
  }
}

function* tickerPairSocketSaga() {
  yield takeLatest(START_TICKER_PAIR_SOCKET, initializeWebSocketsChannel);
}

function* tickerPairListenerSaga() {
  yield put(startTickerPairSocket());
}
export default function* tickerPairSaga() {
  yield spawn(tickerPairSocketSaga);
  yield takeLatest(SET_TICKER_PAIR, tickerPairListenerSaga);
}
