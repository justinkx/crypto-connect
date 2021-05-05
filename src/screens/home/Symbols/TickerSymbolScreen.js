import React, { memo, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { getSymbolsForPair } from "../../../redux/selectors/tickers.selector";
import withFocus from "../../../hoc/withFocus";
import GlobalStyles from "../../../style/GlobalStyle";
import TickersItem from "../../../components/TickersItem";

const TickerSymbolScreen = ({ route, params, isFocused }) => {
  const { symbol } = route.params;
  const symbols = useSelector(
    (state) => getSymbolsForPair(state)(symbol),
    shallowEqual
  );
  const renderItem = useCallback(
    ({ item }) => <TickersItem symbol={item} />,
    []
  );

  return (
    <View style={GlobalStyles.flex}>
      {isFocused && (
        <FlatList
          style={GlobalStyles.flex}
          contentContainerStyle={GlobalStyles.scrollView}
          data={symbols}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default memo(withFocus(TickerSymbolScreen));

const styles = StyleSheet.create({});
