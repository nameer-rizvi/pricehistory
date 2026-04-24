import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandlePriceLimit(opt: NormalizedOption, candle: Candle): void {
  if (opt.limit !== true) return;

  candle.priceLimit = function makePriceLimit(limit, threshold = 0) {
    if (!utils.isNumber(candle.priceOpen)) return;

    let priceLimit = candle.priceOpen + candle.priceOpen * (limit / 100);

    priceLimit = utils.math.num(priceLimit)!;

    const isHit =
      utils.isNumber(candle.priceHigh) &&
      utils.isNumber(candle.priceLow) &&
      priceLimit + threshold <= candle.priceHigh &&
      priceLimit - threshold >= candle.priceLow;

    return { priceLimit, isHit };
  };
}

export default setCandlePriceLimit;
