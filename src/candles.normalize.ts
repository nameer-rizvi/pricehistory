// import { Option, Candle } from "./interfaces";
// import simpul from "simpul";

// function normalizeCandles(option: Option, candles: Candle[]) {
//   if (option.normalize === undefined) return;

//   for (const candle of candles) {
//     for (const key of option.normalize) {
//       candle[`${key}N`] = candle[key];
//     }
//   }

//   for (const key of option.normalize) {
//     simpul.rescale(candles, `${key}N`, [0, 100]);
//   }
// }

// export default normalizeCandles;
