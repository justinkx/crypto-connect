import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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
      <ScrollView style={GlobalStyle.scrollView}>
        <Text>Trade Screen</Text>
        <View style={styles.bookContainer}>
          <View style={styles.askBidBook}></View>
          <View style={styles.askBidBook}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(TradeScreen);

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  askBidBook: {
    flexDirection: "column",
    width: "50%",
  },
});
