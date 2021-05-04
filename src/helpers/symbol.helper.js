export const symbols = [
  "BTC",
  "USD",
  "USDT",
  "ETH",
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
