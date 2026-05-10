import {
  type NormalizedOption,
  type Candle,
  type NumberOrUndefined,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";

function setCandlePhase(opt: NormalizedOption, candle: Candle): void {
  if (opt.phase === false) return;

  const high = candle[
    `signalSma${opt.phase}PriceCloseToPriceHigh`
  ] as NumberOrUndefined;

  const low = candle[
    `signalSma${opt.phase}PriceCloseToPriceLow`
  ] as NumberOrUndefined;

  const green = candle[`sma${opt.phase}ColorGreen`] as NumberOrUndefined;

  const red = candle[`sma${opt.phase}ColorRed`] as NumberOrUndefined;

  if (
    high === undefined ||
    low === undefined ||
    green === undefined ||
    red === undefined
  )
    return;

  const phaseDistribution = utilN.math.num(high * (green / 10));

  const phaseAccumulation = utilN.math.num(-low * (red / 10));

  if (phaseDistribution === undefined || phaseAccumulation === undefined) {
    return;
  }

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
