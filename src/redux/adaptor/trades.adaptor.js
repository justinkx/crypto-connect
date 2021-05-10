export const tradesAdaptor = (data) => {
  const {
    e: eventType, // Event type
    E: eventTime, // Event time
    s: symbol, // Symbol
    t: tradeId, // Trade ID
    p: price, // Price
    q: quantity, // Quantity
    b: buyerOrderId, // Buyer order ID
    a: sellerOrderId, // Seller order ID
    T: tradeTime, // Trade time
    m: isMarketOrder, // Is the buyer the market maker?
    M: ignore, // Ignore
  } = data;
  return {
    eventType,
    eventTime,
    symbol,
    tradeId,
    price,
    quantity,
    buyerOrderId,
    sellerOrderId,
    tradeTime,
    isMarketOrder,
    ignore,
  };
};

export const transformedTrade = (data) => {
  const {
    eventType,
    eventTime,
    symbol,
    tradeId,
    price,
    quantity,
    buyerOrderId,
    sellerOrderId,
    tradeTime,
    isMarketOrder,
    ignore,
  } = tradesAdaptor(data);
  return {
    [tradeTime]: {
      eventType,
      eventTime,
      symbol,
      tradeId,
      price,
      quantity,
      buyerOrderId,
      sellerOrderId,
      tradeTime,
      isMarketOrder,
      ignore,
    },
  };
};
