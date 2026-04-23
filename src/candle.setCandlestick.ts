// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleCandlestick(option: Option, candle: Candle, ctx: Context) {
//   if (
//     option.candlestick !== true ||
//     candle.priceOpen === undefined ||
//     candle.priceHigh === undefined ||
//     candle.priceLow === undefined ||
//     candle.priceClose === undefined
//   )
//     return;

//   const wickTop = candle.priceHigh;

//   const bodyTop = Math.max(candle.priceOpen, candle.priceClose);

//   const bodyBottom = Math.min(candle.priceOpen, candle.priceClose);

//   const wickBottom = candle.priceLow;

//   const size = simpul.math.change.num(wickBottom, wickTop);

//   const upper = simpul.math.change.num(bodyTop, wickTop);

//   const body = simpul.math.change.num(bodyBottom, bodyTop);

//   const lower = simpul.math.change.num(wickBottom, bodyBottom);

//   candle.candlestickTop = option.gap === "body" ? bodyTop : wickTop;

//   candle.candlestickBottom = option.gap === "body" ? bodyBottom : wickBottom;

//   candle.candlestickSize = size;

//   candle.candlestickUpper = simpul.math.percent(upper, size);

//   candle.candlestickBody = simpul.math.percent(body, size);

//   candle.candlestickLower = simpul.math.percent(lower, size);

//   if (ctx.prevTopBottom.length === 2) {
//     candle.candlestickIsGapUp = ctx.prevTopBottom[0] < candle.candlestickBottom;

//     candle.candlestickIsGapDown = ctx.prevTopBottom[1] > candle.candlestickTop;

//     if (candle.candlestickIsGapUp) {
//       candle.candlestickGapSize = simpul.math.change.percent(
//         ctx.prevTopBottom[0],
//         candle.candlestickBottom,
//       );
//       candle.candlestickGapTarget = ctx.prevTopBottom[0];
//     } else if (candle.candlestickIsGapDown) {
//       candle.candlestickGapSize = simpul.math.change.percent(
//         candle.candlestickTop,
//         ctx.prevTopBottom[1],
//       );
//       candle.candlestickGapTarget = ctx.prevTopBottom[1];
//     } else {
//       candle.candlestickGapSize = null;
//       candle.candlestickGapTarget = null;
//     }
//   }

//   candle.candlestickIsBullish = candle.priceClose > candle.priceOpen;

//   candle.candlestickIsBearish = candle.priceClose < candle.priceOpen;

//   candle.candlestickIsNeutral = candle.priceClose === candle.priceOpen;

//   candle.candlestickIsHammer = candle.candlestickLower! >= 50;

//   candle.candlestickIsHammerGreen =
//     candle.candlestickIsHammer && candle.candlestickIsBullish;

//   candle.candlestickIsInvertedHammer = candle.candlestickUpper! >= 50;

//   candle.candlestickIsInvertedHammerRed =
//     candle.candlestickIsInvertedHammer && candle.candlestickIsBearish;

//   candle.candlestickIsMarubozu = candle.candlestickBody! >= 80;

//   candle.candlestickIsMarubozuGreen =
//     candle.candlestickIsMarubozu && candle.candlestickIsBullish;

//   candle.candlestickIsMarubozuRed =
//     candle.candlestickIsMarubozu && candle.candlestickIsBearish;

//   candle.isRejectionTop =
//     candle.candlestickUpper! > candle.candlestickLower! &&
//     candle.candlestickUpper! >= 15;

//   candle.isRejectionBottom =
//     candle.candlestickLower! > candle.candlestickUpper! &&
//     candle.candlestickLower! >= 15;

//   ctx.prevTopBottom = [candle.candlestickTop, candle.candlestickBottom];
// }

// export default setCandleCandlestick;
