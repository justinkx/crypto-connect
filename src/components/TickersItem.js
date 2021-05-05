import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

const TickersItem = ({ symbol }) => {
  return (
    <View>
      <Text>{symbol}</Text>
    </View>
  );
};

export default TickersItem;

const styles = StyleSheet.create({});
