// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";
// import { trendKeys } from "./keys";

// function setCandleTrend(option: Option, candle: Candle, ctx: Context) {
//   if (option.trend !== true) return;

//   for (const key in candle) {
//     if (!simpul.isNumber(candle[key])) continue;

//     for (const trendKey of trendKeys) {
//       if (key.startsWith(trendKey)) {
//         const prev = ctx.trend[key] || [];

//         const curr = candle[key];

//         const symbol = simpul.math.change.symbol(prev[0], curr);

//         const direction = symbol?.[0] || 0;

//         const startAt = direction !== prev[1] ? candle.index : prev[2];

//         const length = direction !== prev[1] ? 1 : prev[3] + 1;

//         candle[`${key}Trend`] = symbol;

//         candle[`${key}TrendStartAt`] = startAt;

//         candle[`${key}TrendLength`] = length;

//         ctx.trend[key] = [curr, direction, startAt, length];

//         break;
//       }
//     }
//   }
// }

// export default setCandleTrend;
