import { type NormalizedOption, type Candle } from "./interfaces.js";
import * as utils from "@nameer/utils";

function setCandlePhase(opt: NormalizedOption, candle: Candle): void {
  if (opt.phase === false) return;

  const high = candle[`signalSma${opt.phase}PriceCloseToPriceHigh`] as
    | number
    | undefined;

  const low = candle[`signalSma${opt.phase}PriceCloseToPriceLow`] as
    | number
    | undefined;

  const green = candle[`sma${opt.phase}ColorGreen`] as number | undefined;

  const red = candle[`sma${opt.phase}ColorRed`] as number | undefined;

  if (
    high === undefined ||
    low === undefined ||
    green === undefined ||
    red === undefined
  )
    return;

  const phaseDistribution = utils.math.num(high * (green / 10));

  const phaseAccumulation = utils.math.num(-low * (red / 10));

  if (phaseDistribution === undefined || phaseAccumulation === undefined)
    return;

  if (phaseDistribution > phaseAccumulation) {
    candle.phaseDistribution = phaseDistribution;
    candle.phaseAccumulation = 0;
  } else if (phaseAccumulation > phaseDistribution) {
    candle.phaseDistribution = 0;
    candle.phaseAccumulation = phaseAccumulation;
  } else {
    candle.phaseDistribution = phaseDistribution;
    candle.phaseAccumulation = phaseAccumulation;
  }
}

export default setCandlePhase;
