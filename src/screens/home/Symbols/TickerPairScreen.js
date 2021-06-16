import React, {
  useEffect,
  memo,
  useCallback,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import GlobalStyle, { colors } from "../../../style/GlobalStyle";
import {
  setTickerPair,
  resetTickerPair,
} from "../../../redux/action/tickerPair.action";
import Header from "../../../components/TickerPair/Header";
import { isAndroid } from "../../../helpers/platform.helpers";
import Chart from "../../../components/Chart/Chart";

const OrderBookScreen = lazy(() => import("../../OrderBook/OrderBookScreen"));
const TradeScreen = lazy(() => import("../../Trade/TradeScreen"));

const Tab = createMaterialTopTabNavigator();
const tabBarOptions = {
  scrollEnabled: true,

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
  indicatorStyle: {
    backgroundColor: "transparent",
  },
  labelStyle: {
    textAlign: "center",
    position: "relative",
    bottom: 10,
    fontWeight: "bold",
  },
  showIcon: false,
  activeTintColor: colors.tradeTabIndicator,
  inactiveTintColor: colors.black,
};

const TickerPairScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { ticker } = route.params;
  const { symbol } = ticker;

  useEffect(() => {
    dispatch(setTickerPair(symbol));
    return () => {
      dispatch(resetTickerPair());
    };
  }, [symbol, dispatch]);
  const goBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const orderBookScreen = useCallback(
    (props) => (
      <Suspense fallback={<View></View>}>
        <OrderBookScreen {...props} />
      </Suspense>
    ),
    []
  );
  const tradeScreen = useCallback(
    (props) => (
      <Suspense fallback={<View></View>}>
        <TradeScreen {...props} />
      </Suspense>
    ),
    []
  );

  return (
    <SafeAreaView style={GlobalStyle.flex}>
      <Header goBack={goBack} ticker={ticker} />

      <View style={styles.tabContainer}>
        <Chart pair={symbol} />
        <Tab.Navigator
          lazy={true}
          initialRouteName={"book"}
          backBehavior="order"
          swipeEnabled={true}
          tabBarOptions={tabBarOptions}
          removeClippedSubviews={isAndroid}
        >
          <Tab.Screen name="book" component={orderBookScreen} />
          <Tab.Screen name="trade" component={tradeScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default memo(TickerPairScreen);

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    paddingTop: 20,
  },
});
