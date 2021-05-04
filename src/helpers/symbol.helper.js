export const symbols = [
  "USDT",
  "USD",
  "ETH",
  "BTC",
  "BNB",
  "RUB",
  "TRY",
  "EUR",
  "AUD",
  "BRL",
  "GBP",
  "PAX",
  "VAI",
];
export const findIconName = (symbol = "") => {
  for (i = 0; i < symbols.length; i++) {
    const end = symbols[i];
    if (symbol.endsWith(end)) {
      return symbol.replace(end, `-${end}`);
    }
    continue;
  }
};
