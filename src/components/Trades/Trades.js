import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

import GlobalStyle, { colors } from "../../style/GlobalStyle";
import { fixedDecimals } from "../../helpers/number.helpers";

const Trades = ({ trade }) => {
  const { price, quantity, tradeTime, isMarketOrder } = trade;
  return (
    <View
      style={[
        styles.row,
        isMarketOrder ? styles.bidBackground : styles.askBackground,
      ]}
    >
      <View style={styles.contentView}>
        <Text style={[styles.value, isMarketOrder ? styles.bid : styles.ask]}>
          {price}
        </Text>
      </View>
      <View style={[styles.contentView, styles.alignEnd]}>
        <Text style={styles.value}>{fixedDecimals(quantity, 3)}</Text>
      </View>
      <View style={[styles.contentView, styles.alignEnd]}>
        <Text style={styles.value}>{format(tradeTime, "H:mm:ss")}</Text>
      </View>
    </View>
  );
};

export default memo(Trades);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 10,
  },
  bidBackground: {
    backgroundColor: colors.bidBackground,
  },
  askBackground: {
    backgroundColor: colors.askBackground,
  },
  contentView: { width: "30%" },
  value: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#474d57",
  },

  alignEnd: {
    alignItems: "flex-end",
  },
  bid: {
    color: colors.tradeGreen,
  },
  ask: {
    color: colors.tradeRed,
  },
});
