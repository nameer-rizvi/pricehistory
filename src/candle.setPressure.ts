// import { Option, Candle } from "./interfaces";
// import simpul from "simpul";

// function setCandlePressure(option: Option, candle: Candle) {
//   if (!simpul.isNumber(option.pressure)) return;

//   const priceRange =
//     candle.priceRange !== undefined
//       ? candle.priceRange
//       : simpul.math.change.num(candle.priceLow, candle.priceHigh);

//   const priceRangeDiff =
//     candle.priceRangeDiff !== undefined
//       ? candle.priceRangeDiff
//       : simpul.math.change.percent(candle.priceLow, candle.priceHigh);

//   const candlestickUpper =
//     candle.candlestickUpper !== undefined
//       ? candle.candlestickUpper
//       : simpul.math.percent(
//           candle.priceHigh! - Math.max(candle.priceOpen!, candle.priceClose!),
//           priceRange,
//         );

//   const candlestickLower =
//     candle.candlestickLower !== undefined
//       ? candle.candlestickLower
//       : simpul.math.percent(
//           Math.min(candle.priceOpen!, candle.priceClose!) - candle.priceLow!,
//           priceRange,
//         );

//   const high = candle[`signalSma${option.pressure}PriceCloseToPriceHigh`];

//   const low = candle[`signalSma${option.pressure}PriceCloseToPriceLow`];

//   const green = candle[`sma${option.pressure}ColorGreen`];

//   const red = candle[`sma${option.pressure}ColorRed`];

//   candle.pressureSelling = simpul.math.num(
//     priceRangeDiff! * (candlestickUpper! / 100) * high * green,
//   );

//   candle.pressureBuying = simpul.math.num(
//     priceRangeDiff! * (candlestickLower! / 100) * -low * red,
//   );
// }

// export default setCandlePressure;
