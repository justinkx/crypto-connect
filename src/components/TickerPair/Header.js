import React, { memo } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, shallowEqual } from "react-redux";

import GlobalStyles from "../../style/GlobalStyle";
import TickerPrice from "../Tickers/TickerPrice";
import { getPairClosePrice } from "../../redux/selectors/tickerPair.selector";
import HeaderCol from "./HeaderCol";

const Header = ({ ticker, goBack }) => {
  const { pair, tokenImage, symbol, closePrice } = ticker;
  const {
    lastPrice,
    totalNumberOfTrades,
    bestBidPrice,
    bestAskPrice,
  } = useSelector(getPairClosePrice, shallowEqual);

  return (
    <View>
      <View style={[styles.container]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons
            name="ios-chevron-back"
            size={28}
            style={{ fontWeight: "bold" }}
            color="black"
          />
        </TouchableOpacity>
        <Image
          source={tokenImage}
          resizeMethod={"auto"}
          resizeMode={"stretch"}
          style={styles.icon}
        />

        <View style={styles.nameView}>
          <Text allowFontScaling style={styles.name}>
            {pair}
          </Text>
          <TickerPrice
            containerStyle={styles.priceContainerStyle}
            closePrice={lastPrice || closePrice}
          />
        </View>
      </View>
      <View style={[GlobalStyles.row, styles.headerColStyle]}>
        <HeaderCol title={"Total No Trades"} value={totalNumberOfTrades} />
        <HeaderCol title={"Best Bid Price"} value={bestBidPrice} />
        <HeaderCol title={"Best Ask Price"} value={bestAskPrice} />
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingRight: 15,
  },
  backButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  nameView: {
    width: "30%",
  },
  icon: { width: 60, height: 60, marginRight: 15 },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceContainerStyle: {
    marginTop: 5,
  },
  headerColStyle: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
