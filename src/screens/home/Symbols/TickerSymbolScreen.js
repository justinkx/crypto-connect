import React, { memo, useCallback, useState, useMemo } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { getSymbolsForPair } from "../../../redux/selectors/tickers.selector";
import withFocus from "../../../hoc/withFocus";
import GlobalStyles from "../../../style/GlobalStyle";
import TickersItem from "../../../components/Tickers/TickersItem";
import SearchBar from "../../../components/SearchBar/SearchBar";
import TickerSymbolPlaceholder from "../../../components/Ui/TickerSymbolPlaceholder";

const TickerSymbolScreen = ({ route, isFocused, navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const { symbol } = route.params;

  const symbols = useSelector(
    (state) => getSymbolsForPair(state)(symbol),
    shallowEqual
  );

  const renderItem = useCallback(
    ({ item }) => <TickersItem navigation={navigation} symbol={item} />,
    [navigation]
  );

  const onValueChange = useCallback((value) => {
    setSearchValue(value ? value.replace(/\s/g, "") : value);
  }, []);

  const symbolData = useMemo(
    () =>
      searchValue
        ? symbols.filter((symbol) =>
            symbol.includes(searchValue.replace("-", "").toUpperCase())
          )
        : symbols,
    [symbols, searchValue]
  );
  return (
    <View style={GlobalStyles.flex}>
      <SearchBar
        onValueChange={onValueChange}
        value={searchValue}
        containerStyle={styles.searchContainerStyle}
      />
      {isFocused && (
        <FlatList
          style={GlobalStyles.flex}
          data={symbolData}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.scrollStyle}
          ListEmptyComponent={TickerSymbolPlaceholder}
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
  searchContainerStyle: {
    marginBottom: 5,
  },
});
