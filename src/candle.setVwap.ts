// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleVwap(
//   option: Option,
//   candle: Candle,
//   ctx: Context,
//   period?: number,
// ) {
//   if (option.vwap !== true || candle.volume === undefined) return;

//   const typicalPrice =
//     simpul.math.mean(candle.priceHigh, candle.priceLow, candle.priceClose) ||
//     candle.priceClose;

//   if (typicalPrice === undefined) return;

//   if (period !== undefined) {
//     const priceWinKey = `vwap${period}TypicalPrice`;

//     const volWinKey = `vwap${period}Volume`;

//     ctx.window[priceWinKey] ??= [];

//     ctx.window[volWinKey] ??= [];

//     const priceWin = ctx.window[priceWinKey];

//     const volumeWin = ctx.window[volWinKey];

//     priceWin.push(typicalPrice);

//     volumeWin.push(candle.volume);

//     if (priceWin.length > period) priceWin.shift();

//     if (volumeWin.length > period) volumeWin.shift();

//     let vwapPV = 0;

//     let vwapVolume = 0;

//     for (let i = 0; i < priceWin.length; i++) {
//       vwapPV += priceWin[i] * volumeWin[i];
//       vwapVolume += volumeWin[i];
//     }

//     candle[`sma${period}Vwap`] = simpul.math.num(vwapPV / vwapVolume);
//   } else {
//     ctx.vwapPV += typicalPrice * candle.volume;

//     ctx.vwapVolume += candle.volume;

//     candle.vwap = simpul.math.num(ctx.vwapPV / ctx.vwapVolume);
//   }
// }

// export default setCandleVwap;
