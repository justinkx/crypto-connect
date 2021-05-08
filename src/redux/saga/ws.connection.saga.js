import { put, take } from "redux-saga/effects";
import { connect } from "@giantmachines/redux-websocket";

import { CONNECT_SOCKET } from "../action/types";
import { showInfoToast } from "../action/toast.action";

export default function* websocketConnectionSaga() {
  while (true) {
    yield take(CONNECT_SOCKET);
    yield put(connect("wss://stream.binance.com:9443/ws"));
    yield put(
      showInfoToast({
        text1: "Initializing Socket Connection",
        text2: `Initializing connection to binance socket. Please wait...`,
      })
    );
  }
}
