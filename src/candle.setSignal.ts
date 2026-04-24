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
  for (const [anchor, ...compares] of opt.signal) {
    for (const compare of compares) {
      const key = `signal${utils.capitalize(anchor)}To${utils.capitalize(
        compare,
      )}`;

      candle[key] = utils.math.change.percent(candle[anchor], candle[compare]);

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
