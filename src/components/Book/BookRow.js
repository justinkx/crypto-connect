import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

const BookRow = ({ price, selector, isBid }) => {
  const rowData = useSelector((state) => selector(state)(price), shallowEqual);

  return (
    <View style={styles.rowContainer}>
      <Text>{isBid ? rowData.quantity : rowData.price}</Text>
      <Text>{isBid ? rowData.price : rowData.quantity}</Text>
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
});
