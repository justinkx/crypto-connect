import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../style/GlobalStyle";

const HeaderCol = ({
  title,
  value,
  containerStyle = {},
  titleStyle = {},
  valueStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
};

export default memo(HeaderCol);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "33%",
  },
  title: {
    fontSize: 12,
    marginBottom: 3,
    color: "#6b6e73",
    fontWeight: "bold",
  },
  value: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
  },
});
