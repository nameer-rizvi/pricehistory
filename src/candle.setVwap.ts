import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleVwap(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
  period?: number,
): void {
  if (opt.vwap !== true || candle.volume === undefined) return;

  const typicalPrice =
    utils.math.mean(candle.priceHigh, candle.priceLow, candle.priceClose) ??
    candle.priceClose;

  if (typicalPrice === undefined) return;

  if (period !== undefined) {
    const priceWinKey = `vwap${period}TypicalPrice`;

    const volWinKey = `vwap${period}Volume`;

    ctx.window[priceWinKey] ??= [];

    ctx.window[volWinKey] ??= [];

    ctx.window[priceWinKey].push(typicalPrice);

    ctx.window[volWinKey].push(candle.volume);

    if (ctx.window[priceWinKey].length > period) {
      ctx.window[priceWinKey].shift();
    }

    if (ctx.window[volWinKey].length > period) {
      ctx.window[volWinKey].shift();
    }

    let vwapPV = 0;

    let vwapVolume = 0;

    for (let i = 0; i < ctx.window[priceWinKey].length; i++) {
      vwapPV += ctx.window[priceWinKey][i] * ctx.window[volWinKey][i];
      vwapVolume += ctx.window[volWinKey][i];
    }

    candle[`sma${period}Vwap`] = utils.math.num(vwapPV / vwapVolume);
  } else {
    ctx.vwapPV += typicalPrice * candle.volume;

    ctx.vwapVolume += candle.volume;

    candle.vwap = utils.math.num(ctx.vwapPV / ctx.vwapVolume);
  }
}

export default setCandleVwap;
