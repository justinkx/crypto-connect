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
import { format } from "date-fns";
import { SharedElement } from "react-navigation-shared-element";

import { getSymbolTicker } from "../../redux/selectors/tickers.selector";
import { getSymbolPair } from "../../helpers/symbol.helper";
import { find24hChange, roundLastPrice } from "../../helpers/ticker.helpers";
import { colors } from "../../style/GlobalStyle";
import TableRow from "./TableRow";
import TickerTimeViewItem from "./TickerTimeViewItem";
import TickerPrice from "./TickerPrice";

const DefaultCoin = require("../../../assets/coins.png");

const TickersItem = ({ symbol, navigation }) => {
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
    navigation.push("ticker-pair", {
      ticker: { ...ticker, pair: pair, tokenImage },
    });
  }, [navigation, ticker, tokenImage]);

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
          <SharedElement id={`image-${pair}`}>
            <Image
              source={tokenImage}
              defaultSource={DefaultCoin}
              resizeMethod={"auto"}
              resizeMode={"cover"}
              style={styles.icon}
              onError={onImageLoadError}
            />
          </SharedElement>

          <View style={styles.nameContainer}>
            <SharedElement id={`ticker-${symbol}`}>
              <Text style={styles.title}>{pair}</Text>
            </SharedElement>

            <Text style={styles.volume}>{`Vol (${suffix}): \n${Math.floor(
              totalTradeQuoteAssetVolume
            )}`}</Text>
          </View>
          <View style={[styles.nameContainer, styles.mainContainerWidth]}>
            <SharedElement id={`price-${symbol}`}>
              <TickerPrice closePrice={closePrice} />
            </SharedElement>

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
            value={`\u25B2 ${roundLastPrice(parseFloat(highPrice))}`}
          />
          <TickerTimeViewItem
            title={"Low Price"}
            value={`\u25BC ${roundLastPrice(parseFloat(lowPrice))}`}
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
  timeView: {
    justifyContent: "space-between",
  },
  mainContainerWidth: { width: "35%" },
  alignLast: {
    alignItems: "flex-end",
  },
});
