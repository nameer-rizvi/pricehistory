import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

function normalizeCandles(opt: NormalizedOption, candles: Candle[]): void {
  for (const key of opt.normalize) {
    utils.rescale(candles, `${key}N`, [0, 100]);
  }
}

export default normalizeCandles;
