import { type NormalizedOption, type Candle } from "./interfaces.js";

function setCandleAnchor(opt: NormalizedOption, candle: Candle): void {
  for (let i = 0; i < opt.anchor.length; i++) {
    candle[`anchor${opt.anchor[i]}`] = opt.anchor[i];
  }
}

export default setCandleAnchor;
