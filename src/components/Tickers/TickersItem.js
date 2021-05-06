import React, { memo, useMemo, useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import isEqual from "lodash/isEqual";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";

import { getSymbolTicker } from "../../redux/selectors/tickers.selector";
import { getSymbolPair } from "../../helpers/symbol.helper";
import { find24hChange, roundLastPrice } from "../../helpers/ticker.helpers";
import GlobalStyles, { colors } from "../../style/GlobalStyle";
import TableRow from "./TableRow";
import TickerTimeViewItem from "./TickerTimeViewItem";

const DefaultCoin = require("../../../assets/coins.png");

const TickersItem = ({ symbol, navigation }) => {
  const lastPriceRef = useRef(0);
  const [imageLoadError, setLoadError] = useState(false);

  const { width } = useWindowDimensions();
  const ticker = useSelector(
    (state) => getSymbolTicker(state)(symbol),
    shallowEqual
  );
  const {
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

  const tokenImage = useMemo(
    () =>
      imageLoadError
        ? DefaultCoin
        : {
            uri: `https://raw.githubusercontent.com/crypti/cryptocurrencies/master/images/${imageSuffix}.png`,
          },
    [imageLoadError, imageSuffix]
  );

  const onTickerClick = useCallback(() => {
    navigation.push("ticker-pair", { ticker: { ...ticker, pair: pair } });
  }, [navigation, ticker]);

  const onImageLoadError = useCallback(() => {
    setLoadError(true);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces
        horizontal
        snapToInterval={width}
        snapToAlignment={"center"}
        scrollEventThrottle={100}
      >
        <TableRow onClick={onTickerClick} width={width}>
          <Image
            source={tokenImage}
            defaultSource={DefaultCoin}
            resizeMethod={"auto"}
            resizeMode={"cover"}
            style={styles.icon}
            onError={onImageLoadError}
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

            <Text style={styles.volume}>{`Vol (${imageSuffix}):\n${Math.floor(
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
        <TableRow
          onClick={onTickerClick}
          rowStyle={styles.timeView}
          width={width}
        >
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
            value={format(new Date(eventTime), "HH:mm:ss")}
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
    width: "30%",
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
  mainContainerWidth: { width: "35%" },
  alignLast: {
    alignItems: "flex-end",
  },
});
