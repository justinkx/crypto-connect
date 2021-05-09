import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import StackScreens from "./StackNavigation";
import { navigationRef } from "./navigationRef";
import ToastProvider from "../hoc/toastProvider";

export default AppNavigation = () => (
  <NavigationContainer ref={navigationRef}>
    <StatusBar style="auto" />
    <StackScreens />
    <ToastProvider />
  </NavigationContainer>
);
