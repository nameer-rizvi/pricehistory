import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";

function setCandleSignal(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  for (const [anchor, ...keys] of opt.signal) {
    for (const k of keys) {
      const key = `signal${utilN.capitalize(anchor)}To${utilN.capitalize(k)}`;

      candle[key] = utilN.math.change.percent(candle[anchor], candle[k]);

      for (const period of opt.sma) {
        const winKey = `signal${period}${key}`;

        ctx.window[winKey] ??= [];

        ctx.window[winKey].push(candle[key] as number);

        if (ctx.window[winKey].length > period) ctx.window[winKey].shift();

        candle[`sma${period}${utilN.capitalize(key)}`] = utilN.math.mean(
          ctx.window[winKey],
        );
      }
    }
  }
}

export default setCandleSignal;
