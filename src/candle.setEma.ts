import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleEma(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (candle.priceClose === undefined) return;

  for (const period of opt.ema) {
    const winKey = `ema${period}`;

    ctx.window[winKey] ??= [];

    ctx.window[winKey].push(candle.priceClose);

    if (ctx.window[winKey].length > period) ctx.window[winKey].shift();

    if (ctx.window[winKey].length < period) continue;

    ctx.ema[period] ??= {};

    if (ctx.ema[period].initialized !== true) {
      const sma = utils.math.mean(ctx.window[winKey]);

      if (sma === undefined) continue;

      candle[`ema${period}`] = utils.math.num(sma);

      ctx.ema[period].prev = sma;

      ctx.ema[period].initialized = true;

      delete ctx.window[winKey];

      continue;
    }

    if (ctx.ema[period].prev === undefined) continue;

    const multiplier = 2 / (period + 1);

    const ema =
      (candle.priceClose - ctx.ema[period].prev) * multiplier +
      ctx.ema[period].prev;

    candle[`ema${period}`] = utils.math.num(ema);

    ctx.ema[period].prev = ema;
  }
}

export default setCandleEma;
