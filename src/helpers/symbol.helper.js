export const symbols = [
  "BTC",
  "USDT",
  "USD",
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
export const replace = (string, pattern, replacePattern = "") =>
  string.replace(
    new RegExp(pattern.replace(/\./g, "\\$&") + "$"),
    replacePattern
  );

export const findIconName = (symbol = "") => {
  let result = "";
  for (i = 0; i < symbols.length; i++) {
    const end = symbols[i];
    if (symbol.endsWith(end)) {
      result = replace(symbol, end, `-${end}`);
      return result;
    }
    continue;
  }
  return result;
};

export const getSymbolPair = (symbol = "") => {
  let result = {
    imageSuffix: "",
    pair: "",
    suffix: "",
  };
  for (i = 0; i < symbols.length; i++) {
    const end = symbols[i];
    if (symbol.endsWith(end)) {
      const [imageSuffix] = symbol.split(end);
      const replacePair = replace(symbol, end, `-${end}`);
      result = {
        pair: replacePair,
        imageSuffix,
        suffix: end,
      };

      return result;
    }
    continue;
  }
  return result;
};
