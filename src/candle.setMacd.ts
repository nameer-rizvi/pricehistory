// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleMacd(option: Option, candle: Candle, ctx: Context) {
//   if (!(simpul.isArray(option.macd) && option.macd.length === 3)) return;

//   const fast = candle[`ema${option.macd[0]}`];

//   const slow = candle[`ema${option.macd[1]}`];

//   if (fast === undefined || slow === undefined) return;

//   const macdLine = fast - slow;

//   candle.macd = simpul.math.num(macdLine);

//   const signal = option.macd[2];

//   const winKey = `macd${signal}`;

//   ctx.window[winKey] ??= [];

//   const sigWin = ctx.window[winKey];

//   sigWin.push(macdLine);

//   if (sigWin.length > signal) sigWin.shift();

//   if (sigWin.length < signal) return;

//   let signalLine: number | null = null;

//   if (ctx.macd.initialized !== true && sigWin.length === signal) {
//     const sma = simpul.math.mean(sigWin)!;

//     ctx.macd.prev = sma;

//     ctx.macd.initialized = true;

//     candle.macdSignal = simpul.math.num(sma);

//     signalLine = sma;
//   } else {
//     const prev = ctx.macd.prev;

//     if (prev === undefined) return;

//     const multiplier = 2 / (signal + 1);

//     const emaSignal = (macdLine - prev) * multiplier + prev;

//     ctx.macd.prev = emaSignal;

//     candle.macdSignal = simpul.math.num(emaSignal);

//     signalLine = emaSignal;
//   }

//   if (signalLine !== null) {
//     candle.macdHist = simpul.math.num(macdLine - signalLine);
//   }
// }

// export default setCandleMacd;
