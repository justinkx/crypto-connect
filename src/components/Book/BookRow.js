import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { colors } from "../../style/GlobalStyle";

const QTY_DECIMAL_PLACES = 3;

const BookRow = ({ price, selector, isBid }) => {
  const rowData = useSelector((state) => selector(state)(price), shallowEqual);

  return (
    <View style={styles.rowContainer}>
      <Text style={[styles.value, !isBid && styles.askColor]}>
        {isBid
          ? parseFloat(rowData.quantity).toFixed(QTY_DECIMAL_PLACES)
          : rowData.price}
      </Text>
      <Text style={[styles.value, isBid && styles.bidColor]}>
        {isBid
          ? rowData.price
          : parseFloat(rowData.quantity).toFixed(QTY_DECIMAL_PLACES)}
      </Text>
    </View>
  );
};

export default memo(BookRow);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
  },
  bidColor: {
    color: colors.tradeGreen,
  },
  askColor: {
    color: colors.tradeRed,
  },
  value: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
