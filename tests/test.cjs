const pricehistory = require("../dist/cjs/index.js");
const data = require("./data.json");

const options = {
  // date: true,
  // halving: true,
  // time: true,
  // leverage: 2,
  // price: true,
  // limit: true,
  // obv: true,
  // vwap: true,
  // rsi: true,
  // ema: true,
  macd: true,
  macdLimit: true,
  // color: true,
  // sma: true,
  // signal: ["priceClose", "priceMean"],
  // candlestick: true,
  // phase: true,
  // pressure: true,
  // trend: true,
  // anchor: true,
  // normalize: ["volume", "volumeValue"],
};

console.log(pricehistory(data, options).slice(-5));
