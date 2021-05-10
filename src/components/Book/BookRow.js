import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import SkeletonContent from "react-native-skeleton-content";

import { colors } from "../../style/GlobalStyle";
import BookPlaceholder from "./BookPlaceholder";

const QTY_DECIMAL_PLACES = 3;

const BookRow = ({ price, selector, isBid }) => {
  const rowData = useSelector((state) => selector(state)(price), shallowEqual);

  // if (!price) return <BookPlaceholder isBid={isBid} />;

  return (
    <SkeletonContent isLoading={!price} containerStyle={styles.rowContainer}>
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
    </SkeletonContent>
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
    color: colors.bookQuantity,
  },
});
