import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const TableRow = ({ width, rowStyle = {}, children, onClick }) => {
  return (
    <View style={{ width }}>
      <TouchableOpacity onPress={onClick}>
        <View style={[styles.container, rowStyle]}>{children}</View>
      </TouchableOpacity>
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
