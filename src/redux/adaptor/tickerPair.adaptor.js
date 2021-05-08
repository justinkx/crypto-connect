export const tickerPairAdaptor = (data) => {
  const {
    e: eventType, // Event type
    E: eventTime, // Event time
    s: symbol, // Symbol
    p: priceChange, // Price change
    P: priceChangePercentage, // Price change percent
    w: weightedAveragePrice, // Weighted average price
    x: firstTradePrice, // First trade(F)-1 price (first trade before the 24hr rolling window)
    c: lastPrice, // Last price
    Q: lastQuandity, // Last quantity
    b: bestBidPrice, // Best bid price
    B: bestBidQuantity, // Best bid quantity
    a: bestAskPrice, // Best ask price
    A: bestAskQuantity, // Best ask quantity
    o: openPrice, // Open price
    h: highPrice, // High price
    l: lowPrice, // Low price
    v: totalTradedBaseAssetVolume, // Total traded base asset volume
    q: totalTradedQuoteAssetVolume, // Total traded quote asset volume
    O: statisticsOpenTime, // Statistics open time
    C: statisticsCloseTime, // Statistics close time
    F: firstTradeId, // First trade ID
    L: lastTradeId, // Last trade Id
    n: totalNumberOfTrades, // Total number of trades
  } = data;
  return {
    eventType,
    eventTime,
    symbol,
    priceChange,
    priceChangePercentage,
    weightedAveragePrice,
    firstTradePrice,
    lastPrice,
    lastQuandity,
    bestBidPrice,
    bestBidQuantity,
    bestAskPrice,
    bestAskQuantity,
    openPrice,
    highPrice,
    lowPrice,
    totalTradedBaseAssetVolume,
    totalTradedQuoteAssetVolume,
    statisticsOpenTime,
    statisticsCloseTime,
    firstTradeId,
    lastTradeId,
    totalNumberOfTrades,
  };
};
