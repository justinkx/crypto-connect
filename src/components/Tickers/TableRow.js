import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const TableRow = ({ width, rowStyle = {}, children }) => {
  return (
    <View style={{ width }}>
      <View style={[styles.container, rowStyle]}>{children}</View>
    </View>
  );
};

export default memo(TableRow);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: 12,
  },
});
