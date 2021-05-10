import { StyleSheet } from "react-native";

export const colors = {
  tradeGreen: "#00c582",
  tradeRed: "#f84960",
  white: "#ffffff",
  black: "#000000",
  tabIndicator: "#C0C0C0",
  searchBarBorder: "#adb5bd",
  tradeTabIndicator: "#7134eb",
  bookQuantity: "#747c8a",
  askBackground: "rgba(248, 73, 96,0.25)",
  bidBackground: "rgba(2, 192, 118, 0.25)",
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
