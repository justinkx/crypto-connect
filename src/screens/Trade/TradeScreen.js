import React, { memo, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { resetTradesChannel } from "../../redux/action/trades.action";
import { getTrades } from "../../redux/selectors/trades.selector";
import GlobalStyle, { colors } from "../../style/GlobalStyle";
import Trades from "../../components/Trades/Trades";
import withFocus from "../../hoc/withFocus";
import { useAfterInteractions } from "../../helpers/useInteractions";

const TradeScreen = ({ isFocused }) => {
  const dispatch = useDispatch();
  const { shouldRender } = useAfterInteractions();
  const trades = useSelector(getTrades, shallowEqual);

  useEffect(() => {
    return () => {
      dispatch(resetTradesChannel());
    };
  }, []);

  const renderItem = useCallback(({ item }) => <Trades trade={item} />, []);

  return (
    <View style={GlobalStyle.flex}>
      {isFocused && shouldRender && (
        <>
          <View style={styles.row}>
            <View style={styles.contentView}>
              <Text style={styles.title}>Price</Text>
            </View>
            <View style={[styles.contentView, styles.alignEnd]}>
              <Text style={styles.title}>Amount</Text>
            </View>
            <View style={[styles.contentView, styles.alignEnd]}>
              <Text style={styles.title}>Time</Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={styles.contentStyle}
            style={GlobalStyle.flex}
            data={trades}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

export default memo(withFocus(TradeScreen));

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3b3b3b",
  },
  contentStyle: {
    paddingHorizontal: 10,
  },
  contentView: { width: "30%" },
  alignEnd: {
    alignItems: "flex-end",
  },
});
