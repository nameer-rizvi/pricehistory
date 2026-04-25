# pricehistory

Transforms raw OHLCV series data into enriched candles with technical indicators, pattern recognition, and trend analysis. Designed for performance — processes hundreds of thousands of candles across multiple instruments efficiently in a single pass.

## Installation

```bash
npm install pricehistory
# or
yarn add pricehistory
```

## Usage

```javascript
const pricehistory = require("pricehistory"); // commonjs
// or
import pricehistory from "pricehistory"; // esm
```

Provide a series of OHLCV data points and an options object:

```javascript
const candles = pricehistory(series, {
  price: true,
  rsi: true,
  ema: true,
  macd: true,
});
```

By default, the function expects each data point to have the following keys: `datetime`, `open`, `high`, `low`, `close`, `volume`. Custom key names can be provided via options.

## Input

Each item in the series should be a flat object with numeric OHLCV fields:

```javascript
const series = [
  {
    datetime: "2023-01-01",
    open: 383.41,
    high: 390.12,
    low: 381.09,
    close: 386.19,
    volume: 52341200,
  },
  {
    datetime: "2023-01-02",
    open: 386.19,
    high: 392.47,
    low: 384.55,
    close: 389.99,
    volume: 64821900,
  },
  // ...
];
```

## Output

Each candle in the returned array contains the input fields plus any computed properties based on the options provided. A fully enriched candle looks like:

```javascript
{
  index: 98,
  date: Date,
  dateString: "3/11/2023, 7:00:00 PM",
  dateYear: 2023,
  dateQuarter: 1,
  dateMonth: 3,
  dateMonthName: "March",
  dateDate: 11,
  dateWeekday: 7,
  dateWeekdayName: "Saturday",
  halvingDate: Date,
  halvingEpoch: 3,
  halvingYear: 3,
  halvingProgress: 71.92,
  timeHour: 19,
  timeHourQuarter: 1,
  timeMinute: 0,
  timeIsPremarket: false,
  timeIsIntraday: false,
  timeIsPostmarket: true,
  timeIsDark: false,
  priceOpen: 328.37,
  priceHigh: 353.59,
  priceLow: 326.37,
  priceClose: 342.42,
  priceMean: 337.69,
  priceChange: 2.07,
  priceChangePremarket: -2.12,
  priceChangeIntraday: 4.28,
  priceChangeCumulative: -17.97,
  priceRange: 27.22,
  priceRangeDiff: 8.34,
  priceRangeMean: 339.98,
  priceLimit: Function,
  volume: 764846609,
  volumeValue: 258281051393,
  obv: -2090870206,
  vwap: 410.09,
  rsi: 46.25,
  averageGain: 7.12,
  averageLoss: 8.28,
  ema5: 351.72,
  ema8: 354.71,
  ema13: 355.19,
  macd: -1.25,
  macdSignal: -1.39,
  macdHist: 0.141,
  color: "green",
  colorGreen: 51.02,
  colorRed: 48.98,
  colorGray: 0,
  sma10PriceClose: 362.31,
  sma10Volume: 443385895,
  sma10Vwap: 359.78,
  candlestickTop: 353.59,
  candlestickBottom: 326.37,
  candlestickSize: 27.22,
  candlestickUpper: 41.04,
  candlestickBody: 51.62,
  candlestickLower: 7.35,
  candlestickIsBullish: true,
  candlestickIsHammer: false,
  candlestickIsMarubozu: false,
  isRejectionTop: true,
  isRejectionBottom: false,
  phaseDistribution: 0,
  phaseAccumulation: 49.6,
  pressureSelling: -412.44,
  pressureBuying: 304.04,
  rsiTrend: [1, "up", "+", "↑", "🟢"],
  rsiTrendStartAt: 98,
  rsiTrendLength: 1,
  anchor0: 0,
  anchor50: 50,
  anchor100: 100,
  volumeN: 79.66,
  volumeValueN: 54.38,
  // ...
}
```

## Options

| Option        | Type                                  | Default        | Description                                                                                                   |
| ------------- | ------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `datetime`    | `string`                              | `"datetime"`   | Key name for the datetime field                                                                               |
| `open`        | `string`                              | `"open"`       | Key name for the open price field                                                                             |
| `high`        | `string`                              | `"high"`       | Key name for the high price field                                                                             |
| `low`         | `string`                              | `"low"`        | Key name for the low price field                                                                              |
| `close`       | `string`                              | `"close"`      | Key name for the close price field                                                                            |
| `volume`      | `string`                              | `"volume"`     | Key name for the volume field                                                                                 |
| `date`        | `boolean`                             |                | Adds date breakdown fields (`dateYear`, `dateMonth`, `dateWeekday`, etc.)                                     |
| `halving`     | `boolean`                             |                | Adds Bitcoin halving epoch fields (`halvingEpoch`, `halvingYear`, `halvingProgress`)                          |
| `time`        | `boolean`                             |                | Adds market session fields (`timeIsPremarket`, `timeIsIntraday`, `timeIsPostmarket`, `timeIsDark`)            |
| `basePrice`   | `number`                              | first open     | Base price used for cumulative change calculations                                                            |
| `leverage`    | `number`                              |                | Leverage multiplier applied to OHLC price calculations                                                        |
| `price`       | `boolean`                             |                | Adds price derived fields (`priceMean`, `priceChange`, `priceRange`, etc.)                                    |
| `limit`       | `boolean`                             |                | Adds a `priceLimit(limit, threshold?)` function to each candle for calculating price targets                  |
| `obv`         | `boolean`                             |                | Adds On-Balance Volume (`obv`, `obvValue`)                                                                    |
| `vwap`        | `boolean`                             |                | Adds Volume Weighted Average Price (`vwap`)                                                                   |
| `rsi`         | `boolean \| number`                   | `14`           | Adds RSI (`rsi`, `averageGain`, `averageLoss`). Pass a number to set the period                               |
| `ema`         | `boolean \| number[]`                 | `[5, 8, 13]`   | Adds EMA for each period (e.g. `ema5`, `ema8`). Pass an array to set custom periods                           |
| `macd`        | `boolean \| [number, number, number]` | `[12, 26, 9]`  | Adds MACD (`macd`, `macdSignal`, `macdHist`). Pass a tuple to set custom fast/slow/signal periods             |
| `color`       | `boolean`                             |                | Adds candle color (`color`, `colorGreen`, `colorRed`, `colorGray`, and volume equivalents)                    |
| `sma`         | `boolean \| number[]`                 | `[10, 50]`     | Adds SMA for each period across all price/volume keys (e.g. `sma10PriceClose`, `sma50Volume`)                 |
| `signal`      | `(string \| string[])[]`              |                | Adds percent change signals between candle keys (e.g. `["sma10PriceClose", "sma10Vwap"]`)                     |
| `candlestick` | `boolean`                             |                | Adds candlestick anatomy fields and pattern recognition (`candlestickIsBullish`, `candlestickIsHammer`, etc.) |
| `gap`         | `"body" \| "wick" \| null`            |                | Sets whether gap detection uses candle body or wick boundaries                                                |
| `phase`       | `boolean \| number`                   | `10`           | Adds distribution/accumulation phase fields (`phaseDistribution`, `phaseAccumulation`)                        |
| `pressure`    | `boolean \| number`                   | `10`           | Adds buying/selling pressure fields (`pressureBuying`, `pressureSelling`)                                     |
| `trend`       | `boolean`                             |                | Adds trend direction, start index, and length for every indicator field                                       |
| `anchor`      | `boolean \| number[]`                 | `[0, 50, 100]` | Adds fixed anchor values to each candle (e.g. `anchor0`, `anchor50`, `anchor100`)                             |
| `normalize`   | `string[]`                            |                | Adds a rescaled 0–100 version of the specified fields (e.g. `"volume"` → `volumeN`)                           |

## `priceLimit`

When `limit: true` is set, each candle gets a `priceLimit` function for calculating price targets relative to the candle's open:

```javascript
candle.priceLimit(5); // { priceLimit: 345.67, isHit: true }  - 5% above open
candle.priceLimit(-3); // { priceLimit: 318.52, isHit: false } - 3% below open
candle.priceLimit(5, 0.05); // 5% above open with $0.05 threshold below high and above low (target will not hit if within threshold)
```

## Trend

When `trend: true` is set, every numeric indicator gets three additional fields:

```javascript
rsiTrend: [1, "up", "+", "↑", "🟢"]; // [direction, label, sign, arrow, emoji]
rsiTrendStartAt: 95; // candle index where this trend started
rsiTrendLength: 4; // number of candles in the current trend
```

Direction values: `1` (up), `-1` (down), `0` (neutral).

## Performance

`pricehistory` is optimized for high-throughput use cases. All indicators are computed in a single pass over the series. Indicator state (EMA multipliers, RSI averages, rolling windows) is carried forward via a context object and freed from memory as soon as it is no longer needed.

For best results with higher-period indicators like EMA(26) or EMA(50), provide at least 3–5× the period length in candles to allow values to fully converge.

## License

MIT
