import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/home/HomeScreen";
import TickerPairScreen from "../screens/home/Symbols/TickerPairScreen";
import { sharedElementDelay } from "../utils/Constants";

const Stack = createSharedElementStackNavigator();

export default StackScreens = () => {
  return (
    <Stack.Navigator headerMode={"screen"}>
      <Stack.Screen
        options={{
          safeAreaInsets: {
            top: 0,
            bottom: 0,
          },
          title: "",
          headerStyle: homeHeaderStyle,
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
              resize: "auto",
            },
            {
              id: `image-${pair}`,
              animation: "fade",
              resize: "auto",
            },
            {
              id: `price-${symbol}`,
              animation: "move",
              resize: "auto",
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

const sharedOptions = {
  headerShown: false,
  gestureEnabled: false,
  tabBarVisible: true,
  animationEnabled: true,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: sharedElementDelay,
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: sharedElementDelay,
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
const homeHeaderStyle = {
  shadowOpacity: 0,
  shadowOffset: {
    height: 0,
  },
  shadowRadius: 0,
  elevation: 0,
};
