import {
  type Option,
  type DataPoint,
  type NormalizedOption,
} from "./interfaces.js";
import * as utils from "@nameer/utils";

function setOptions(option: Option, series: DataPoint[]): NormalizedOption {
  const normalized = option as NormalizedOption;

  /*
   * FIELD MAPPING
   */

  normalized.datetime ??= "datetime";
  normalized.open ??= "open";
  normalized.high ??= "high";
  normalized.low ??= "low";
  normalized.close ??= "close";
  normalized.volume ??= "volume";

  /*
   * BASE PRICE
   */

  if (normalized.basePrice === undefined) {
    for (const curr of series) {
      const open = curr[normalized.open];
      if (utils.isNumberValid(open)) {
        normalized.basePrice = open;
        break;
      }
    }
  }

  /*
   * RSI
   */

  if (option.rsi === true) {
    normalized.rsi = 14; // J. Welles Wilder's optimal setting
  } else if (normalized.rsi !== undefined && !utils.isNumber(normalized.rsi)) {
    normalized.rsi = false;
  }

  normalized.rsi ??= false;

  /*
   * EMA
   */

  if (option.ema === true) {
    normalized.ema = [5, 8, 13]; // The Fibonacci Trio
  } else if (utils.isArray(normalized.ema)) {
    normalized.ema = normalized.ema.filter(utils.isNumberValid);
  } else {
    normalized.ema = [];
  }

  /*
   * MACD
   */

  if (option.macd === true) {
    normalized.macd = [12, 26, 9]; // Fast, Slow, Signal
  }

  if (utils.isArray(normalized.macd)) {
    const macd = normalized.macd.filter(utils.isNumberValid);
    if (macd.length === 3) {
      normalized.macd = [macd[0], macd[1], macd[2]];
      normalized.ema = [...new Set([...normalized.ema, macd[0], macd[1]])];
    } else {
      normalized.macd = false;
    }
  } else {
    normalized.macd = false;
  }

  /*
   * SMA
   */

  if (option.sma === true) {
    normalized.sma = [10, 50]; // Personal preference
  } else if (utils.isArray(normalized.sma)) {
    normalized.sma = normalized.sma.filter(utils.isNumberValid);
  } else {
    normalized.sma = [];
  }

  /*
   * SIGNAL
   */

  if (utils.isArray(normalized.signal)) {
    if (normalized.signal.every(utils.isString)) {
      normalized.signal = [normalized.signal as unknown as string[]];
    }
    normalized.signal = normalized.signal.filter(utils.isArrayNonEmpty);
  } else {
    normalized.signal = [];
  }

  /*
   * PHASE
   */

  if (option.phase === true) {
    normalized.phase = 10; // Personal preference
  }

  if (utils.isNumber(normalized.phase)) {
    normalized.color = true;
    if (!normalized.sma.includes(normalized.phase)) {
      normalized.sma.push(normalized.phase);
    }
    ensureSignal(normalized, `sma${normalized.phase}PriceClose`);
  } else {
    normalized.phase = false;
  }

  /*
   * PRESSURE
   */

  if (option.pressure === true) {
    normalized.pressure = 10; // Personal preference
  }

  if (utils.isNumber(normalized.pressure)) {
    normalized.color = true;
    if (!normalized.sma.includes(normalized.pressure)) {
      normalized.sma.push(normalized.pressure);
    }
    ensureSignal(normalized, `sma${normalized.pressure}PriceClose`);
  } else {
    normalized.pressure = false;
  }

  /*
   * ANCHOR
   */

  if (option.anchor === true) {
    normalized.anchor = [0, 50, 100]; // Personal preference
  }

  if (utils.isArray(normalized.anchor)) {
    normalized.anchor = normalized.anchor.filter(utils.isNumberValid);
  } else {
    normalized.anchor = [];
  }

  /*
   * NORMALIZE
   */

  if (utils.isArray(normalized.normalize)) {
    normalized.normalize = normalized.normalize.filter(utils.isString);
  } else {
    normalized.normalize = [];
  }

  /*
   * SORTING
   */

  normalized.ema.sort((a, b) => a - b);
  normalized.sma.sort((a, b) => a - b);
  normalized.anchor.sort((a, b) => a - b);

  return normalized;
}

function ensureSignal(normalized: NormalizedOption, smaKey: string): void {
  const isSignal = normalized.signal.some(([anchor, ...compares]) => {
    return (
      anchor === smaKey &&
      compares.includes("priceHigh") &&
      compares.includes("priceLow")
    );
  });
  if (isSignal !== true) {
    normalized.signal.push([smaKey, "priceHigh", "priceLow"]);
  }
}

export default setOptions;
