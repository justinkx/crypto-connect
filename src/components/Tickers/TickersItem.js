import React, { memo, useMemo, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import isEqual from "lodash/isEqual";
import { AntDesign } from "@expo/vector-icons";

import { getSymbolTicker } from "../../redux/selectors/tickers.selector";
import { getSymbolPair } from "../../helpers/symbol.helper";
import { find24hChange, roundLastPrice } from "../../helpers/ticker.helpers";
import GlobalStyles, { colors } from "../../style/GlobalStyle";
import TableRow from "./TableRow";
import TickerTimeViewItem from "./TickerTimeViewItem";

const TickersItem = ({ symbol }) => {
  const lastPriceRef = useRef(0);

  const { width } = useWindowDimensions();
  const ticker = useSelector(
    (state) => getSymbolTicker(state)(symbol),
    shallowEqual
  );
  const {
    eventType,
    eventTime,
    symbol: tickerSymbol,
    closePrice,
    openPrice,
    highPrice,
    lowPrice,
    totalTradeBaseAssetVolume,
    totalTradeQuoteAssetVolume,
  } = ticker;

  const { pair, imageSuffix, suffix } = useMemo(() => getSymbolPair(symbol), [
    symbol,
  ]);
  const per24HrChange = useMemo(() => find24hChange(openPrice, closePrice), [
    openPrice,
    closePrice,
  ]);
  const lastPrice = useMemo(() => roundLastPrice(parseFloat(closePrice)), [
    closePrice,
  ]);

  const {
    lastPriceColor = "",
    isHigh = null,
    showIcon = true,
  } = useMemo(() => {
    const _lastPriceColor = {
      lastPriceColor: colors.black,
      isHigh: null,
      showIcon: true,
    };
    if (closePrice > lastPriceRef.current) {
      _lastPriceColor.lastPriceColor = colors.tradeGreen;
      _lastPriceColor.isHigh = true;
    } else if (closePrice < lastPriceRef.current) {
      _lastPriceColor.lastPriceColor = colors.tradeRed;
      _lastPriceColor.isHigh = false;
    } else {
      _lastPriceColor.showIcon = false;
    }
    lastPriceRef.current = closePrice;
    return _lastPriceColor;
  }, [closePrice]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        bounces
        horizontal
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment={"start"}
        scrollEventThrottle={100}
      >
        <TableRow width={width}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/${imageSuffix}.png`,
            }}
            resizeMethod={"auto"}
            resizeMode={"cover"}
            style={styles.icon}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{pair}</Text>
            <Text style={styles.volume}>{`Vol (${suffix}): \n${Math.floor(
              totalTradeQuoteAssetVolume
            )}`}</Text>
          </View>
          <View style={[styles.nameContainer, styles.mainContainerWidth]}>
            <View style={GlobalStyles.row}>
              <Text
                style={[
                  styles.title,
                  {
                    color: lastPriceColor,
                  },
                ]}
              >
                {lastPrice}
              </Text>
              {showIcon && (
                <AntDesign
                  style={styles.priceIcon}
                  name={isHigh ? "caretup" : "caretdown"}
                  size={16}
                  color={lastPriceColor}
                />
              )}
            </View>

            <Text style={styles.volume}>{`Vol (${imageSuffix}): ${Math.floor(
              totalTradeBaseAssetVolume
            )}`}</Text>
          </View>
          <View style={styles.changeContainer}>
            <View
              style={[
                styles.change24hr,
                {
                  backgroundColor:
                    per24HrChange > 0 ? colors.tradeGreen : colors.tradeRed,
                },
              ]}
            >
              <Text style={styles.changeText}>
                {per24HrChange > 0 ? `+${per24HrChange}` : per24HrChange}%
              </Text>
            </View>
          </View>
        </TableRow>
        <TableRow rowStyle={styles.timeView} width={width}>
          <TickerTimeViewItem
            title={"High Price"}
            value={roundLastPrice(parseFloat(highPrice))}
          />
          <TickerTimeViewItem
            title={"Low Price"}
            value={roundLastPrice(parseFloat(lowPrice))}
          />
          <TickerTimeViewItem
            containerStyle={styles.alignLast}
            title={"Last Updated"}
            value={eventTime}
          />
        </TableRow>
      </ScrollView>
    </View>
  );
};

export default memo(TickersItem, isEqual);

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 7, borderBottomWidth: StyleSheet.hairlineWidth },
  icon: { width: 30, height: 30, marginRight: 10 },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 15,
    width: "25%",
  },
  changeContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  change24hr: {
    width: 55,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  changeText: {
    color: colors.white,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  volume: {
    paddingTop: 4,
    fontSize: 12,
  },
  priceIcon: {
    marginLeft: 3,
  },
  timeView: {
    justifyContent: "space-between",
  },
  mainContainerWidth: { width: "40%" },
  alignLast: {
    alignItems: "flex-end",
  },
});
