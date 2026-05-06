import {
  type DataPoint,
  type Option,
  type NormalizedOption,
  type Context,
  type Candle,
} from "./interfaces.js";
import setOptions from "./option.set.js";
import setCandleDate from "./candle.setDate.js";
import setCandleHalving from "./candle.setHalving.js";
import setCandleTime from "./candle.setTime.js";
import setCandlePrice from "./candle.setPrice.js";
import setCandlePriceLimit from "./candle.setPriceLimit.js";
import setCandleVolume from "./candle.setVolume.js";
import setCandleVwap from "./candle.setVwap.js";
import setCandleRsi from "./candle.setRsi.js";
import setCandleEma from "./candle.setEma.js";
import setCandleMacd from "./candle.setMacd.js";
import setCandleMacdLimit from "./candle.setMacdLimit.js";
import setCandleColor from "./candle.setColor.js";
import setCandleSma from "./candle.setSma.js";
import setCandleSignal from "./candle.setSignal.js";
import setCandleCandlestick from "./candle.setCandlestick.js";
import setCandlePhase from "./candle.setPhase.js";
import setCandlePressure from "./candle.setPressure.js";
import setCandleTrend from "./candle.setTrend.js";
import * as utils from "@nameer/utils";

/**
 * Processes a series of raw OHLCV data points into enriched candles with technical indicators.
 * @example
 * pricehistory(series, { price: true, rsi: true, ema: true, macd: true })
 * pricehistory(series, { price: true, color: true, candlestick: true })
 * pricehistory(series, { open: "o", high: "h", low: "l", close: "c", volume: "v" })
 */
function pricehistory(series: DataPoint[] = [], option: Option = {}): Candle[] {
  if (!series.length) return [];

  const opt: NormalizedOption = setOptions(option, series);

  const candles: Candle[] = [];

  const ctx: Context = {
    obv: 0,
    obvValue: 0,
    vwapPV: 0,
    vwapVolume: 0,
    window: {},
    rsi: {},
    ema: {},
    macd: {},
    color: {},
    prevTopBottom: [],
    trend: {},
  };

  let index = 0;

  for (const curr of series) {
    const candle: Candle = { index: index++ };

    setCandleDate(opt, curr, candle);

    setCandleHalving(opt, candle);

    setCandleTime(opt, candle);

    setCandlePrice(opt, curr, candle, ctx);

    setCandlePriceLimit(opt, candle);

    setCandleVolume(opt, curr, candle, ctx);

    setCandleVwap(opt, candle, ctx);

    setCandleRsi(opt, candle, ctx);

    setCandleEma(opt, candle, ctx);

    setCandleMacd(opt, candle, ctx);

    setCandleMacdLimit(opt, candle, ctx);

    setCandleColor(opt, candle, ctx);

    setCandleSma(opt, candle, ctx);

    setCandleSignal(opt, candle, ctx);

    setCandleCandlestick(opt, candle, ctx);

    setCandlePhase(opt, candle);

    setCandlePressure(opt, candle);

    setCandleTrend(opt, candle, ctx);

    // Track previous close for next candle's calculations

    ctx.prevClose = candle.priceClose; // leverage-adjusted or regular

    const regClose = curr[opt.close]; // always raw/regular

    if (utils.isNumber(regClose)) ctx.prevClose2 = regClose;

    // Fold normalize copy into main loop for efficiency

    for (const key of opt.normalize) candle[`${key}N`] = candle[key];

    // Add anchor properties

    for (const num of opt.anchor) candle[`anchor${num}`] = num;

    candles.push(candle);
  }

  for (const key of opt.normalize) utils.rescale(candles, `${key}N`, [0, 100]);

  return candles;
}

export default pricehistory;
