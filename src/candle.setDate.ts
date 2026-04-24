import {
  type NormalizedOption,
  type DataPoint,
  type Candle,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleDate(
  opt: NormalizedOption,
  curr: DataPoint,
  candle: Candle,
): void {
  const raw = curr[opt.datetime];

  if (raw === undefined) return;

  const date = new Date(raw);

  candle.date = date;

  candle.dateString = date.toLocaleString();

  if (opt.date !== true) return;

  candle.dateYear = date.getFullYear();

  candle.dateQuarter = Math.floor((date.getMonth() + 3) / 3);

  candle.dateMonth = date.getMonth() + 1;

  candle.dateMonthName = utils.date.getMonth(date);

  candle.dateDate = date.getDate();

  candle.dateWeekday = date.getDay() + 1;

  candle.dateWeekdayName = utils.date.getWeekday(date);
}

export default setCandleDate;
