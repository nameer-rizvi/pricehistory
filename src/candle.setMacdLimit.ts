import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleMacdLimit(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (
    opt.macd === false ||
    opt.macdLimit === false ||
    candle.macdHist === undefined ||
    ctx.macd.prevHist === undefined
  )
    return;

  const fast = opt.macd[0];

  const slow = opt.macd[1];

  const signal = opt.macd[2];

  const prevEmaFast = ctx.ema[fast]?.prev;

  const prevEmaSlow = ctx.ema[slow]?.prev;

  const prevMacdSignal = ctx.macd.prev;

  if (
    prevEmaFast === undefined ||
    prevEmaSlow === undefined ||
    prevMacdSignal === undefined
  )
    return;

  const mFast = 2 / (fast + 1);

  const mSlow = 2 / (slow + 1);

  const mSignal = 2 / (signal + 1);

  const A = mFast - mSlow;

  const B = prevEmaFast * (1 - mFast) - prevEmaSlow * (1 - mSlow);

  const price = (ctx.macd.prevHist / (1 - mSignal) + prevMacdSignal - B) / A;

  candle.macdLimit = utils.math.num(price);
}

export default setCandleMacdLimit;
