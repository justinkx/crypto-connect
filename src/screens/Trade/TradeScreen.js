import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const TradeScreen = () => {
  useFocusEffect(
    React.useCallback(() => {
      console.log("subscribe trades");

      return () => {
        console.log("unsubscribe trades");
      };
    }, [])
  );

  return (
    <View>
      <Text>TradeScreen</Text>
    </View>
  );
};

export default memo(TradeScreen);

const styles = StyleSheet.create({});
