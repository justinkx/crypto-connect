import { eventChannel } from "redux-saga";
import { put, take, takeEvery } from "redux-saga/effects";

import { INITIALIZE_TICKER_CHANNEL, SAVE_TICKER } from "../action/types";
import { tickerTransform } from "../adaptor/tickers.adaptor";

function* initializeWebSocketsChannel() {
  const channel = eventChannel((emitter) => {
    const mySocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/!miniTicker@arr"
    );
    const onTickerMessage = (message) => {
      emitter({
        type: SAVE_TICKER,
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
      const { type, payload } = yield take(channel);
      const tickers = tickerTransform(payload);
      yield put({ type: SAVE_TICKER, tickers });
    } catch (error) {
      console.log("error", error);
    }
  }
}
export default function* tickerSaga() {
  yield takeEvery(INITIALIZE_TICKER_CHANNEL, initializeWebSocketsChannel);
}
