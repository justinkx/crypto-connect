import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, composedEnhancers);
sagaMiddleware.run(rootSaga);
if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require("./rootReducer").default;
    store.replaceReducer(nextRootReducer);
  });
}
export default store;
