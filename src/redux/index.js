import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxWebsocket from "@giantmachines/redux-websocket";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();

const composedEnhancers = composeWithDevTools(
  applyMiddleware(sagaMiddleware, reduxWebsocketMiddleware)
);
const store = createStore(rootReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require("./rootReducer").default;
    store.replaceReducer(nextRootReducer);
  });
}
export default store;
