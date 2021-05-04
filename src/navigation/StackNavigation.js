import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import HomeScreen from "../screens/home/HomeScreen";

const Stack = createSharedElementStackNavigator();

export default StackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="home" component={HomeScreen} />
  </Stack.Navigator>
);
