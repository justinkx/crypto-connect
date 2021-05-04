export const suffix = [
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
  for (i = 0; i < suffix.length; i++) {
    const end = suffix[i];
    if (symbol.endsWith(end)) {
      return symbol.replace(end, `-${end}`);
    }
    continue;
  }
};
