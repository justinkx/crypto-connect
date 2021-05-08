import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

const BookRow = ({ price, selector }) => {
  return (
    <View>
      <Text>{price}</Text>
    </View>
  );
};

export default memo(BookRow);

const styles = StyleSheet.create({});
