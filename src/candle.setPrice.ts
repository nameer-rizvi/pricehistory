import {
  type NormalizedOption,
  type DataPoint,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandlePrice(
  opt: NormalizedOption,
  curr: DataPoint,
  candle: Candle,
  ctx: Context,
): void {
  const open = curr[opt.open];

  const high = curr[opt.high];

  const low = curr[opt.low];

  const close = curr[opt.close];

  if (utils.isNumberValid(open)) candle.priceOpen = open;

  if (utils.isNumberValid(high)) candle.priceHigh = high;

  if (utils.isNumberValid(low)) candle.priceLow = low;

  if (utils.isNumberValid(close)) candle.priceClose = close;

  const prevClose = ctx.prevClose;

  if (opt.leverage !== undefined && utils.isNumberValid(open)) {
    const levOpen = calcLeverage(opt.leverage, ctx.prevClose2, open, prevClose);

    candle.priceOpen = levOpen;

    if (utils.isNumberValid(high)) {
      candle.priceHigh = calcLeverage(opt.leverage, open, high, levOpen);
    }

    if (utils.isNumberValid(low)) {
      candle.priceLow = calcLeverage(opt.leverage, open, low, levOpen);
    }

    if (utils.isNumberValid(close)) {
      const levClose = calcLeverage(opt.leverage, open, close, levOpen);
      if (levClose !== undefined) candle.priceClose = levClose;
    }
  }

  if (opt.price !== true) return;

  candle.priceMean = utils.math.mean(
    candle.priceOpen,
    candle.priceHigh,
    candle.priceLow,
    candle.priceClose,
  );

  candle.priceChange = utils.math.change.percent(prevClose, candle.priceClose);

  candle.priceChangePremarket = utils.math.change.percent(
    prevClose,
    candle.priceOpen,
  );

  candle.priceChangeIntraday = utils.math.change.percent(
    candle.priceOpen,
    candle.priceClose,
  );

  candle.priceChangeCumulative = utils.math.change.percent(
    opt.basePrice,
    candle.priceClose,
  );

  candle.priceRange = utils.math.change.num(candle.priceLow, candle.priceHigh);

  candle.priceRangeDiff = utils.math.change.percent(
    candle.priceLow,
    candle.priceHigh,
  );

  candle.priceRangeMean = utils.math.mean(candle.priceLow, candle.priceHigh);
}

function calcLeverage(
  lev: number,
  prev?: number,
  curr?: number,
  mark?: number,
): number | undefined {
  if (
    !utils.isNumberValid(mark) ||
    !utils.isNumberValid(prev) ||
    !utils.isNumberValid(curr)
  )
    return;
  const change = (utils.math.change.percent(prev, curr)! / 100) * lev;
  return utils.math.num(mark * (1 + change));
}

export default setCandlePrice;
