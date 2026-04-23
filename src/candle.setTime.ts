// import { Option, Candle } from "./interfaces";

// const premarketStart = 4 * 60; // 4:00 AM

// const regularStart = 9 * 60 + 30; // 9:30 AM

// const regularEnd = 16 * 60; // 4:00 PM

// const postmarketEnd = 20 * 60; // 8:00 PM

// const options = {
//   timeZone: "America/New_York",
//   hour12: false,
// };

// function setCandleTime(option: Option, candle: Candle) {
//   if (option.time !== true || candle.date === undefined) return;

//   candle.timeHour = candle.date.getHours();

//   candle.timeHourQuarter = Math.floor(candle.date.getMinutes() / 15) + 1;

//   candle.timeMinute = candle.date.getMinutes();

//   const hours = parseInt(
//     candle.date.toLocaleString("en-US", { ...options, hour: "2-digit" }),
//   );

//   const minutes = parseInt(
//     candle.date.toLocaleString("en-US", { ...options, minute: "2-digit" }),
//   );

//   const totalMinutes = hours * 60 + minutes;

//   candle.timeIsPremarket =
//     totalMinutes >= premarketStart && totalMinutes < regularStart;

//   candle.timeIsIntraday =
//     totalMinutes >= regularStart && totalMinutes < regularEnd;

//   candle.timeIsPostmarket =
//     totalMinutes >= regularEnd && totalMinutes <= postmarketEnd;

//   candle.timeIsDark =
//     !candle.timeIsPremarket &&
//     !candle.timeIsIntraday &&
//     !candle.timeIsPostmarket;
// }

// export default setCandleTime;
