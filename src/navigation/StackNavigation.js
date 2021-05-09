import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import TickerPairScreen from "../screens/home/Symbols/TickerPairScreen";

const Stack = createNativeStackNavigator();

export default StackScreens = () => {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen
        options={{
          safeAreaInsets: {
            top: 0,
            bottom: 0,
          },
          title: "",
          headerStyle: homeHeaderStyle,
          headerHideShadow: true,
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, headerHideShadow: true }}
        name="ticker-pair"
        component={TickerPairScreen}
      />
    </Stack.Navigator>
  );
};

const homeHeaderStyle = {
  shadowOpacity: 0,
  shadowOffset: {
    height: 0,
  },
  shadowRadius: 0,
  elevation: 0,
};
