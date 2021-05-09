import React from "react";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import store from "./redux/index";
import AppNavigation from "./navigation/AppNavigation";
import GlobalStyle from "./style/GlobalStyle";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <SafeAreaProvider
        style={GlobalStyle.flex}
        initialMetrics={initialWindowMetrics}
      >
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
