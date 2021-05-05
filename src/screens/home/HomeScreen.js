import React, { useEffect, useMemo, memo } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { initializeTicker } from "../../redux/action/ticker.action";

import { symbols } from "../../helpers/symbol.helper";
import TickerSymbolScreen from "./Symbols/TickerSymbolScreen";
import GlobalStyle, { colors } from "../../style/GlobalStyle";

const Tab = createMaterialTopTabNavigator();
const Stack = createSharedElementStackNavigator();
const tabBarOptions = {
  scrollEnabled: true,
  allowFontScaling: false,
  tabStyle: {
    width: 80,
    height: 30,
  },
  style: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    padding: 0,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
  },
  labelStyle: {
    textAlign: "center",
    position: "relative",
    bottom: 8,
  },
  indicatorStyle: {
    backgroundColor: colors.tabIndicator,
    width: 80,
    height: 30,
    borderRadius: 10,
  },
  showIcon: false,
};

const TickerStack = memo(({ route }) => {
  const { symbol } = route.params;
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        initialParams={{ symbol }}
        name="ticker-screen"
        component={TickerSymbolScreen}
      />
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
    <View style={GlobalStyle.flex}>
      <Tab.Navigator
        lazy
        initialRouteName={symbols[0]}
        backBehavior="order"
        swipeEnabled
        tabBarOptions={tabBarOptions}
      >
        {screens}
      </Tab.Navigator>
    </View>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({});
