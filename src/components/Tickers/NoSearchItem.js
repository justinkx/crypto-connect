import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import GlobalStyle from "../../style/GlobalStyle";

const NoSearchItem = ({}) => {
  return (
    <View style={[GlobalStyle.flex, styles.container]}>
      <Image source={require("../../../assets/no-tokens.png")} />
      <Text>No Token found</Text>
    </View>
  );
};

export default NoSearchItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
