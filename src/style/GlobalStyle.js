import { StyleSheet } from "react-native";

export const colors = {
  tradeGreen: "#3CD070",
  tradeRed: "#EF3038",
  white: "#ffffff",
  black: "#000000",
};

const GlobalStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    padding: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default GlobalStyles;
