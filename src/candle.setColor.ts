// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleColor(
//   option: Option,
//   candle: Candle,
//   ctx: Context,
//   period?: number,
// ) {
//   if (
//     option.color !== true ||
//     candle.priceClose === undefined ||
//     candle.priceOpen === undefined
//   )
//     return;

//   const color =
//     candle.priceClose > candle.priceOpen
//       ? "green"
//       : candle.priceClose < candle.priceOpen
//       ? "red"
//       : "gray";

//   const winKey = `color${period || ""}`;

//   ctx.color[winKey] ??= [];

//   const colorWin = ctx.color[winKey];

//   colorWin.push([color, candle.volume]);

//   if (period !== undefined && colorWin.length > period) colorWin.shift();

//   const colorCount = { green: 0, red: 0, gray: 0, total: 0 };

//   const colorVolume = { green: 0, red: 0, gray: 0, total: 0 };

//   for (const item of colorWin) {
//     ++colorCount[item[0]];
//     ++colorCount.total;
//     if (item[1] !== undefined) {
//       colorVolume[item[0]] += item[1];
//       colorVolume.total += item[1];
//     }
//   }

//   if (period !== undefined) {
//     candle[`sma${period}ColorGreen`] = simpul.math.percent(
//       colorCount.green,
//       colorCount.total,
//     );

//     candle[`sma${period}ColorRed`] = simpul.math.percent(
//       colorCount.red,
//       colorCount.total,
//     );

//     candle[`sma${period}ColorGray`] = simpul.math.percent(
//       colorCount.gray,
//       colorCount.total,
//     );

//     candle[`sma${period}ColorVolumeGreen`] = simpul.math.percent(
//       colorVolume.green,
//       colorVolume.total,
//     );

//     candle[`sma${period}ColorVolumeRed`] = simpul.math.percent(
//       colorVolume.red,
//       colorVolume.total,
//     );

//     candle[`sma${period}ColorVolumeGray`] = simpul.math.percent(
//       colorVolume.gray,
//       colorVolume.total,
//     );
//   } else {
//     candle.color = color;

//     candle.colorGreen = simpul.math.percent(colorCount.green, colorCount.total);

//     candle.colorRed = simpul.math.percent(colorCount.red, colorCount.total);

//     candle.colorGray = simpul.math.percent(colorCount.gray, colorCount.total);

//     candle.colorVolumeGreen = simpul.math.percent(
//       colorVolume.green,
//       colorVolume.total,
//     );

//     candle.colorVolumeRed = simpul.math.percent(
//       colorVolume.red,
//       colorVolume.total,
//     );

//     candle.colorVolumeGray = simpul.math.percent(
//       colorVolume.gray,
//       colorVolume.total,
//     );
//   }
// }

// export default setCandleColor;
