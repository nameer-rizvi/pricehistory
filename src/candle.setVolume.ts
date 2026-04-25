import {
  type NormalizedOption,
  type DataPoint,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleVolume(
  opt: NormalizedOption,
  curr: DataPoint,
  candle: Candle,
  ctx: Context,
): void {
  const volume = curr[opt.volume];

  if (!utils.isNumber(volume)) return;

  candle.volume = volume;

  const price = candle.priceMean ?? candle.priceClose;

  if (price !== undefined) {
    candle.volumeValue = Math.round(volume * price);
  }

  if (
    opt.obv !== true ||
    candle.priceOpen === undefined ||
    candle.priceClose === undefined
  ) {
    return;
  }

  const volumeValue = candle.volumeValue ?? 0;

  if (candle.priceClose > candle.priceOpen) {
    ctx.obv += volume;
    ctx.obvValue += volumeValue;
  } else if (candle.priceClose < candle.priceOpen) {
    ctx.obv -= volume;
    ctx.obvValue -= volumeValue;
  }

  candle.obv = ctx.obv;

  candle.obvValue = ctx.obvValue;
}

export default setCandleVolume;
