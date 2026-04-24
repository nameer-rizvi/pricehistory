import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandlePriceLimit(opt: NormalizedOption, candle: Candle): void {
  if (opt.limit !== true) return;

  candle.priceLimit = function makePriceLimit(limit, threshold = 0) {
    if (candle.priceOpen === undefined) return;

    const priceLimit = utils.math.num(
      candle.priceOpen + candle.priceOpen * (limit / 100),
    );

    if (priceLimit === undefined) return;

    const isHit =
      candle.priceHigh !== undefined &&
      candle.priceLow !== undefined &&
      priceLimit + threshold <= candle.priceHigh &&
      priceLimit - threshold >= candle.priceLow;

    return { priceLimit, isHit };
  };
}

export default setCandlePriceLimit;
