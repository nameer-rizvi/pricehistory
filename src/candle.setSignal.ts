import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleSignal(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  for (const [anchor, ...keys] of opt.signal) {
    for (const k of keys) {
      const key = `signal${utils.capitalize(anchor)}To${utils.capitalize(k)}`;

      candle[key] = utils.math.change.percent(candle[anchor], candle[k]);

      for (const period of opt.sma) {
        const winKey = `signal${period}${key}`;

        ctx.window[winKey] ??= [];

        ctx.window[winKey].push(candle[key] as number);

        if (ctx.window[winKey].length > period) ctx.window[winKey].shift();

        candle[`sma${period}${utils.capitalize(key)}`] = utils.math.mean(
          ctx.window[winKey],
        );
      }
    }
  }
}

export default setCandleSignal;
