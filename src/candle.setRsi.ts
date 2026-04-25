import {
  type NormalizedOption,
  type Candle,
  type Context,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleRsi(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
): void {
  if (
    opt.rsi === false ||
    candle.priceClose === undefined ||
    ctx.prevClose === undefined
  ) {
    return;
  }

  const period = opt.rsi;

  const change = candle.priceClose - ctx.prevClose;

  const gain = change > 0 ? change : 0;

  const loss = change < 0 ? -change : 0;

  const gainWinKey = `rsi${period}Gain`;

  const lossWinKey = `rsi${period}Loss`;

  ctx.window[gainWinKey] ??= [];

  ctx.window[lossWinKey] ??= [];

  ctx.window[gainWinKey].push(gain);

  ctx.window[lossWinKey].push(loss);

  if (ctx.window[gainWinKey].length > period) ctx.window[gainWinKey].shift();

  if (ctx.window[lossWinKey].length > period) ctx.window[lossWinKey].shift();

  if (ctx.window[gainWinKey].length < period) return;

  if (ctx.rsi.initialized !== true) {
    const avgGain = utils.math.mean(ctx.window[gainWinKey]);

    const avgLoss = utils.math.mean(ctx.window[lossWinKey]);

    if (avgGain === undefined || avgLoss === undefined) return;

    candle.rsi = utils.math.num(
      avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss),
    );

    candle.averageGain = avgGain;

    candle.averageLoss = avgLoss;

    ctx.rsi.initialized = true;

    ctx.rsi.prevAvgGain = avgGain;

    ctx.rsi.prevAvgLoss = avgLoss;

    delete ctx.window[gainWinKey];

    delete ctx.window[lossWinKey];

    return;
  }

  if (ctx.rsi.prevAvgGain === undefined || ctx.rsi.prevAvgLoss === undefined) {
    return;
  }

  const avgGain = (ctx.rsi.prevAvgGain * (period - 1) + gain) / period;

  const avgLoss = (ctx.rsi.prevAvgLoss * (period - 1) + loss) / period;

  const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

  candle.rsi = utils.math.num(rsi);

  candle.averageGain = utils.math.num(avgGain);

  candle.averageLoss = utils.math.num(avgLoss);

  ctx.rsi.prevAvgGain = avgGain;

  ctx.rsi.prevAvgLoss = avgLoss;
}

export default setCandleRsi;
