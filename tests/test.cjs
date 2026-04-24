const pricehistory = require("../dist/cjs/index.js");
const data = require("./data.json");

const options = {
  // date: true,
  // halving: true,
  // time: true,
  // price: true,
  // leverage: 2,
  // limit: true,
  // obv: true,
  // vwap: true,
  // rsi: true,
  ema: true,
  macd: true,
};

console.log(pricehistory(data, options).slice(-10));
