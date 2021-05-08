import { put, take } from "redux-saga/effects";
import { connect } from "@giantmachines/redux-websocket";

import { CONNECT_SOCKET } from "../action/types";
import { showSuccessToast } from "../action/toast.action";

export default function* websocketConnectionSaga() {
  while (true) {
    yield take(CONNECT_SOCKET);
    yield put(connect("wss://stream.binance.com:9443/ws"));
    yield put(
      showSuccessToast({
        text1: "Connect Socket",
        text2: `Initiating connection to binance socket. Please wait...`,
      })
    );
  }
}
