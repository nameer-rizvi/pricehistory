// import { Option, DataPoint } from "./interfaces";
// import simpul from "simpul";

// function setOptions(option: Option, series: DataPoint[]) {
//   Object.assign(option, {
//     datetime: "datetime",
//     open: "open",
//     high: "high",
//     low: "low",
//     close: "close",
//     volume: "volume",
//     ...option,
//   });

//   /*
//    * BASE PRICE
//    */

//   if (option.basePrice === undefined && option.open !== undefined) {
//     for (const curr of series) {
//       const open = curr[option.open];
//       if (simpul.isNumber(open)) {
//         option.basePrice = open;
//         break;
//       }
//     }
//   }

//   /*
//    * RSI
//    */

//   if (option.rsi === true) {
//     option.rsi = 14; // J. Welles Wilder's optimal setting
//   }

//   /*
//    * EMA
//    */

//   if (option.ema === true) {
//     option.ema = [5, 8, 13]; // The Fibonacci Trio
//   } else if (simpul.isArray(option.ema)) {
//     option.ema = option.ema.filter(simpul.isNumber);
//   } else {
//     option.ema = [];
//   }

//   /*
//    * MACD
//    */

//   if (option.macd === true) {
//     option.macd = [12, 26, 9]; // Fast, Slow, Signal
//   }

//   if (simpul.isArray(option.macd)) {
//     const macd = option.macd.filter(simpul.isNumber);
//     if (macd.length === 3) {
//       option.ema = [...new Set([...option.ema, macd[0], macd[1]])];
//     }
//   }

//   /*
//    * SMA
//    */

//   if (option.sma === true) {
//     option.sma = [10, 50]; // Personal preference
//   } else if (simpul.isArray(option.sma)) {
//     option.sma = option.sma.filter(simpul.isNumber);
//   } else {
//     option.sma = [];
//   }

//   /*
//    * SIGNAL
//    */

//   if (simpul.isArray(option.signal)) {
//     if (option.signal.every(simpul.isString)) option.signal = [option.signal];
//     option.signal = option.signal.filter(simpul.isArrayNonEmpty);
//   } else {
//     option.signal = [];
//   }

//   /*
//    * PHASE
//    */

//   if (option.phase === true) {
//     option.phase = 10; // Personal preference
//   }

//   if (simpul.isNumber(option.phase)) {
//     option.color = true;
//     if (!option.sma.includes(option.phase)) option.sma.push(option.phase);
//     const smaKey = `sma${option.phase}PriceClose`;
//     const isSignal = option.signal.some(([anchor, ...compares]) => {
//       return (
//         anchor === smaKey &&
//         compares.includes("priceHigh") &&
//         compares.includes("priceLow")
//       );
//     });
//     if (isSignal !== true) {
//       option.signal.push([smaKey, "priceHigh", "priceLow"]);
//     }
//   }

//   /*
//    * PRESSURE
//    */

//   if (option.pressure === true) {
//     option.pressure = 10; // Personal preference
//   }

//   if (simpul.isNumber(option.pressure)) {
//     option.color = true;
//     if (!option.sma.includes(option.pressure)) option.sma.push(option.pressure);
//     const smaKey = `sma${option.pressure}PriceClose`;
//     const isSignal = option.signal.some(([anchor, ...compares]) => {
//       return (
//         anchor === smaKey &&
//         compares.includes("priceHigh") &&
//         compares.includes("priceLow")
//       );
//     });
//     if (isSignal !== true) {
//       option.signal.push([smaKey, "priceHigh", "priceLow"]);
//     }
//   }

//   /*
//    * ANCHOR
//    */

//   if (option.anchor === true) {
//     option.anchor = [0, 50, 100]; // Personal preference
//   }

//   if (simpul.isArray(option.anchor)) {
//     option.anchor = option.anchor.filter(simpul.isNumber);
//   } else {
//     option.anchor = [];
//   }

//   /*
//    * NORMALIZE
//    */

//   if (simpul.isArray(option.normalize)) {
//     option.normalize = option.normalize.filter(simpul.isString);
//   } else {
//     option.normalize = [];
//   }

//   /*
//    * SORTING
//    */

//   option.ema.sort((a, b) => a - b);

//   option.sma.sort((a, b) => a - b);

//   option.anchor.sort((a, b) => a - b);
// }

// export default setOptions;
