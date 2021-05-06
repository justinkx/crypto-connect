import React from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const TickerItemLoader = ({}) => {
  return (
    <View style={styles.wrapper}>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.icon} />
          <View style={styles.nameContainer}>
            <View style={styles.title} />
            <View style={styles.volume} />
            <View style={styles.value} />
          </View>
          <View style={styles.mainContainer}>
            <View style={[styles.title, { width: 120 }]} />
            <View style={[styles.volume, { width: 75 }]} />
            <View style={styles.value} />
          </View>
          <View style={styles.changeView}>
            <View style={styles.changeBtn} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default TickerItemLoader;

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
