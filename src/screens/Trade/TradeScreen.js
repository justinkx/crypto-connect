import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import GlobalStyle from "../../style/GlobalStyle";

const TradeScreen = ({ navigation, route }) => {
  return (
    <View style={GlobalStyle.flex}>
      <Text>Trade Screen</Text>
    </View>
  );
};

export default memo(TradeScreen);

const styles = StyleSheet.create({});
