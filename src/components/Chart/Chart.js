import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { WebView } from "react-native-webview";

const Chart = ({ pair = "BTCBUSD" }) => {
  return (
    <View
      style={{
        height: 300,
      }}
    >
      <WebView
        cacheEnabled
        cacheMode={"LOAD_DEFAULT"}
        pullToRefreshEnabled={false}
        showsVerticalScrollIndicator={false}
        source={{ uri: `https://crypto-connect-web.vercel.app/?pair=${pair}` }}
      />
    </View>
  );
};

export default memo(Chart);

const styles = StyleSheet.create({});
