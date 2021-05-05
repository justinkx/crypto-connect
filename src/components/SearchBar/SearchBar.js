import React, { memo } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../../style/GlobalStyle";

const HEIGHT = 30;

const SearchBar = ({
  onValueChange,
  containerStyle = {},
  placeholder = "Search token",
  inputStyle = {},
  closeIconStyle = {},
  value,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        allowFontScaling={false}
        onChangeText={onValueChange}
        value={value}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.searchBarBorder}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onValueChange("")}
          style={[styles.closeButton]}
        >
          <AntDesign
            allowFontScaling={false}
            name="closecircle"
            size={10}
            style={[styles.closeIcon, closeIconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: HEIGHT / 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    alignItems: "center",
    margin: 10,
    borderColor: colors.searchBarBorder,
  },
  input: {
    fontSize: 15,
    width: "100%",
  },
  closeButton: {
    width: HEIGHT - 10,
    height: HEIGHT - 10,
    position: "absolute",
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (HEIGHT - 10) / 2,
    opacity: 0.5,
  },
  closeIcon: {
    fontSize: 13,
    textAlign: "center",
    color: colors.black,
  },
});
