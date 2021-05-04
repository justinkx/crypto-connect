import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import StackScreens from "./StackNavigation";

export default AppNavigation = () => (
  <NavigationContainer>
    <StatusBar style="auto" />
    <StackScreens />
  </NavigationContainer>
);
