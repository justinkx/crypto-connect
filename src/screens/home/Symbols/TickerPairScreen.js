import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GlobalStyle from "../../../style/GlobalStyle";

const TickerPairScreen = ({ route, navigation }) => {
  const { ticker } = route.params;

  return (
    <SafeAreaView style={GlobalStyle.flex}>
      <Text>Details</Text>
    </SafeAreaView>
  );
};

export default TickerPairScreen;

const styles = StyleSheet.create({});
