import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const onMessage = useCallback((trade) => {
    console.log("trade", trade);
  }, []);

  useEffect(() => {
    // const socket = new WebSocket(
    //   "wss://stream.binance.com:9443/ws/!miniTicker@arr"
    // );
    // socket.addEventListener("message", onMessage);
  }, [onMessage]);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
