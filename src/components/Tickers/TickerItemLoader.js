import React, { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

import { colors } from "../../style/GlobalStyle";

const TickerItemLoader = ({}) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.wrapper}>
      <ContentLoader
        speed={1}
        width={width}
        height={50}
        viewBox={`0 0 ${width} 50`}
        backgroundColor={colors.tabIndicator}
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y="5" rx="5" ry="5" width="35" height="35" />
        <Rect x="50" y="3" rx="3" ry="3" width="70" height="14" />
        <Rect x="50" y="25" rx="3" ry="3" width="55" height="13" />
        <Rect x={"35%"} y="3" rx="3" ry="3" width="100" height="14" />
        <Rect x={"35%"} y="25" rx="3" ry="3" width="70" height="13" />
        <Rect x={width - 80} y="15" rx="4" ry="4" width="55" height="28" />
      </ContentLoader>
    </View>
  );
};

export default memo(TickerItemLoader);

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
  },
  nameContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mainContainer: {
    width: "35%",
  },
  changeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: { width: 90, height: 15, borderRadius: 4 },
  volume: { marginTop: 6, width: 60, height: 12, borderRadius: 2 },
  value: { width: 40, height: 12, borderRadius: 2, marginTop: 3 },
  changeBtn: {
    width: 55,
    height: 30,
    borderRadius: 4,
  },
});
