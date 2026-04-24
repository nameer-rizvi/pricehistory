import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";
import { smaKeys } from "./keys.js";
import setCandleVwap from "./candle.setVwap.js";
import setCandleColor from "./candle.setColor.js";

function setCandleSma(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  for (const period of opt.sma) {
    for (const smaKey of smaKeys) {
      const value = candle[smaKey];

      if (value === undefined) continue;

      const winKey = `sma${period}${smaKey}`;

      ctx.window[winKey] ??= [];

      ctx.window[winKey].push(value as number);

      if (ctx.window[winKey].length > period) ctx.window[winKey].shift();

      candle[`sma${period}${utils.capitalize(smaKey)}`] = utils.math.mean(
        ctx.window[winKey],
      );
    }

    setCandleVwap(opt, candle, ctx, period);

    setCandleColor(opt, candle, ctx, period);
  }
}

export default setCandleSma;
