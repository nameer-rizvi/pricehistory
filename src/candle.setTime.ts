import { type NormalizedOption, type Candle } from "./interfaces.js";

const PREMARKET_START = 4 * 60; // 4:00 AM
const REGULAR_START = 9 * 60 + 30; // 9:30 AM
const REGULAR_END = 16 * 60; // 4:00 PM
const POSTMARKET_END = 20 * 60; // 8:00 PM

// Cache formatter instances for performance in hot loop
const hourFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour12: false,
  hour: "2-digit",
});

const minuteFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour12: false,
  minute: "2-digit",
});

function setCandleTime(opt: NormalizedOption, candle: Candle): void {
  if (opt.time !== true || candle.date === undefined) return;

  candle.timeHour = candle.date.getHours();

  candle.timeHourQuarter = Math.floor(candle.date.getMinutes() / 15) + 1;

  candle.timeMinute = candle.date.getMinutes();

  const hours = parseInt(hourFormatter.format(candle.date));

  const minutes = parseInt(minuteFormatter.format(candle.date));

  const totalMinutes = hours * 60 + minutes;

  candle.timeIsPremarket =
    totalMinutes >= PREMARKET_START && totalMinutes < REGULAR_START;

  candle.timeIsIntraday =
    totalMinutes >= REGULAR_START && totalMinutes < REGULAR_END;

  candle.timeIsPostmarket =
    totalMinutes >= REGULAR_END && totalMinutes < POSTMARKET_END;

  candle.timeIsDark =
    candle.timeIsPremarket === false &&
    candle.timeIsIntraday === false &&
    candle.timeIsPostmarket === false;
}

export default setCandleTime;
