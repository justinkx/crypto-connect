export const fixedDecimals = (value, decimalPlaces = 2) =>
  parseFloat(value).toFixed(decimalPlaces);
