import React, { useEffect, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import GlobalStyle from "../../../style/GlobalStyle";
import {
  setTickerPair,
  resetTickerPair,
} from "../../../redux/action/tickerPair.action";
import Header from "../../../components/TickerPair/Header";

const TickerPairScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { ticker } = route.params;
  const {
    symbol,
    pair,
    closePrice,
    openPrice,
    highPrice,
    lowPrice,
    tokenImage,
  } = ticker;

  useEffect(() => {
    dispatch(setTickerPair(symbol));
    return () => {
      dispatch(resetTickerPair());
    };
  }, [symbol, dispatch]);
  return (
    <SafeAreaView style={GlobalStyle.flex}>
      <Header ticker={ticker} />
    </SafeAreaView>
  );
};

export default memo(TickerPairScreen);

const styles = StyleSheet.create({});
