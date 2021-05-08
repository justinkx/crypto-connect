export const bookAdaptor = (data) => {
  const {
    u: orderBookUpdateId, // order book updateId
    s: symbol, // symbol
    b: bestBidPrice, // best bid price
    B: bestBidQty, // best bid qty
    a: bestAskPrice, // best ask price
    A: bestAskQty, // best ask qty
  } = data;
  return {
    orderBookUpdateId,
    symbol,
    bestBidPrice,
    bestBidQty,
    bestAskPrice,
    bestAskQty,
  };
};
