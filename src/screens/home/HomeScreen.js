import React, {
  useEffect,
  useMemo,
  memo,
  lazy,
  Suspense,
  useCallback,
} from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { symbols } from "../../helpers/symbol.helper";
import GlobalStyle, { colors } from "../../style/GlobalStyle";
import TickerSymbolPlaceholder from "../../components/Ui/TickerSymbolPlaceholder";
import { isAndroid } from "../../helpers/platform.helpers";
import { connectWebsocket } from "../../redux/action/action";

const TickerSymbolScreen = lazy(() => import("./Symbols/TickerSymbolScreen"));

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarOptions = {
  scrollEnabled: true,
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
    bottom: 10,
    fontWeight: "bold",
  },
  indicatorStyle: {
    backgroundColor: colors.tabIndicator,
    width: 80,
    height: 30,
    borderRadius: 10,
  },
  showIcon: false,
  activeTintColor: colors.white,
  inactiveTintColor: colors.black,
};

const TickerStack = memo(({ route }) => {
  const { symbol } = route.params;
  const TickerSymbol = useCallback(
    (props) => (
      <Suspense fallback={<TickerSymbolPlaceholder />}>
        <TickerSymbolScreen {...props} />
      </Suspense>
    ),
    []
  );
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        initialParams={{ symbol }}
        name="ticker-screen"
        component={TickerSymbol}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebsocket());
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
    <SafeAreaProvider
      style={GlobalStyle.flex}
      initialMetrics={initialWindowMetrics}
    >
      <Tab.Navigator
        lazy={true}
        initialRouteName={symbols[0]}
        backBehavior="order"
        swipeEnabled
        tabBarOptions={tabBarOptions}
        removeClippedSubviews={isAndroid}
      >
        {screens}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({});
