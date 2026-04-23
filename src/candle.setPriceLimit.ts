// import { Option, Candle } from "./interfaces";
// import simpul from "simpul";

// function setCandlePriceLimit(option: Option, candle: Candle) {
//   if (option.limit !== true) return;

//   candle.priceLimit = function makePriceLimit(limit, threshold = 0) {
//     if (candle.priceOpen === undefined) return;

//     let priceLimit = candle.priceOpen + candle.priceOpen * (limit / 100);

//     priceLimit = simpul.math.num(priceLimit)!;

//     const isHit =
//       candle.priceHigh !== undefined &&
//       candle.priceLow !== undefined &&
//       priceLimit + threshold <= candle.priceHigh &&
//       priceLimit - threshold >= candle.priceLow;

//     return { priceLimit, isHit };
//   };
// }

// export default setCandlePriceLimit;
