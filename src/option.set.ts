import {
  type Option,
  type DataPoint,
  type NormalizedOption,
} from "./interfaces.js";
import * as utilN from "@nameer/utils";

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
      if (utilN.isNumber(open)) {
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
  } else if (normalized.rsi !== undefined && !utilN.isNumber(normalized.rsi)) {
    normalized.rsi = false;
  }

  normalized.rsi ??= false;

  /*
   * EMA
   */

  if (option.ema === true) {
    normalized.ema = [5, 8, 13]; // The Fibonacci Trio
  } else if (utilN.isArray(normalized.ema)) {
    normalized.ema = normalized.ema.filter(utilN.isNumber);
  } else {
    normalized.ema = [];
  }

  /*
   * MACD
   */

  if (option.macd === true || normalized.macdPivot === true) {
    normalized.macd = [12, 26, 9]; // Fast, Slow, Signal
  }

  if (utilN.isArray(normalized.macd)) {
    const macd = normalized.macd.filter(utilN.isNumber);
    if (macd.length === 3) {
      normalized.macd = [macd[0], macd[1], macd[2]];
      normalized.ema = [...new Set([...normalized.ema, macd[0], macd[1]])];
    } else {
      normalized.macd = false;
    }
  } else {
    normalized.macd = false;
  }

  if (normalized.macdPivot === true) {
    normalized.macdPivot = normalized.macd !== false;
  }

  /*
   * SMA
   */

  if (option.sma === true) {
    normalized.sma = [10, 50]; // Personal preference
  } else if (utilN.isArray(normalized.sma)) {
    normalized.sma = normalized.sma.filter(utilN.isNumber);
  } else {
    normalized.sma = [];
  }

  /*
   * SIGNAL
   */

  if (utilN.isArray(option.signal)) {
    if (option.signal.every(utilN.isString)) {
      normalized.signal = [option.signal];
    }
    normalized.signal = normalized.signal.filter((signal) => {
      return utilN.isArray(signal) && signal.every(utilN.isString);
    });
  } else {
    normalized.signal = [];
  }

  /*
   * PHASE
   */

  if (option.phase === true) {
    normalized.phase = 10; // Personal preference
  }

  if (utilN.isNumber(normalized.phase)) {
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

  if (utilN.isNumber(normalized.pressure)) {
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

  if (utilN.isArray(normalized.anchor)) {
    normalized.anchor = normalized.anchor.filter(utilN.isNumber);
  } else {
    normalized.anchor = [];
  }

  /*
   * NORMALIZE
   */

  if (utilN.isArray(normalized.normalize)) {
    normalized.normalize = normalized.normalize.filter(utilN.isString);
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
  const isSignal = normalized.signal.some(([anchor, ...keys]) => {
    return (
      anchor === smaKey &&
      keys.includes("priceHigh") &&
      keys.includes("priceLow")
    );
  });
  if (isSignal !== true) {
    normalized.signal.push([smaKey, "priceHigh", "priceLow"]);
  }
}

export default setOptions;
