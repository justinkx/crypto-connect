import React, { memo, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import GlobalStyle from "../../style/GlobalStyle";
import {
  resetBookChannel,
  initializeBook,
} from "../../redux/action/book.action";
import Book from "../../components/Book/Book";
import {
  getAskPrice,
  getBidPrice,
  getSymbol,
} from "../../redux/selectors/book.selector";

const OrderBookScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const askPrices = useSelector(getAskPrice, shallowEqual);
  const bidPrices = useSelector(getBidPrice, shallowEqual);
  const symbol = useSelector(getSymbol, shallowEqual);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !symbol) {
      dispatch(initializeBook());
    }
    return () => {
      if (!isFocused) {
        dispatch(resetBookChannel());
      }
    };
  }, [dispatch, symbol, isFocused]);

  return (
    <View style={GlobalStyle.flex}>
      <ScrollView contentContainerStyle={GlobalStyle.scrollView}>
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

export default memo(OrderBookScreen);

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
