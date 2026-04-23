// import { Option, Candle } from "./interfaces";
// import simpul from "simpul";

// function setCandlePhase(option: Option, candle: Candle) {
//   if (!simpul.isNumber(option.phase)) return;

//   const high = candle[`signalSma${option.phase}PriceCloseToPriceHigh`];

//   const low = candle[`signalSma${option.phase}PriceCloseToPriceLow`];

//   const green = candle[`sma${option.phase}ColorGreen`];

//   const red = candle[`sma${option.phase}ColorRed`];

//   const phaseDistribution = simpul.math.num(high * (green / 10));

//   const phaseAccumulation = simpul.math.num(-low * (red / 10));

//   if (phaseDistribution! > phaseAccumulation!) {
//     candle.phaseDistribution = phaseDistribution;
//     candle.phaseAccumulation = 0;
//   } else if (phaseAccumulation! > phaseDistribution!) {
//     candle.phaseDistribution = 0;
//     candle.phaseAccumulation = phaseAccumulation;
//   } else {
//     candle.phaseDistribution = phaseDistribution;
//     candle.phaseAccumulation = phaseAccumulation;
//   }
// }

// export default setCandlePhase;
