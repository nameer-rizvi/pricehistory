// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleEma(option: Option, candle: Candle, ctx: Context) {
//   if (!simpul.isArray(option.ema)) return;

//   for (const period of option.ema) {
//     const winKey = `ema${period}`;

//     ctx.window[winKey] ??= [];

//     const win = ctx.window[winKey];

//     win.push(candle.priceClose!);

//     if (win.length > period) win.shift();

//     if (win.length < period) continue;

//     ctx.ema[period] ??= {};

//     if (ctx.ema[period].initialized !== true && win.length === period) {
//       const sma = simpul.math.mean(win)!;

//       candle[`ema${period}`] = simpul.math.num(sma);

//       ctx.ema[period].prev = sma;

//       ctx.ema[period].initialized = true;

//       continue;
//     }

//     const prevEma = ctx.ema[period].prev;

//     if (prevEma === undefined) continue;

//     const multiplier = 2 / (period + 1);

//     const ema = (candle.priceClose! - prevEma) * multiplier + prevEma;

//     candle[`ema${period}`] = simpul.math.num(ema);

//     ctx.ema[period].prev = ema;
//   }
// }

// export default setCandleEma;
