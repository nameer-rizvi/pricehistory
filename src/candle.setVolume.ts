// import { Option, DataPoint, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleVolume(
//   option: Option,
//   curr: DataPoint,
//   candle: Candle,
//   ctx: Context,
// ) {
//   const volume = option.volume && curr[option.volume];

//   if (!simpul.isNumber(volume)) return;

//   candle.volume = volume;

//   if (candle.priceMean !== undefined) {
//     candle.volumeValue = Math.round(volume * candle.priceMean);
//   } else if (candle.priceClose !== undefined) {
//     candle.volumeValue = Math.round(volume * candle.priceClose);
//   }

//   if (
//     option.obv !== true ||
//     candle.priceOpen === undefined ||
//     candle.priceClose === undefined
//   )
//     return;

//   if (candle.priceClose > candle.priceOpen) {
//     ctx.obv += candle.volume;
//     ctx.obvValue += candle.volumeValue || 0;
//   } else if (candle.priceClose < candle.priceOpen) {
//     ctx.obv -= candle.volume;
//     ctx.obvValue -= candle.volumeValue || 0;
//   }

//   candle.obv = ctx.obv;

//   candle.obvValue = ctx.obvValue;
// }

// export default setCandleVolume;
