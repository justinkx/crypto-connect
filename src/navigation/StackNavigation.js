import React, { useCallback } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/home/HomeScreen";
import TickerPairScreen from "../screens/home/Symbols/TickerPairScreen";

const Stack = createSharedElementStackNavigator();
const sharedOptions = {
  headerShown: true,
  gestureEnabled: false,
  tabBarVisible: false,
  animationEnabled: true,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        delay: 400,
      },
    },
    close: {
      animation: "timing",
      config: {
        delay: 400,
      },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default StackScreens = () => {
  return (
    <Stack.Navigator headerMode={"screen"}>
      <Stack.Screen
        options={{
          headerShown: true,
          safeAreaInsets: {
            top: 0,
            bottom: 0,
          },
        }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={sharedOptions}
        name="ticker-pair"
        component={TickerPairScreen}
        sharedElementsConfig={(route) => {
          const {
            ticker: { symbol, pair },
          } = route.params;
          return [
            {
              id: `ticker-${symbol}`,
              animation: "fade",
              resize: "none",
            },
            {
              id: `image-${pair}`,
              animation: "fade",
              resize: "none",
            },
            {
              id: `price-${symbol}`,
              animation: "fade",
              resize: "none",
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};
