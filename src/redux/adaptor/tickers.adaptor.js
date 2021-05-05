export const tickersAdaptor = (data) => {
  const {
    e: eventType, // Event type
    E: eventTime, // Event time
    s: symbol, // Symbol
    c: closePrice, // Close price
    o: openPrice, // Open price
    h: highPrice, // High price
    l: lowPrice, // Low price
    v: totalTradeBaseAssetVolume, // Total traded base asset volume
    q: totalTradeQuoteAssetVolume, // Total traded quote asset volume
  } = data;
  return {
    eventType,
    eventTime,
    symbol,
    closePrice,
    openPrice,
    highPrice,
    lowPrice,
    totalTradeBaseAssetVolume,
    totalTradeQuoteAssetVolume,
  };
};

export const tickerTransform = (tickers = []) =>
  tickers.reduce((tickerObj, item) => {
    const ticker = tickersAdaptor(item);
    return {
      ...tickerObj,
      [ticker.symbol]: { ...ticker },
    };
  }, {});
