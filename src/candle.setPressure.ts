import {
  type NormalizedOption,
  type Candle,
  type NumberOrUndefined,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandlePressure(opt: NormalizedOption, candle: Candle): void {
  if (opt.pressure === false) return;

  const priceRange =
    candle.priceRange ??
    utils.math.change.num(candle.priceLow, candle.priceHigh);

  const priceRangeDiff =
    candle.priceRangeDiff ??
    utils.math.change.percent(candle.priceLow, candle.priceHigh);

  if (priceRange === undefined || priceRangeDiff === undefined) return;

  const candlestickUpper =
    candle.candlestickUpper ??
    (candle.priceHigh !== undefined &&
    candle.priceOpen !== undefined &&
    candle.priceClose !== undefined
      ? utils.math.percent(
          candle.priceHigh - Math.max(candle.priceOpen, candle.priceClose),
          priceRange,
        )
      : undefined);

  const candlestickLower =
    candle.candlestickLower ??
    (candle.priceLow !== undefined &&
    candle.priceOpen !== undefined &&
    candle.priceClose !== undefined
      ? utils.math.percent(
          Math.min(candle.priceOpen, candle.priceClose) - candle.priceLow,
          priceRange,
        )
      : undefined);

  if (candlestickUpper === undefined || candlestickLower === undefined) return;

  const high = candle[
    `signalSma${opt.pressure}PriceCloseToPriceHigh`
  ] as NumberOrUndefined;

  const low = candle[
    `signalSma${opt.pressure}PriceCloseToPriceLow`
  ] as NumberOrUndefined;

  const green = candle[`sma${opt.pressure}ColorGreen`] as NumberOrUndefined;

  const red = candle[`sma${opt.pressure}ColorRed`] as NumberOrUndefined;

  if (
    high === undefined ||
    low === undefined ||
    green === undefined ||
    red === undefined
  ) {
    return;
  }

  candle.pressureSelling = utils.math.num(
    priceRangeDiff * (candlestickUpper / 100) * high * green,
  );

  candle.pressureBuying = utils.math.num(
    priceRangeDiff * (candlestickLower / 100) * -low * red,
  );
}

export default setCandlePressure;
