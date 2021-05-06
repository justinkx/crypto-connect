import React, { memo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import GlobalStyles, { colors } from "../../style/GlobalStyle";

const Header = ({ ticker }) => {
  const { pair, tokenImage, symbol } = ticker;

  return (
    <View>
      <SharedElement id={`image-${pair}`}>
        <Image
          source={tokenImage}
          resizeMethod={"auto"}
          resizeMode={"cover"}
          style={styles.icon}
        />
      </SharedElement>
      <SharedElement id={`ticker-${symbol}`}>
        <Text>{pair}</Text>
      </SharedElement>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  icon: { width: 30, height: 30, marginRight: 10 },
});
