import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import GlobalStyle from "../../style/GlobalStyle";
import {
  initializeBook,
  resetBookChannel,
} from "../../redux/action/book.action";

const TradeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initializeBook());

      return () => dispatch(resetBookChannel());
    }, [dispatch])
  );
  return (
    <View style={GlobalStyle.flex}>
      <Text>Trade Screen</Text>
    </View>
  );
};

export default memo(TradeScreen);

const styles = StyleSheet.create({});
