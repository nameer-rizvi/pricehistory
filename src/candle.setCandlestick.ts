import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleCandlestick(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (
    opt.candlestick !== true ||
    candle.priceOpen === undefined ||
    candle.priceHigh === undefined ||
    candle.priceLow === undefined ||
    candle.priceClose === undefined
  ) {
    return;
  }

  const wickTop = candle.priceHigh;

  const bodyTop = Math.max(candle.priceOpen, candle.priceClose);

  const bodyBottom = Math.min(candle.priceOpen, candle.priceClose);

  const wickBottom = candle.priceLow;

  const size = candle.priceRange ?? utils.math.change.num(wickBottom, wickTop);

  const upper = utils.math.change.num(bodyTop, wickTop);

  const body = utils.math.change.num(bodyBottom, bodyTop);

  const lower = utils.math.change.num(wickBottom, bodyBottom);

  const isGapBody = opt.gap === "body";

  candle.candlestickTop = isGapBody ? bodyTop : wickTop;

  candle.candlestickBottom = isGapBody ? bodyBottom : wickBottom;

  candle.candlestickSize = size;

  candle.candlestickUpper = utils.math.percent(upper, size);

  candle.candlestickBody = utils.math.percent(body, size);

  candle.candlestickLower = utils.math.percent(lower, size);

  if (ctx.prevTopBottom.length === 2) {
    candle.candlestickIsGapUp = ctx.prevTopBottom[0] < candle.candlestickBottom;

    candle.candlestickIsGapDown = ctx.prevTopBottom[1] > candle.candlestickTop;

    if (candle.candlestickIsGapUp) {
      candle.candlestickGapSize = utils.math.change.percent(
        ctx.prevTopBottom[0],
        candle.candlestickBottom,
      );
      candle.candlestickGapTarget = ctx.prevTopBottom[0];
    } else if (candle.candlestickIsGapDown) {
      candle.candlestickGapSize = utils.math.change.percent(
        candle.candlestickTop,
        ctx.prevTopBottom[1],
      );
      candle.candlestickGapTarget = ctx.prevTopBottom[1];
    } else {
      candle.candlestickGapSize = null;
      candle.candlestickGapTarget = null;
    }
  }

  candle.candlestickIsBullish = candle.priceClose > candle.priceOpen;

  candle.candlestickIsBearish = candle.priceClose < candle.priceOpen;

  candle.candlestickIsNeutral = candle.priceClose === candle.priceOpen;

  const candlestickUpper = candle.candlestickUpper ?? 0;

  const candlestickLower = candle.candlestickLower ?? 0;

  const candlestickBody = candle.candlestickBody ?? 0;

  candle.candlestickIsHammer =
    candlestickLower >= 50 && candlestickBody > candlestickUpper * 2;

  candle.candlestickIsHammerGreen =
    candle.candlestickIsHammer && candle.candlestickIsBullish;

  candle.candlestickIsInvertedHammer =
    candlestickUpper >= 50 && candlestickBody > candlestickLower * 2;

  candle.candlestickIsInvertedHammerRed =
    candle.candlestickIsInvertedHammer && candle.candlestickIsBearish;

  candle.candlestickIsMarubozu = candlestickBody >= 80;

  candle.candlestickIsMarubozuGreen =
    candle.candlestickIsMarubozu && candle.candlestickIsBullish;

  candle.candlestickIsMarubozuRed =
    candle.candlestickIsMarubozu && candle.candlestickIsBearish;

  candle.candlestickIsRejectionTop =
    candlestickUpper > candlestickLower * 2 && candlestickUpper >= 15;

  candle.candlestickIsRejectionBottom =
    candlestickLower > candlestickUpper * 2 && candlestickLower >= 15;

  ctx.prevTopBottom = [candle.candlestickTop, candle.candlestickBottom];
}

export default setCandleCandlestick;
