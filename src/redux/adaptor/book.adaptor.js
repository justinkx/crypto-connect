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

export const transformBook = (data) => {
  const { bids = [], asks = [] } = data;
  let ask = {};
  let bid = {};

  for (i = 0; i < 5; i++) {
    const askData = asks[i];
    const bidData = bids[i];
    if (askData) {
      [askPrice, askQuantity] = askData;
      ask[askPrice] = {
        price: askPrice,
        quantity: askQuantity,
      };
    }
    if (bidData) {
      [bidPrice, bidQuantity] = bidData;
      bid[bidPrice] = {
        price: bidPrice,
        quantity: bidQuantity,
      };
    }
  }
  return {
    ask,
    bid,
  };
};
