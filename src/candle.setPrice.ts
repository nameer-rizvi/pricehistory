import {
  type NormalizedOption,
  type DataPoint,
  type Candle,
  type Context,
  type NumberOrUndefined,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";

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

  if (utilN.isNumber(open)) candle.priceOpen = open;

  if (utilN.isNumber(high)) candle.priceHigh = high;

  if (utilN.isNumber(low)) candle.priceLow = low;

  if (utilN.isNumber(close)) candle.priceClose = close;

  const prevClose = ctx.prevClose;

  if (opt.leverage !== undefined && utilN.isNumber(open)) {
    const levOpen = calcLeverage(opt.leverage, ctx.prevClose2, open, prevClose);

    candle.priceOpen = levOpen;

    if (utilN.isNumber(high)) {
      candle.priceHigh = calcLeverage(opt.leverage, open, high, levOpen);
    }

    if (utilN.isNumber(low)) {
      candle.priceLow = calcLeverage(opt.leverage, open, low, levOpen);
    }

    if (utilN.isNumber(close)) {
      const levClose = calcLeverage(opt.leverage, open, close, levOpen);
      if (levClose !== undefined) candle.priceClose = levClose;
    }
  }

  if (opt.price !== true) return;

  candle.priceMean = utilN.math.mean(
    candle.priceOpen,
    candle.priceHigh,
    candle.priceLow,
    candle.priceClose,
  );

  candle.priceChange = utilN.math.change.percent(prevClose, candle.priceClose);

  candle.priceChangePremarket = utilN.math.change.percent(
    prevClose,
    candle.priceOpen,
  );

  candle.priceChangeIntraday = utilN.math.change.percent(
    candle.priceOpen,
    candle.priceClose,
  );

  candle.priceChangeCumulative = utilN.math.change.percent(
    opt.basePrice,
    candle.priceClose,
  );

  candle.priceRange = utilN.math.change.num(candle.priceLow, candle.priceHigh);

  candle.priceRangeDiff = utilN.math.change.percent(
    candle.priceLow,
    candle.priceHigh,
  );

  candle.priceRangeMean = utilN.math.mean(candle.priceLow, candle.priceHigh);
}

function calcLeverage(
  lev: number,
  prev?: number,
  curr?: number,
  mark?: number,
): NumberOrUndefined {
  if (!utilN.isNumber(mark) || !utilN.isNumber(prev) || !utilN.isNumber(curr))
    return;
  const change = (utilN.math.change.percent(prev, curr)! / 100) * lev;
  return utilN.math.num(mark * (1 + change));
}

export default setCandlePrice;
