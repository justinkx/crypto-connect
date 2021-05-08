import { put, take } from "redux-saga/effects";
import { connect } from "@giantmachines/redux-websocket";

import { CONNECT_SOCKET } from "../action/types";

export default function* websocketConnectionSaga() {
  while (true) {
    yield take(CONNECT_SOCKET);
    yield put(connect("wss://stream.binance.com:9443/ws"));
  }
}
