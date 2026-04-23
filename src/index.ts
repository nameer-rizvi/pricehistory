// import { DataPoint, Option, Candle, Context } from "./interfaces";
// import setOptions from "./option.set";
// import setCandleDate from "./candle.setDate";
// import setCandleHalving from "./candle.setHalving";
// import setCandleTime from "./candle.setTime";
// import setCandlePrice from "./candle.setPrice";
// import setCandlePriceLimit from "./candle.setPriceLimit";
// import setCandleVolume from "./candle.setVolume";
// import setCandleVwap from "./candle.setVwap";
// import setCandleRsi from "./candle.setRsi";
// import setCandleEma from "./candle.setEma";
// import setCandleMacd from "./candle.setMacd";
// import setCandleColor from "./candle.setColor";
// import setCandleSma from "./candle.setSma";
// import setCandleSignal from "./candle.setSignal";
// import setCandleCandlestick from "./candle.setCandlestick";
// import setCandlePhase from "./candle.setPhase";
// import setCandlePressure from "./candle.setPressure";
// import setCandleTrend from "./candle.setTrend";
// import setCandleAnchor from "./candle.setAnchor";
// import normalizeCandles from "./candles.normalize";
// import simpul from "simpul";

// function pricehistory(series: DataPoint[] = [], option: Option = {}): Candle[] {
//   if (!series?.length) return [];
//   const candles: Candle[] = [];
//   const ctx: Context = {
//     obv: 0,
//     obvValue: 0,
//     vwapPV: 0,
//     vwapVolume: 0,
//     window: {},
//     rsi: {},
//     ema: {},
//     macd: {},
//     color: {},
//     prevTopBottom: [],
//     trend: {},
//   };
//   setOptions(option, series);
//   let index = 0;
//   for (const curr of series) {
//     const candle: Candle = { index: index++ };
//     setCandleDate(option, curr, candle);
//     setCandleHalving(option, candle);
//     setCandleTime(option, candle);
//     setCandlePrice(option, curr, candle, ctx);
//     setCandlePriceLimit(option, candle);
//     setCandleVolume(option, curr, candle, ctx);
//     setCandleVwap(option, candle, ctx);
//     setCandleRsi(option, candle, ctx);
//     setCandleEma(option, candle, ctx);
//     setCandleMacd(option, candle, ctx);
//     setCandleColor(option, candle, ctx);
//     setCandleSma(option, candle, ctx);
//     setCandleSignal(option, candle, ctx);
//     setCandleCandlestick(option, candle, ctx);
//     setCandlePhase(option, candle);
//     setCandlePressure(option, candle);
//     setCandleTrend(option, candle, ctx);
//     setCandleAnchor(option, candle);
//     ctx.prevClose = candle.priceClose; // leverage or regular
//     const regClose = option.close && curr[option.close]; // regular
//     if (simpul.isNumber(regClose)) ctx.prevClose2 = regClose;
//     candles.push(candle);
//   }
//   normalizeCandles(option, candles);
//   return candles;
// }

// export default pricehistory;
