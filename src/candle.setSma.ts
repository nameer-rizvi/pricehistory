// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";
// import { smaKeys } from "./keys";
// import setCandleVwap from "./candle.setVwap";
// import setCandleColor from "./candle.setColor";

// function setCandleSma(option: Option, candle: Candle, ctx: Context) {
//   if (!simpul.isArray(option.sma)) return;

//   for (const period of option.sma) {
//     for (const smaKey of smaKeys) {
//       if (!simpul.isNumber(candle[smaKey])) continue;

//       const winKey = `sma${period}${smaKey}`;

//       ctx.window[winKey] ??= [];

//       const win = ctx.window[winKey];

//       win.push(candle[smaKey]);

//       if (win.length > period) win.shift();

//       const smaKeyCap = simpul.capitalize(smaKey);

//       candle[`sma${period}${smaKeyCap}`] = simpul.math.mean(win);
//     }

//     setCandleVwap(option, candle, ctx, period);

//     setCandleColor(option, candle, ctx, period);
//   }
// }

// export default setCandleSma;
