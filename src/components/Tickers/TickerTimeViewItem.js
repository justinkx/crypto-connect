import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const TickerTimeViewItem = ({
  title,
  value,
  icon = null,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title]}>{title}</Text>
      <Text style={styles.volume}>{value}</Text>
    </View>
  );
};

export default memo(TickerTimeViewItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 15,
    width: "30%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  volume: {
    paddingTop: 4,
    fontSize: 12,
  },
});
