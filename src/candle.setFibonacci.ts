import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

const LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1] as const;

const KEYS = [
  "fibonacci0",
  "fibonacci236",
  "fibonacci382",
  "fibonacci5",
  "fibonacci618",
  "fibonacci786",
  "fibonacci1",
] as const;

function setCandleFibonacci(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (
    opt.fibonacci !== true ||
    candle.priceHigh === undefined ||
    candle.priceLow === undefined ||
    candle.priceClose === undefined
  )
    return;

  if (ctx.fib.high === undefined || candle.priceHigh > ctx.fib.high) {
    ctx.fib.high = candle.priceHigh;
  }

  if (ctx.fib.low === undefined || candle.priceLow < ctx.fib.low) {
    ctx.fib.low = candle.priceLow;
  }

  const range = ctx.fib.high - ctx.fib.low;

  if (range === 0) return;

  for (const [i, level] of LEVELS.entries()) {
    candle[KEYS[i]] = utils.math.num(ctx.fib.high - level * range);
  }
}

export default setCandleFibonacci;
