import React from "react";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import store from "./redux/index";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent style="auto" />
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Consumer>
          {() => <AppNavigation />}
        </SafeAreaInsetsContext.Consumer>
      </SafeAreaProvider>
    </Provider>
  );
}
