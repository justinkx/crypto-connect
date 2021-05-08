import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../style/GlobalStyle";
import { getAskData, getBidData } from "../../redux/selectors/book.selector";
import BookRow from "./BookRow";

const Book = ({ isBid, title = "Bid", prices }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        {prices.map((price) => (
          <BookRow
            price={price}
            key={price}
            selector={isBid ? getBidData : getAskData}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(Book);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "gray",
  },
});
