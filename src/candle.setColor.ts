import {
  type NormalizedOption,
  type Candle,
  type Context,
  type Color,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";

function setCandleColor(
  opt: NormalizedOption,
  candle: Candle,
  ctx: Context,
  period?: number,
): void {
  if (
    opt.color !== true ||
    candle.priceClose === undefined ||
    candle.priceOpen === undefined
  ) {
    return;
  }

  const color: Color =
    candle.priceClose > candle.priceOpen
      ? "green"
      : candle.priceClose < candle.priceOpen
      ? "red"
      : "gray";

  const winKey = `color${period ?? ""}`;

  ctx.color[winKey] ??= [];

  ctx.color[winKey].push([color, candle.volume]);

  if (period !== undefined && ctx.color[winKey].length > period) {
    ctx.color[winKey].shift();
  }

  let greenCount = 0;

  let redCount = 0;

  let grayCount = 0;

  let total = 0;

  let greenVolume = 0;

  let redVolume = 0;

  let grayVolume = 0;

  let totalVolume = 0;

  for (const [c, vol] of ctx.color[winKey]) {
    if (c === "green") greenCount++;
    else if (c === "red") redCount++;
    else grayCount++;
    total++;
    if (vol !== undefined) {
      if (c === "green") greenVolume += vol;
      else if (c === "red") redVolume += vol;
      else grayVolume += vol;
      totalVolume += vol;
    }
  }

  if (period !== undefined) {
    candle[`sma${period}ColorGreen`] = utilN.math.percent(greenCount, total);

    candle[`sma${period}ColorRed`] = utilN.math.percent(redCount, total);

    candle[`sma${period}ColorGray`] = utilN.math.percent(grayCount, total);

    candle[`sma${period}ColorVolumeGreen`] = utilN.math.percent(
      greenVolume,
      totalVolume,
    );

    candle[`sma${period}ColorVolumeRed`] = utilN.math.percent(
      redVolume,
      totalVolume,
    );

    candle[`sma${period}ColorVolumeGray`] = utilN.math.percent(
      grayVolume,
      totalVolume,
    );
  } else {
    candle.color = color;

    candle.colorGreen = utilN.math.percent(greenCount, total);

    candle.colorRed = utilN.math.percent(redCount, total);

    candle.colorGray = utilN.math.percent(grayCount, total);

    candle.colorVolumeGreen = utilN.math.percent(greenVolume, totalVolume);

    candle.colorVolumeRed = utilN.math.percent(redVolume, totalVolume);

    candle.colorVolumeGray = utilN.math.percent(grayVolume, totalVolume);
  }
}

export default setCandleColor;
