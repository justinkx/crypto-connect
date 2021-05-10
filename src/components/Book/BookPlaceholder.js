import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

import { colors } from "../../style/GlobalStyle";

const BookPlaceholder = ({ isBid, width }) => {
  return (
    <View style={styles.wrapper}>
      <ContentLoader
        speed={1}
        width={width / 2}
        height={30}
        viewBox={`0 0 ${width / 2} 30`}
        backgroundColor={isBid ? colors.tabIndicator : colors.tradeRed}
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y="10" rx="3" ry="3" width={isBid ? 45 : 80} height="14" />
      </ContentLoader>
      <ContentLoader
        speed={1}
        width={width / 2}
        height={30}
        viewBox={`0 0 ${width / 2} 30`}
        backgroundColor={isBid ? colors.tradeGreen : colors.tabIndicator}
        foregroundColor="#ecebeb"
      >
        <Rect
          x={isBid ? width / 2 - 80 : width / 2 - 45}
          y="10"
          rx="3"
          ry="3"
          width="80"
          height="14"
        />
      </ContentLoader>
    </View>
  );
};

export default memo(BookPlaceholder);

const styles = StyleSheet.create({
  wrapper: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    width: 100,
    height: 14,
    borderRadius: 2,
  },
  value: {
    width: 60,
    height: 14,
    borderRadius: 2,
  },
});
