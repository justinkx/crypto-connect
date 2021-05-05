import React, { memo, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { getSymbolsForPair } from "../../../redux/selectors/tickers.selector";
import withFocus from "../../../hoc/withFocus";
import GlobalStyles from "../../../style/GlobalStyle";
import TickersItem from "../../../components/Tickers/TickersItem";

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
          data={symbols}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.scrollStyle}
        />
      )}
    </View>
  );
};

export default memo(withFocus(TickerSymbolScreen));

const styles = StyleSheet.create({
  scrollStyle: {
    paddingVertical: 5,
  },
});
