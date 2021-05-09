import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const BookPlaceholder = ({ isBid }) => {
  return (
    <View style={styles.wrapper}>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={[isBid ? styles.value : styles.price]} />
          <View style={[isBid ? styles.price : styles.value]} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default memo(BookPlaceholder);

const styles = StyleSheet.create({
  wrapper: {
    height: 30,
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
