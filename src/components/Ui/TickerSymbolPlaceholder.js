import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import GlobalStyle from "../../style/GlobalStyle";
import TickerItemLoader from "../Tickers/TickerItemLoader";

const TickerSymbolPlaceholder = ({}) => {
  const loaderItems = useMemo(() => new Array(15).fill(0), []);
  return (
    <View style={GlobalStyle.flex}>
      {loaderItems.map((_, index) => (
        <TickerItemLoader key={index} />
      ))}
    </View>
  );
};

export default memo(TickerSymbolPlaceholder);

const styles = StyleSheet.create({});
