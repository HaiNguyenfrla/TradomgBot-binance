const express = require('express');
const { fetchBinanceData } = require('../controllers/binanceController');
const { generateBuySellSignals } = require('../services/indicatorService');

const router = express.Router();

// Endpoint to get market data with indicators and signals
router.get('/market-data', async (req, res) => {
  const symbol = req.query.symbol || 'BTCUSDT';
  const interval = req.query.interval || '1h';
  const limit = req.query.limit || 100;

  try {
    const marketData = await fetchBinanceData(symbol, interval, limit);
    const signals = generateBuySellSignals(marketData);
    
    res.json({ marketData, signals });
  } catch (error) {
    res.status(500).send('Error fetching data from Binance');
  }
});

module.exports = router;
