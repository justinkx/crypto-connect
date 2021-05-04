import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TickerSymbolScreen = ({ route, params }) => {
  const { symbol } = route.params;
  return (
    <View>
      <Text>{`Symbol Screen ${symbol}`}</Text>
    </View>
  );
};

export default TickerSymbolScreen;

const styles = StyleSheet.create({});
