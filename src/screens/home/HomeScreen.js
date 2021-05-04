import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { initializeTicker } from "../../redux/action/ticker.action";
import { getTickerSymbols } from "../../redux/selectors/tickers.selector";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const symbols = useSelector(getTickerSymbols);

  const onMessage = useCallback((trade) => {
    console.log("trade", trade);
  }, []);

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
