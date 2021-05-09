import _size from "lodash/size";
import _max from "lodash/max";

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

export const transformBookStream = (data) => {
  const transformedBook = bookAdaptor(data);
  const {
    orderBookUpdateId,
    symbol,
    bestBidPrice,
    bestBidQty,
    bestAskPrice,
    bestAskQty,
  } = transformedBook;
  const ask = {
    [bestAskPrice]:
      bestAskQty == 0
        ? undefined
        : {
            price: bestAskPrice,
            quantity: bestAskQty,
          },
  };
  const bid = {
    [bestBidPrice]:
      bestBidQty == 0
        ? undefined
        : {
            price: bestBidPrice,
            quantity: bestBidQty,
          },
  };
  return {
    ask,
    bid,
  };
};

export const transformBook = (data) => {
  const { bids = [], asks = [] } = data;
  let ask = {};
  let bid = {};

  for (i = 0; i < 5; i++) {
    const askData = asks[i];
    const bidData = bids[i];
    if (askData) {
      [askPrice, askQuantity] = askData;
      if (askPrice == 0 || askQuantity == 0) {
        ask[askPrice] = undefined;
      } else {
        ask[askPrice] = {
          price: askPrice,
          quantity: askQuantity,
        };
      }
    }
    if (bidData) {
      [bidPrice, bidQuantity] = bidData;
      if (bidPrice == 0 || bidQuantity == 0) {
        bid[bidPrice] = undefined;
      } else {
        bid[bidPrice] = {
          price: bidPrice,
          quantity: bidQuantity,
        };
      }
    }
  }
  return {
    ask,
    bid,
  };
};
