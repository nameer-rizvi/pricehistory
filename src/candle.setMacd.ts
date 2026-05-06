import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleMacd(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (opt.macd === false) return;

  const fast = candle[`ema${opt.macd[0]}`];

  const slow = candle[`ema${opt.macd[1]}`];

  if (fast === undefined || slow === undefined) return;

  const macdLine = (fast as number) - (slow as number);

  candle.macd = utils.math.num(macdLine);

  const signal = opt.macd[2];

  const winKey = `macd${signal}`;

  ctx.window[winKey] ??= [];

  ctx.window[winKey].push(macdLine);

  if (ctx.window[winKey].length > signal) ctx.window[winKey].shift();

  if (ctx.window[winKey].length < signal) return;

  if (ctx.macd.initialized !== true) {
    const sma = utils.math.mean(ctx.window[winKey]);

    if (sma === undefined) return;

    ctx.macd.prev = sma;

    ctx.macd.initialized = true;

    candle.macdSignal = utils.math.num(sma);

    candle.macdHist = utils.math.num(macdLine - sma);

    ctx.macd.prevHist = candle.macdHist;

    delete ctx.window[winKey];

    return;
  }

  if (ctx.macd.prev === undefined) return;

  const multiplier = 2 / (signal + 1);

  const emaSignal = (macdLine - ctx.macd.prev) * multiplier + ctx.macd.prev;

  ctx.macd.prev = emaSignal;

  candle.macdSignal = utils.math.num(emaSignal);

  candle.macdHist = utils.math.num(macdLine - emaSignal);

  ctx.macd.prevHist = candle.macdHist;
}

export default setCandleMacd;
