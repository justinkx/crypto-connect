export const find24hChange = (openPrice, closePrice) => {
  const diff = closePrice - openPrice;
  const diffPer = ((diff / openPrice) * 100).toFixed(2);
  return diffPer;
};

export const roundLastPrice = (lastPrice) => {
  if (lastPrice > 1) {
    if (lastPrice < 1000) {
      return lastPrice.toFixed(3);
    }
    if (lastPrice > 1000) {
      return lastPrice.toFixed(2);
    }
  } else {
    return lastPrice.toFixed(8);
  }
};
