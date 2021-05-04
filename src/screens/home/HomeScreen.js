import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { initializeTicker } from "../../redux/action/ticker.action";
import {
  getTickerSymbols,
  getSymbolsForPair,
} from "../../redux/selectors/tickers.selector";

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
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
