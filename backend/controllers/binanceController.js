const axios = require('axios');

const BINANCE_API_URL = 'https://api.binance.com/api/v3/klines';

// Fetch historical data from Binance
async function fetchBinanceData(symbol, interval, limit) {
  try {
    const response = await axios.get(BINANCE_API_URL, {
      params: {
        symbol,
        interval,
        limit,
      },
    });

    return response.data.map(candle => ({
      time: new Date(candle[0]),
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]),
    }));
  } catch (error) {
    console.error('Error fetching Binance data:', error);
    throw error;
  }
}

module.exports = { fetchBinanceData };
