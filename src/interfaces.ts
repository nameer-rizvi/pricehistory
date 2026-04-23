// /*
//  * --> TYPES
//  */

// export type Color = "green" | "red" | "gray";

// export type DataPoint = Record<string, number | string | Date>;

// export type PriceLimit = (
//   limit: number,
//   threshold?: number,
// ) => { priceLimit: number; isHit: boolean } | void;

// /*
//  * --> INTERFACES
//  */

// export interface Candle {
//   index: number;
//   date?: Date;
//   dateString?: string;
//   dateYear?: number;
//   dateQuarter?: number;
//   dateMonth?: number;
//   dateMonthName?: string;
//   dateDate?: number;
//   dateWeekday?: number;
//   dateWeekdayName?: string;
//   halvingDate?: Date;
//   halvingEpoch?: number;
//   halvingYear?: number;
//   halvingProgress?: number;
//   timeHour?: number;
//   timeHourQuarter?: number;
//   timeMinute?: number;
//   timeIsPremarket?: boolean;
//   timeIsIntraday?: boolean;
//   timeIsPostmarket?: boolean;
//   timeIsDark?: boolean;
//   priceOpen?: number;
//   priceHigh?: number;
//   priceLow?: number;
//   priceClose?: number;
//   priceMean?: number;
//   priceChange?: number;
//   priceChangePremarket?: number;
//   priceChangeIntraday?: number;
//   priceChangeCumulative?: number;
//   priceRange?: number;
//   priceRangeDiff?: number;
//   priceRangeMean?: number;
//   priceLimit?: PriceLimit;
//   volume?: number;
//   volumeValue?: number;
//   obv?: number;
//   obvValue?: number;
//   vwap?: number;
//   rsi?: number;
//   averageGain?: number;
//   averageLoss?: number;
//   macd?: number;
//   macdSignal?: number;
//   macdHist?: number;
//   color?: Color;
//   colorGreen?: number;
//   colorRed?: number;
//   colorGray?: number;
//   colorVolumeGreen?: number;
//   colorVolumeRed?: number;
//   colorVolumeGray?: number;
//   candlestickTop?: number;
//   candlestickBottom?: number;
//   candlestickSize?: number;
//   candlestickUpper?: number;
//   candlestickBody?: number;
//   candlestickLower?: number;
//   candlestickIsGapUp?: boolean;
//   candlestickIsGapDown?: boolean;
//   candlestickGapSize?: number | null;
//   candlestickGapTarget?: number | null;
//   candlestickIsBullish?: boolean;
//   candlestickIsBearish?: boolean;
//   candlestickIsNeutral?: boolean;
//   candlestickIsHammer?: boolean;
//   candlestickIsHammerGreen?: boolean;
//   candlestickIsInvertedHammer?: boolean;
//   candlestickIsInvertedHammerRed?: boolean;
//   candlestickIsMarubozu?: boolean;
//   candlestickIsMarubozuGreen?: boolean;
//   candlestickIsMarubozuRed?: boolean;
//   isRejectionTop?: boolean;
//   isRejectionBottom?: boolean;
//   phaseDistribution?: number;
//   phaseAccumulation?: number;
//   pressureSelling?: number;
//   pressureBuying?: number;
//   [key: string]: any;
// }

// export interface Context {
//   prevClose?: number;
//   prevClose2?: number;
//   obv: number;
//   obvValue: number;
//   vwapPV: number;
//   vwapVolume: number;
//   window: Record<string, number[]>;
//   rsi: { initialized?: boolean; prevAvgGain?: number; prevAvgLoss?: number };
//   ema: Record<string, { initialized?: boolean; prev?: number }>;
//   macd: { initialized?: boolean; prev?: number };
//   color: Record<string, [Color, number | undefined][]>;
//   prevTopBottom: [] | [number, number];
//   trend: Record<string, [number, number, number, number]>;
// }

// export interface Option {
//   datetime?: string;
//   open?: string;
//   high?: string;
//   low?: string;
//   close?: string;
//   volume?: string;
//   date?: boolean;
//   halving?: boolean;
//   time?: boolean;
//   basePrice?: number;
//   leverage?: number;
//   price?: boolean;
//   limit?: boolean;
//   obv?: boolean;
//   vwap?: boolean;
//   rsi?: boolean | number;
//   ema?: boolean | number[];
//   macd?: boolean | [number, number, number];
//   color?: boolean;
//   sma?: boolean | number[];
//   signal?: (string | string[])[];
//   candlestick?: boolean;
//   gap?: "body" | "wick" | null;
//   phase?: boolean | number;
//   pressure?: boolean | number;
//   trend?: boolean;
//   anchor?: boolean | number[];
//   normalize?: string[];
// }
