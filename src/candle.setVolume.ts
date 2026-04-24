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

  const priceForValue = candle.priceMean ?? candle.priceClose;

  if (utils.isNumber(priceForValue)) {
    candle.volumeValue = Math.round(volume * priceForValue);
  }

  if (
    opt.obv !== true ||
    !utils.isNumber(candle.priceOpen) ||
    !utils.isNumber(candle.priceClose)
  )
    return;

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
