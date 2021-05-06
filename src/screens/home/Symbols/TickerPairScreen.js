import React, { useEffect, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import GlobalStyle from "../../../style/GlobalStyle";
import {
  setTickerPair,
  resetTickerPair,
} from "../../../redux/action/tickerPair.action";

const TickerPairScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    ticker: { symbol, pair },
  } = route.params;

  useEffect(() => {
    dispatch(setTickerPair(symbol));
    return () => {
      dispatch(resetTickerPair());
    };
  }, [symbol, dispatch]);
  return (
    <SafeAreaView style={GlobalStyle.flex}>
      <Text>Details</Text>
    </SafeAreaView>
  );
};

export default memo(TickerPairScreen);

const styles = StyleSheet.create({});
