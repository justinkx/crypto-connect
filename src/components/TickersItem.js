import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { getSymbolTicker } from "../redux/selectors/tickers.selector";

const TickersItem = ({ symbol }) => {
  const ticker = useSelector(
    (state) => getSymbolTicker(state)(symbol),
    shallowEqual
  );
  return (
    <View>
      <Text>{symbol}</Text>
    </View>
  );
};

export default TickersItem;

const styles = StyleSheet.create({});
