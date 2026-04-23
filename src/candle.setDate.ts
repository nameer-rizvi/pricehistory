// import { Option, DataPoint, Candle } from "./interfaces";

// function setCandleDate(option: Option, curr: DataPoint, candle: Candle) {
//   if (option.datetime === undefined) return;

//   const date = new Date(curr[option.datetime]);

//   candle.date = date;

//   candle.dateString = date.toLocaleString();

//   if (option.date !== true) return;

//   candle.dateYear = date.getFullYear();

//   candle.dateQuarter = Math.floor((date.getMonth() + 3) / 3);

//   candle.dateMonth = date.getMonth() + 1;

//   candle.dateMonthName = date.toLocaleString("default", { month: "long" });

//   candle.dateDate = date.getDate();

//   candle.dateWeekday = date.getDay() + 1;

//   candle.dateWeekdayName = date.toLocaleDateString("default", {
//     weekday: "long",
//   });
// }

// export default setCandleDate;
