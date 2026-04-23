// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleRsi(option: Option, candle: Candle, ctx: Context) {
//   if (
//     !simpul.isNumber(option.rsi) ||
//     candle.priceClose === undefined ||
//     ctx.prevClose === undefined
//   )
//     return;

//   const period = option.rsi;

//   const change = candle.priceClose - ctx.prevClose;

//   const gain = change > 0 ? change : 0;

//   const loss = change < 0 ? Math.abs(change) : 0;

//   const gainWinKey = `rsi${period}Gain`;

//   const lossWinKey = `rsi${period}Loss`;

//   ctx.window[gainWinKey] ??= [];

//   ctx.window[lossWinKey] ??= [];

//   const gainWin = ctx.window[gainWinKey];

//   const lossWin = ctx.window[lossWinKey];

//   gainWin.push(gain);

//   lossWin.push(loss);

//   if (gainWin.length > period) gainWin.shift();

//   if (lossWin.length > period) lossWin.shift();

//   if (gainWin.length < period) return;

//   if (ctx.rsi.initialized !== true && gainWin.length === period) {
//     const avgGain = simpul.math.mean(gainWin);

//     const avgLoss = simpul.math.mean(lossWin);

//     const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain! / avgLoss!);

//     candle.rsi = simpul.math.num(rsi);

//     candle.averageGain = avgGain;

//     candle.averageLoss = avgLoss;

//     ctx.rsi.initialized = true;

//     ctx.rsi.prevAvgGain = avgGain;

//     ctx.rsi.prevAvgLoss = avgLoss;

//     return;
//   }

//   const prevAvgGain = ctx.rsi.prevAvgGain;

//   const prevAvgLoss = ctx.rsi.prevAvgLoss;

//   const avgGain = (prevAvgGain! * (period - 1) + gain) / period;

//   const avgLoss = (prevAvgLoss! * (period - 1) + loss) / period;

//   const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

//   candle.rsi = simpul.math.num(rsi);

//   candle.averageGain = simpul.math.num(avgGain);

//   candle.averageLoss = simpul.math.num(avgLoss);

//   ctx.rsi.prevAvgGain = avgGain;

//   ctx.rsi.prevAvgLoss = avgLoss;
// }

// export default setCandleRsi;
