import React from "react";
import { Provider } from "react-redux";

import store from "./redux/index";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
