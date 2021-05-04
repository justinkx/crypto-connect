import React, { useEffect, useMemo, memo } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { initializeTicker } from "../../redux/action/ticker.action";

import { symbols } from "../../helpers/symbol.helper";
import TickerSymbolScreen from "./Symbols/TickerSymbolScreen";
import TickerPairScreen from "./Symbols/TickerPairScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createSharedElementStackNavigator();

const TickerStack = memo(({ route }) => {
  const { symbol } = route.params;
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        initialParams={{ symbol }}
        name="ticker-screen"
        component={TickerSymbolScreen}
      />
      <Stack.Screen name="ticker-pair" component={TickerPairScreen} />
    </Stack.Navigator>
  );
});

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTicker());
  }, []);

  const screens = useMemo(
    () =>
      symbols.map((symbol) => (
        <Tab.Screen
          key={symbol}
          name={`${symbol}`}
          component={TickerStack}
          initialParams={{ symbol }}
          options={{ tabBarLabel: symbol }}
        />
      )),
    []
  );

  return (
    <Tab.Navigator
      lazy
      initialRouteName={symbols[0]}
      backBehavior="order"
      swipeEnabled
      tabBarOptions={{
        scrollEnabled: true,
        allowFontScaling: false,
        tabStyle: {
          width: 80,
          height: 35,
        },
        style: {
          marginHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          padding: 0,
        },
        labelStyle: {
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textAlignVertical: "center",
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
        },
        indicatorStyle: {
          backgroundColor: "#36A7E7",
          width: 80,
          height: 30,
          borderRadius: 10,
        },
      }}
    >
      {screens}
    </Tab.Navigator>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({});
