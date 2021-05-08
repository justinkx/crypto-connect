import React, { useMemo, memo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { roundLastPrice } from "../../helpers/ticker.helpers";
import GlobalStyles, { colors } from "../../style/GlobalStyle";

const TickerPrice = ({
  closePrice,
  titleStyle = {},
  iconStyle = {},
  containerStyle = {},
}) => {
  const lastPriceRef = useRef(0);
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
    <View style={[GlobalStyles.row, containerStyle]}>
      <Text
        style={[
          styles.title,
          titleStyle,
          {
            color: lastPriceColor,
          },
        ]}
      >
        {lastPrice}
      </Text>
      {showIcon && (
        <AntDesign
          style={[styles.priceIcon, iconStyle]}
          name={isHigh ? "caretup" : "caretdown"}
          size={16}
          color={lastPriceColor}
        />
      )}
    </View>
  );
};

export default memo(TickerPrice);

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  priceIcon: {
    marginLeft: 3,
  },
});
