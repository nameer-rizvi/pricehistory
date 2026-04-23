// import { Option, Candle } from "./interfaces";
// import simpul from "simpul";

// const halvingDates = [
//   new Date("2009-01-03"), // genesis
//   new Date("2012-11-28"),
//   new Date("2016-07-09"),
//   new Date("2020-05-11"),
//   new Date("2024-04-19"),
// ];

// let lastHalvingDate = halvingDates[halvingDates.length - 1];

// const averageDuration =
//   (lastHalvingDate.getTime() - halvingDates[0].getTime()) /
//   (halvingDates.length - 1);

// while (lastHalvingDate < new Date()) {
//   halvingDates.push(new Date(lastHalvingDate.getTime() + averageDuration));
//   lastHalvingDate = halvingDates[halvingDates.length - 1];
// }

// const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

// function setCandleHalving(option: Option, candle: Candle) {
//   if (option.halving !== true || candle.date === undefined) return;

//   const t = candle.date.getTime();

//   if (t < halvingDates[0].getTime() || t > lastHalvingDate.getTime()) return;

//   let epoch = 0;

//   for (let i = 0; i < halvingDates.length - 1; i++) {
//     if (t >= halvingDates[i].getTime() && t < halvingDates[i + 1].getTime()) {
//       epoch = i;
//       break;
//     }
//   }

//   const halvingDate = halvingDates[epoch];

//   const elapsed = t - halvingDate.getTime();

//   const duration = halvingDates[epoch + 1].getTime() - halvingDate.getTime();

//   candle.halvingDate = halvingDate;

//   candle.halvingEpoch = epoch;

//   candle.halvingYear = Math.floor(elapsed / YEAR_MS) + 1;

//   candle.halvingProgress = simpul.math.num((elapsed / duration) * 100);
// }

// export default setCandleHalving;
