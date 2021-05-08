import React, { memo, useCallback } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import GlobalStyle from "../../style/GlobalStyle";
import { resetBookChannel } from "../../redux/action/book.action";
import Book from "../../components/Book/Book";
import { getAskPrice, getBidPrice } from "../../redux/selectors/book.selector";

const TradeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const askPrices = useSelector(getAskPrice, shallowEqual);
  const bidPrices = useSelector(getBidPrice, shallowEqual);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetBookChannel());
      };
    }, [dispatch])
  );
  return (
    <View style={GlobalStyle.flex}>
      <ScrollView style={GlobalStyle.scrollView}>
        <View style={styles.bookContainer}>
          <View style={styles.askBidBook}>
            <Book prices={bidPrices} isBid title="Bid" />
          </View>
          <View style={styles.askBidBook}>
            <Book prices={askPrices} isBid={false} title="Ask" />
          </View>
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
