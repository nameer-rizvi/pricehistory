import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandleMacdPivot(opt: NormalizedOption, candle: Candle): void {
  if (
    opt.macd === false ||
    opt.macdPivot === false ||
    candle.macdHist === undefined
  )
    return;

  const fast = opt.macd[0];

  const slow = opt.macd[1];

  const signal = opt.macd[2];

  const prevEmaFast = candle[`ema${fast}`] as number | undefined;

  const prevEmaSlow = candle[`ema${slow}`] as number | undefined;

  const prevMacdSignal = candle.macdSignal;

  const prevMacdHist = candle.macdHist;

  if (
    prevEmaFast === undefined ||
    prevEmaSlow === undefined ||
    prevMacdSignal === undefined
  )
    return;

  const mFast = 2 / (fast + 1);

  const mSlow = 2 / (slow + 1);

  const mSignal = 2 / (signal + 1);

  const A = mFast - mSlow;

  const B = prevEmaFast * (1 - mFast) - prevEmaSlow * (1 - mSlow);

  const price = (prevMacdHist / (1 - mSignal) + prevMacdSignal - B) / A;

  candle.macdPivot = utils.math.num(price);
}

export default setCandleMacdPivot;
