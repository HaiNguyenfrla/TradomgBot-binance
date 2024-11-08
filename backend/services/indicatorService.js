const talib = require('ta-lib');

function calculateTEMA(data, period = 9) {
  const closePrices = data.map(d => d.close);
  return talib.execute({
    name: 'TEMA',
    startIdx: 0,
    endIdx: closePrices.length - 1,
    inReal: closePrices,
    optInTimePeriod: period,
  }).result.outReal;
}

function calculateWMA(data, period = 9) {
  const closePrices = data.map(d => d.close);
  return talib.execute({
    name: 'WMA',
    startIdx: 0,
    endIdx: closePrices.length - 1,
    inReal: closePrices,
    optInTimePeriod: period,
  }).result.outReal;
}

function calculateLSMA(data, period = 25) {
  const closePrices = data.map(d => d.close);
  return talib.execute({
    name: 'LSMA',
    startIdx: 0,
    endIdx: closePrices.length - 1,
    inReal: closePrices,
    optInTimePeriod: period,
  }).result.outReal;
}

function generateBuySellSignals(data) {
  const TEMA = calculateTEMA(data);
  const WMA = calculateWMA(data);
  const LSMA = calculateLSMA(data);

  const signals = [];
  for (let i = 1; i < data.length; i++) {
    // Buy Signal Logic
    if (TEMA[i] > TEMA[i-1] && WMA[i] > WMA[i-1] && LSMA[i] > LSMA[i-1]) {
      signals.push({ signal: 'buy', price: data[i].close, time: data[i].time });
    }
    // Sell Signal Logic
    if (TEMA[i] < TEMA[i-1] && WMA[i] < WMA[i-1] && LSMA[i] < LSMA[i-1]) {
      signals.push({ signal: 'sell', price: data[i].close, time: data[i].time });
    }
  }

  return signals;
}

module.exports = { calculateTEMA, calculateWMA, calculateLSMA, generateBuySellSignals };
