import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { initializeTicker } from "../../redux/action/ticker.action";
import {
  getTickerSymbols,
  getSymbolsForPair,
} from "../../redux/selectors/tickers.selector";
import { symbols } from "../../helpers/symbol.helper";
import TickerSymbolScreen from "./Symbols/TickerSymbolScreen";
import TickerPairScreen from "./Symbols/TickerPairScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createSharedElementStackNavigator();

const TickerStack = ({ route }) => {
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
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const usdtSymbol = useSelector(
    (state) => getSymbolsForPair(state)("RUB"),
    shallowEqual
  );
  console.log("usdtSymbol", usdtSymbol);

  useEffect(() => {
    dispatch(initializeTicker());
  }, []);

  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      {symbols.map((symbol) => (
        <Tab.Screen
          key={symbol}
          name={`${symbol}`}
          component={TickerStack}
          initialParams={{ symbol }}
          options={{ tabBarLabel: symbol }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
