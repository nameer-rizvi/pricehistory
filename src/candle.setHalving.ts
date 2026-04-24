import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

const halvingDates = [
  new Date("2009-01-03"), // genesis
  new Date("2012-11-28"),
  new Date("2016-07-09"),
  new Date("2020-05-11"),
  new Date("2024-04-19"),
];

const averageDuration =
  (halvingDates[halvingDates.length - 1].getTime() -
    halvingDates[0].getTime()) /
  (halvingDates.length - 1);

const now = Date.now();

while (halvingDates[halvingDates.length - 1].getTime() < now) {
  halvingDates.push(
    new Date(halvingDates[halvingDates.length - 1].getTime() + averageDuration),
  );
}

// Cache timestamps for fast comparison in hot loop

const halvingTimestamps = halvingDates.map((d) => d.getTime());

const firstTimestamp = halvingTimestamps[0];

const lastTimestamp = halvingTimestamps[halvingTimestamps.length - 1];

function setCandleHalving(opt: NormalizedOption, candle: Candle): void {
  if (opt.halving !== true || candle.date === undefined) return;

  const t = candle.date.getTime();

  if (t < firstTimestamp || t > lastTimestamp) return;

  let epoch = 0;

  for (let i = 0; i < halvingTimestamps.length - 1; i++) {
    if (t >= halvingTimestamps[i] && t < halvingTimestamps[i + 1]) {
      epoch = i;
      break;
    }
  }

  const halvingStart = halvingTimestamps[epoch];

  const elapsed = t - halvingStart;

  const duration = halvingTimestamps[epoch + 1] - halvingStart;

  candle.halvingDate = halvingDates[epoch];

  candle.halvingEpoch = epoch;

  candle.halvingYear = Math.floor(elapsed / utils.date.MS_PER_YEAR) + 1;

  candle.halvingProgress = utils.math.num((elapsed / duration) * 100);
}

export default setCandleHalving;
