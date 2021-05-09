import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getAskData, getBidData } from "../../redux/selectors/book.selector";
import BookRow from "./BookRow";

const Book = ({ isBid, title = "Bid", prices = [] }) => {
  const calPrices = useMemo(() => {
    const arr = new Array(20).fill(null);
    arr.splice(0, prices.length, ...prices);
    return arr;
  }, [prices]);

  return (
    <View style={[styles.container, styles[isBid ? "right" : "left"]]}>
      <Text style={styles.title}>{title}</Text>
      <View>
        {calPrices.map((price, index) => (
          <BookRow
            price={price}
            key={index}
            selector={isBid ? getBidData : getAskData}
            isBid={isBid}
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
  right: {
    paddingRight: 3,
  },
  left: {
    paddingLeft: 3,
  },
});
