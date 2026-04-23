// import { Option, Candle, Context } from "./interfaces";
// import simpul from "simpul";

// function setCandleSignal(option: Option, candle: Candle, ctx: Context) {
//   for (const [anchor, ...compares] of option.signal || []) {
//     for (const compare of compares) {
//       const key =
//         "signal" +
//         simpul.capitalize(anchor) +
//         "To" +
//         simpul.capitalize(compare);

//       candle[key] = simpul.math.change.percent(candle[anchor], candle[compare]);

//       if (!simpul.isArray(option.sma)) continue;

//       for (const period of option.sma) {
//         const winKey = `signal${period}${key}`;

//         ctx.window[winKey] ??= [];

//         const win = ctx.window[winKey];

//         win.push(candle[key]);

//         if (win.length > period) win.shift();

//         const keyCap = simpul.capitalize(key);

//         candle[`sma${period}${keyCap}`] = simpul.math.mean(win);
//       }
//     }
//   }
// }

// export default setCandleSignal;
