import React, { useCallback } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/home/HomeScreen";
import TickerPairScreen from "../screens/home/Symbols/TickerPairScreen";

const Stack = createSharedElementStackNavigator();

export default StackScreens = () => {
  const pairOptions = useCallback(({ route }) => {
    const { ticker } = route.params;
    return {
      title: ticker.pair,
      headerBackTitle: " ",
    };
  }, []);
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        options={pairOptions}
        name="ticker-pair"
        component={TickerPairScreen}
      />
    </Stack.Navigator>
  );
};
