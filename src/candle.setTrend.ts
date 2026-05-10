import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";
import { trendKeys } from "./keys.js";

function setCandleTrend(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (opt.trend !== true) return;

  for (const key in candle) {
    const value = candle[key];

    if (value === undefined || typeof value !== "number") continue;

    for (const trendKey of trendKeys) {
      if (!key.startsWith(trendKey)) continue;

      const prev = ctx.trend[key];

      const symbol = utilN.math.change.symbol(prev?.[0], value);

      const direction = symbol?.[0] ?? 0;

      const startAt = direction !== prev?.[1] ? candle.index : prev[2];

      const length = direction !== prev?.[1] ? 1 : prev[3] + 1;

      candle[`${key}Trend`] = symbol;

      candle[`${key}TrendStartAt`] = startAt;

      candle[`${key}TrendLength`] = length;

      ctx.trend[key] = [value, direction, startAt, length];

      break;
    }
  }
}

export default setCandleTrend;
