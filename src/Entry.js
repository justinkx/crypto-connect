import React from "react";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import store from "./redux/index";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
