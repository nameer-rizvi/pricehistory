// import { Option, DataPoint, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandlePrice(
//   option: Option,
//   curr: DataPoint,
//   candle: Candle,
//   ctx: Context,
// ) {
//   const open = option.open && curr[option.open];

//   const high = option.high && curr[option.high];

//   const low = option.low && curr[option.low];

//   const close = option.close && curr[option.close];

//   if (simpul.isNumber(open)) candle.priceOpen = open;

//   if (simpul.isNumber(high)) candle.priceHigh = high;

//   if (simpul.isNumber(low)) candle.priceLow = low;

//   if (simpul.isNumber(close)) candle.priceClose = close;

//   const prevClose = ctx.prevClose; // leverage or regular

//   if (option.leverage !== undefined && simpul.isNumber(open)) {
//     const prevClose2 = ctx.prevClose2; // regular

//     const levOpen = calcLeverage(option.leverage, prevClose2, open, prevClose);

//     candle.priceOpen = levOpen;

//     if (simpul.isNumber(high)) {
//       candle.priceHigh = calcLeverage(option.leverage, open, high, levOpen);
//     }

//     if (simpul.isNumber(low)) {
//       candle.priceLow = calcLeverage(option.leverage, open, low, levOpen);
//     }

//     if (simpul.isNumber(close)) {
//       const levClose = calcLeverage(option.leverage, open, close, levOpen);
//       if (levClose !== undefined) candle.priceClose = levClose;
//     }
//   }

//   if (option.price !== true) return;

//   candle.priceMean = simpul.math.mean(
//     candle.priceOpen,
//     candle.priceHigh,
//     candle.priceLow,
//     candle.priceClose,
//   );

//   candle.priceChange = simpul.math.change.percent(prevClose, candle.priceClose);

//   candle.priceChangePremarket = simpul.math.change.percent(
//     prevClose,
//     candle.priceOpen,
//   );

//   candle.priceChangeIntraday = simpul.math.change.percent(
//     candle.priceOpen,
//     candle.priceClose,
//   );

//   candle.priceChangeCumulative = simpul.math.change.percent(
//     option.basePrice,
//     candle.priceClose,
//   );

//   candle.priceRange = simpul.math.change.num(candle.priceLow, candle.priceHigh);

//   candle.priceRangeDiff = simpul.math.change.percent(
//     candle.priceLow,
//     candle.priceHigh,
//   );

//   candle.priceRangeMean = simpul.math.mean(candle.priceLow, candle.priceHigh);
// }

// function calcLeverage(
//   lev: number,
//   prev?: number,
//   curr?: number,
//   mark?: number,
// ): number | undefined {
//   const change = (simpul.math.change.percent(prev, curr)! / 100) * lev;
//   return simpul.math.num(mark! * (1 + change))!;
// }

// export default setCandlePrice;
