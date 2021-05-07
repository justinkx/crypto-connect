import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { Ionicons } from "@expo/vector-icons";

import GlobalStyles, { colors } from "../../style/GlobalStyle";

const Header = ({ ticker, goBack }) => {
  const { pair, tokenImage, symbol } = ticker;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons
          name="ios-chevron-back"
          size={28}
          style={{ fontWeight: "bold" }}
          color="black"
        />
      </TouchableOpacity>
      <SharedElement id={`image-${pair}`}>
        <Image
          source={tokenImage}
          resizeMethod={"auto"}
          resizeMode={"stretch"}
          style={styles.icon}
        />
      </SharedElement>

      <View style={styles.nameView}>
        <SharedElement id={`ticker-${symbol}`}>
          <Text allowFontScaling style={styles.name}>
            {pair}
          </Text>
        </SharedElement>
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingRight: 15,
  },
  backButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nameView: {
    width: "30%",
  },
  icon: { width: 60, height: 60, marginRight: 15 },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
