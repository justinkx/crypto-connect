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

export const transformBook = (data) => {
  const parsedBookData = bookAdaptor(data);
  const {
    bestBidPrice,
    bestBidQty,
    bestAskPrice,
    bestAskQty,
    symbol,
  } = parsedBookData;
  const bid = {
    [bestBidPrice]: {
      price: bestBidPrice,
      quantity: bestBidQty,
    },
  };
  const ask = {
    [bestAskPrice]: {
      price: bestAskPrice,
      quantity: bestAskQty,
    },
  };
  return {
    bid,
    ask,
    symbol,
  };
};
