import React, { memo, useMemo, Fragment } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { getAskData, getBidData } from "../../redux/selectors/book.selector";
import BookRow from "./BookRow";
import { useAfterInteractions } from "../../helpers/useInteractions";

const Book = ({ isBid, title = "Bid", prices = [] }) => {
  const { width } = useWindowDimensions();
  const { shouldRender } = useAfterInteractions();
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
          <Fragment key={index}>
            {shouldRender && (
              <BookRow
                width={width / 2 - 15}
                price={price}
                selector={isBid ? getBidData : getAskData}
                isBid={isBid}
              />
            )}
          </Fragment>
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
    color: "#3b3b3b",
  },
  right: {
    paddingRight: 3,
  },
  left: {
    paddingLeft: 3,
  },
});
