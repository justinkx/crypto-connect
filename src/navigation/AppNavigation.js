import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackScreens from "./StackNavigation";
import { navigationRef } from "./navigationRef";
import ToastProvider from "../hoc/toastProvider";

export default AppNavigation = () => (
  <NavigationContainer ref={navigationRef}>
    <StackScreens />
    <ToastProvider />
  </NavigationContainer>
);
