import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getSymbolsForPair } from "../../../redux/selectors/tickers.selector";

const TickerSymbolScreen = ({ route, params }) => {
  const { symbol } = route.params;
  const symbols = useSelector(
    (state) => getSymbolsForPair(state)(symbol),
    shallowEqual
  );
  return (
    <View>
      <Text>{`Symbol Screen ${symbol}`}</Text>
    </View>
  );
};

export default TickerSymbolScreen;

const styles = StyleSheet.create({});
