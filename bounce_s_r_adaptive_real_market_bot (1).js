export const meta = {
  name: "Bounce S/R Adaptive Real Market Bot",
  pane: "main",
  adaptiveExpiration: true,
  minBars: (p) => Math.max(p.lookback + 10, p.slowAtrPeriod + 5, p.channelPeriod + 5),
  cooldown: (p) => p.cooldownBars,
  timeframes: (p) => [p.higherTf],
  defaultParams: {
    lookback: 120,
    minTouches: 2,
    minLevelSpan: 6,
    minClosePos: 0.30,
    maxDistAtr: 0.55,          // максимальное расстояние до уровня (x ATR)
    atrPeriod: 14,
    zoneAtrMult: 0.38,
    minWickRatio: 0.28,
    maxBarAtr: 2.5,
    rsiPeriod: 8,
    rsiOb: 62,
    rsiOs: 38,
    adxPeriod: 14,
    maxAdx: 42,                // мягче, чем на OTC
    erPeriod: 14,
    maxEr: 0.68,               // мягче, чем на OTC
    useHtfFilter: true,
    higherTf: "M5",
    htfMode: "slope",          // по умолчанию по наклону EMA
    htfFlatAdx: 28,
    htfEmaPeriod: 21,
    adaptiveMode: true,
    channelPeriod: 30,
    slowAtrPeriod: 50,
    fixedExpBars: 4,
    minExpSec: 60,
    maxExpSec: 600,
    pauseLossStreak: 3,
    pauseBars: 25,
    pauseWr: 48,
    wrWindow: 30,
    pauseResumeWins: 2,
    maxVolRatio: 2.2,
    minVolRatio: 0.50,
    spikeBarAtr: 3.2,
    volPauseBars: 12,
    cooldownBars: 2,
    serialTrades: true,
    maxSignalsHour: 5,
    maxEntryDelaySec: 20,
    minPayout: 75,
    entrySlipAtr: 0.08,
    useVolumeFilter: false,    // включать только если брокер отдаёт объём
    minVolumeMult: 0.8,
    showLevels: true,
    colorBuy: "#22c55e",
    colorSell: "#ef4444",
    colorResLine: "rgba(239,68,68,0.75)",
    colorSupLine: "rgba(34,197,94,0.75)"
  },
  paramMeta: {
    lookback:      { label: "Глубина уровней, баров",   type: "number",  min: 50,   max: 400, step: 10,   group: "Уровни и вход" },
    minTouches:    { label: "Мин. касаний уровня",      type: "number",  min: 2,    max: 5,   step: 1,    group: "Уровни и вход" },
    minLevelSpan:  { label: "Мин. разброс касаний, баров", type: "number", min: 0,  max: 100, step: 1,    group: "Уровни и вход" },
    minClosePos:   { label: "Мин. отход закрытия (0=выкл)", type: "number", min: 0, max: 0.9, step: 0.05, group: "Уровни и вход" },
    maxDistAtr:    { label: "Макс. расстояние до уровня (x ATR)", type: "number", min: 0.2, max: 1.2, step: 0.05, group: "Уровни и вход" },
    atrPeriod:     { label: "Период быстрого ATR",      type: "number",  min: 5,    max: 30,  step: 1,    group: "Уровни и вход" },
    zoneAtrMult:   { label: "Ширина зоны (x ATR)",      type: "number",  min: 0.15, max: 0.8, step: 0.05, group: "Уровни и вход" },
    minWickRatio:  { label: "Мин. тень отбоя (0..1)",   type: "number",  min: 0.1,  max: 0.7, step: 0.02, group: "Уровни и вход" },
    maxBarAtr:     { label: "Макс. свеча (x ATR)",      type: "number",  min: 1.2,  max: 4.0, step: 0.1,  group: "Уровни и вход" },
    rsiPeriod:     { label: "Период RSI",               type: "number",  min: 3,    max: 21,  step: 1,    group: "Уровни и вход" },
    rsiOb:         { label: "RSI перекупленность",      type: "number",  min: 52,   max: 85,  step: 1,    group: "Уровни и вход" },
    rsiOs:         { label: "RSI перепроданность",      type: "number",  min: 15,   max: 48,  step: 1,    group: "Уровни и вход" },

    adxPeriod:     { label: "Период ADX",               type: "number",  min: 5,    max: 30,  step: 1,    group: "Фильтр тренда" },
    maxAdx:        { label: "Макс. ADX (флэт)",         type: "number",  min: 15,   max: 60,  step: 1,    group: "Фильтр тренда" },
    erPeriod:      { label: "Период ER",                type: "number",  min: 5,    max: 30,  step: 1,    group: "Фильтр тренда" },
    maxEr:         { label: "Порог ER",                 type: "number",  min: 0.3,  max: 0.9, step: 0.02, group: "Фильтр тренда" },
    useHtfFilter:  { label: "Фильтр старшего ТФ",       type: "boolean",                                  group: "Фильтр тренда" },
    higherTf:      { label: "Старший ТФ",               type: "select",  options: ["M5", "M15", "M30"],   group: "Фильтр тренда" },
    htfMode:       { label: "Режим фильтра ТФ",         type: "select",
                     options: [
                       { label: "Блок сильного тренда", value: "trend" },
                       { label: "Только флэт",          value: "flat" },
                       { label: "По наклону EMA",       value: "slope" }
                     ], group: "Фильтр тренда" },
    htfFlatAdx:    { label: "Макс. ADX старшего ТФ",    type: "number",  min: 10,   max: 50,  step: 1,    group: "Фильтр тренда" },
    htfEmaPeriod:  { label: "EMA старшего ТФ",          type: "number",  min: 5,    max: 100, step: 1,    group: "Фильтр тренда" },

    adaptiveMode:  { label: "Адаптивная экспирация",    type: "boolean",                                  group: "Экспирация" },
    channelPeriod: { label: "Период ширины канала",     type: "number",  min: 10,   max: 80,  step: 2,    group: "Экспирация" },
    slowAtrPeriod: { label: "Период медленного ATR",    type: "number",  min: 20,   max: 100, step: 2,    group: "Экспирация" },
    fixedExpBars:  { label: "Фикс. экспирация, баров",  type: "number",  min: 1,    max: 12,  step: 1,    group: "Экспирация" },
    minExpSec:     { label: "Мин. экспирация, сек",     type: "number",  min: 30,   max: 900, step: 15,   group: "Экспирация" },
    maxExpSec:     { label: "Макс. экспирация, сек",    type: "number",  min: 60,   max: 3600,step: 30,   group: "Экспирация" },

    pauseLossStreak: { label: "Пауза после N убытков подряд", type: "number", min: 0, max: 10,  step: 1,   group: "Защита депозита" },
    pauseBars:     { label: "Длительность паузы, баров", type: "number", min: 1,    max: 300, step: 1,    group: "Защита депозита" },
    pauseWr:       { label: "Пауза, если WR ниже, % (0=выкл)", type: "number", min: 0, max: 60, step: 1,  group: "Защита депозита" },
    wrWindow:      { label: "Окно WR, сделок",          type: "number",  min: 10,   max: 100, step: 1,    group: "Защита депозита" },
    pauseResumeWins: { label: "Побед для снятия паузы",  type: "number", min: 1,    max: 5,   step: 1,    group: "Защита депозита" },
    maxVolRatio:   { label: "Макс. ATR быстр/медл (0=выкл)", type: "number", min: 0, max: 5,  step: 0.1, group: "Защита депозита" },
    minVolRatio:   { label: "Мин. ATR быстр/медл (0=выкл)", type: "number", min: 0, max: 1.5, step: 0.05, group: "Защита депозита" },
    spikeBarAtr:   { label: "Свеча-всплеск, x ATR (0=выкл)", type: "number", min: 0, max: 8,  step: 0.1, group: "Защита депозита" },
    volPauseBars:  { label: "Пауза после всплеска, баров", type: "number", min: 1,  max: 100, step: 1,   group: "Защита депозита" },

    cooldownBars:  { label: "Пауза после сигнала",      type: "number",  min: 0,    max: 30,  step: 1,    group: "Торговля" },
    serialTrades:  { label: "Одна сделка за раз",       type: "boolean",                                  group: "Торговля" },
    maxSignalsHour: { label: "Макс. сигналов в час (0=выкл)", type: "number", min: 0, max: 30, step: 1,    group: "Торговля" },
    maxEntryDelaySec: { label: "Макс. задержка входа, с (0=выкл)", type: "number", min: 0, max: 60, step: 1, group: "Торговля" },
    minPayout:     { label: "Мин. выплата пары, %",     type: "number",  min: 0,    max: 95,  step: 1,    group: "Торговля" },
    entrySlipAtr:  { label: "Проскальзывание входа, x ATR", type: "number", min: 0,  max: 0.5, step: 0.01, group: "Торговля" },
    useVolumeFilter: { label: "Фильтр по объёму",       type: "boolean",                                  group: "Торговля" },
    minVolumeMult: { label: "Мин. объём (x средний)",   type: "number",  min: 0.3,  max: 2.0, step: 0.1,  group: "Торговля" },
    showLevels:    { label: "Линии ближайших уровней",  type: "boolean",                                  group: "Торговля" },

    colorBuy:      { label: "Цвет CALL",                type: "color" },
    colorSell:     { label: "Цвет PUT",                 type: "color" },
    colorResLine:  { label: "Линия сопротивления",      type: "color" },
    colorSupLine:  { label: "Линия поддержки",          type: "color" }
  }
};

export const hud = {
  anchor: "TR",
  offset: { top: 12, right: 12, bottom: 12, left: 12 },
  fontPx: 12,
  pointerEvents: "auto",
  css: (p, env) => {
    const dark = env.isDark;
    const bg = dark ? "rgba(15,23,42,0.93)" : "rgba(255,255,255,0.96)";
    const border = dark ? "rgba(148,163,184,0.28)" : "rgba(15,23,42,0.16)";
    const text = dark ? "#e2e8f0" : "#1e293b";
    const dim = dark ? "#94a3b8" : "#64748b";
    const accent = dark ? "#38bdf8" : "#0284c7";
    const btnBg = dark ? "#1e293b" : "#f1f5f9";
    const btnHover = dark ? "#334155" : "#e2e8f0";
    return `
      .card {
        background: ${bg};
        border: 1px solid ${border};
        border-radius: 0.65em;
        padding: 0.55em 0.8em;
        color: ${text};
        min-width: 19em;
        pointer-events: none;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8em;
        font-weight: 700;
        font-size: 0.92em;
        color: ${accent};
        padding-bottom: 0.25em;
        margin-bottom: 0.3em;
        border-bottom: 1px solid ${border};
      }
      .sub { font-size: 0.8em; color: ${dim}; font-weight: 600; }
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.9em;
        font-size: 0.84em;
        margin-top: 0.18em;
      }
      .dim { color: ${dim}; }
      .val { font-weight: 600; font-variant-numeric: tabular-nums; }
      .small { font-size: 0.92em; text-align: right; }
      .ok { color: #22c55e; }
      .warn { color: #f59e0b; }
      .bad { color: #ef4444; }
      .sep {
        margin: 0.32em 0;
        border-top: 1px dashed ${border};
      }
      .controls {
        pointer-events: auto;
        display: flex;
        gap: 0.45em;
        margin-top: 0.42em;
      }
      button[data-action] {
        flex: 1;
        cursor: pointer;
        padding: 0.25em 0.55em;
        border-radius: 0.45em;
        border: 1px solid ${border};
        background: ${btnBg};
        color: ${text};
        font: inherit;
        font-size: 0.8em;
        font-weight: 600;
      }
      button[data-action]:hover { background: ${btnHover}; }
    `;
  },
  render: (s, html) => html`
    <div class="card">
      <div class="head">
        <span>${s.pair} (${s.tf})</span>
        <span class="sub">${s.payoutText}</span>
      </div>
      <div class="row"><span class="dim">Уровней (Sup/Res):</span><span class="val">${s.supCount} / ${s.resCount} (${s.levelsTotal})</span></div>
      <div class="row"><span class="dim">Режим рынка:</span><span class="val ${s.regimeClass}">${s.regimeText}</span></div>
      <div class="row"><span class="dim">Экспирация сейчас:</span><span class="val">${s.expLabel}</span></div>
      <div class="sep"></div>
      <div class="row"><span class="dim">Сделок (W / L / =):</span><span class="val">${s.wins} / ${s.losses} / ${s.draws}</span></div>
      <div class="row"><span class="dim">Winrate (вирт.):</span><span class="val ${s.wrClass}">${s.wrText}% (BE ${s.beText}%)</span></div>
      <div class="row"><span class="dim">МО (по мин. выплате):</span><span class="val ${s.evClass}">${s.evText}% / сделка</span></div>
      <div class="row"><span class="dim">Средняя эксп. / Серия L:</span><span class="val">${s.avgExpText}с / ${s.maxLossStreak}</span></div>
      <div class="row"><span class="dim">CALL / PUT (W/L):</span><span class="val small">${s.dirText}</span></div>
      <div class="row"><span class="dim">По экспирации (W/L):</span><span class="val small">${s.brkText}</span></div>
      <div class="row"><span class="dim">По касаниям (W/L):</span><span class="val small">${s.touchText}</span></div>
      <div class="row"><span class="dim">Просадка / сегодня:</span><span class="val ${s.dayClass}">${s.ddText} / ${s.dayText}</span></div>
      <div class="row"><span class="dim">Сигналов в паузе:</span><span class="val">${s.shadowCount}</span></div>
      <div class="sep"></div>
      <div class="row"><span class="dim">Статус:</span><span class="val ${s.statusClass}">${s.statusText}</span></div>
      <div class="controls">
        <button data-action="pause">${s.paused ? "Продолжить" : "Пауза автоторг."}</button>
        <button data-action="reset">Сброс стат.</button>
      </div>
    </div>
  `
};

export function init(ctx) {
  const TF_SEC_MAP = { M5: 300, M15: 900, M30: 1800, H1: 3600 };
  const { candleSeries, params, TA, createSeriesMarkers, market, time, fmt, bars } = ctx;
  const markersApi = createSeriesMarkers(candleSeries, []);

  const resPriceLine = candleSeries.createPriceLine({
    price: 0,
    color: params.colorResLine,
    lineWidth: 1,
    lineStyle: 2,
    lineVisible: false,
    axisLabelVisible: false,
    title: "Res"
  });
  const supPriceLine = candleSeries.createPriceLine({
    price: 0,
    color: params.colorSupLine,
    lineWidth: 1,
    lineStyle: 2,
    lineVisible: false,
    axisLabelVisible: false,
    title: "Sup"
  });

  let paused = false;
  let baselineTime = 0;

  ctx.hud.on("click", '[data-action="pause"]', () => { paused = !paused; });
  ctx.hud.on("click", '[data-action="reset"]', () => { baselineTime = time.now(); });

  function calcAdaptiveBars(tfSec, halfWidthAtr, volRatio, er) {
    if (!params.adaptiveMode) return params.fixedExpBars;
    // На реальном рынке базовый горизонт длиннее
    let b = tfSec <= 60 ? 4 : 3;
    if (halfWidthAtr < 1.8) b -= 1;
    else if (halfWidthAtr >= 2.6) b += 1;
    if (volRatio < 0.85) b += 1;
    if (er >= 0.35) b -= 1;
    return Math.max(2, Math.min(7, b));
  }

  function alignExpiration(rawSec, tfSec) {
    const lo = Math.max(30, Number(params.minExpSec) || 60);
    const hi = Math.min(3600, Number(params.maxExpSec) || 600);
    if (tfSec <= 0 || hi < lo) return { bars: 0, sec: 0, valid: false };
    const minBars = Math.max(1, Math.ceil(lo / tfSec));
    const maxBars = Math.floor(hi / tfSec);
    if (maxBars < minBars) return { bars: 0, sec: 0, valid: false };
    const wanted = Math.round(rawSec / tfSec);
    const b = Math.max(minBars, Math.min(maxBars, wanted));
    return { bars: b, sec: b * tfSec, valid: true };
  }

  return {
    update(candles) {
      const n = candles.length;
      const tfSec = time.tf || 60;
      const livePayoutRaw = market.payout;
      const livePayout = Number.isFinite(livePayoutRaw) ? livePayoutRaw : null;
      const payoutKnown = livePayout !== null && livePayout > 0;
      const virtualPayoutFrac = Math.max(0, Math.min(95, Number(params.minPayout) || 0)) / 100;
      const breakevenWr = virtualPayoutFrac > 0 ? 100 / (1 + virtualPayoutFrac) : 100;
      const isPayoutBlocked = !payoutKnown || livePayout < params.minPayout;

      if (n < Math.max(params.lookback + 10, params.slowAtrPeriod + 5, params.channelPeriod + 5)) {
        markersApi.setMarkers([]);
        return [];
      }

      const htfSec = TF_SEC_MAP[params.higherTf] || 300;
      const htfCandles = bars(params.higherTf);
      const htfEma = new TA.EMA(params.htfEmaPeriod);
      const htfAdx = new TA.ADX(params.adxPeriod);
      const htfTrendBlock = new Int8Array(htfCandles.length);
      const htfAdxVals = new Float64Array(htfCandles.length).fill(-1);
      const htfSlope = new Int8Array(htfCandles.length);
      const htfEmaVals = new Float64Array(htfCandles.length).fill(NaN);

      for (let j = 0; j < htfCandles.length; j++) {
        const hb = htfCandles[j];
        const ev = htfEma.add(hb.close);
        const av = htfAdx.add(hb);
        if (av !== null) htfAdxVals[j] = av;
        if (htfEma.isStable) {
          htfEmaVals[j] = ev;
          if (j >= 3 && !Number.isNaN(htfEmaVals[j - 3])) htfSlope[j] = Math.sign(ev - htfEmaVals[j - 3]);
        }
        if (htfEma.isStable && av !== null && av > params.maxAdx + 5 && j >= 2) {
          const prevClose = htfCandles[j - 2].close;
          if (hb.close > ev && hb.close > prevClose) htfTrendBlock[j] = 1;
          else if (hb.close < ev && hb.close < prevClose) htfTrendBlock[j] = -1;
        }
      }

      const atrFastInd = new TA.ATR(params.atrPeriod);
      const atrSlowInd = new TA.ATR(params.slowAtrPeriod);
      const rsiInd = new TA.RSI(params.rsiPeriod);
      const adxInd = new TA.ADX(params.adxPeriod);
      const rangeInd = new TA.Period(params.channelPeriod);

      // Средний объём для фильтра (если включён)
      let avgVol = 0;
      if (params.useVolumeFilter && market.hasVolume) {
        let sum = 0, cnt = 0;
        for (let k = Math.max(0, n - 50); k < n - 1; k++) {
          if (candles[k].volume > 0) { sum += candles[k].volume; cnt++; }
        }
        avgVol = cnt > 0 ? sum / cnt : 0;
      }

      const evalEnd = n - 2;
      const lastClosedIdx = n - 2;

      const levels = [];
      const markers = [];
      const pending = [];

      let lastMarkerIdx = -999999;
      let busyUntilIdx = -999999;
      const sigIdxs = [];
      const hourBars = Math.max(1, Math.round(3600 / tfSec));

      let wins = 0, losses = 0, draws = 0;
      let curLossStreak = 0, maxLossStreak = 0;
      let sumExpSec = 0, settledCount = 0;
      let buyW = 0, buyL = 0, sellW = 0, sellL = 0;
      const byBars = new Map();
      const byTouch = [{ w: 0, l: 0 }, { w: 0, l: 0 }];
      let equity = 0, peakEquity = 0, maxDd = 0;

      let rawStreak = 0, pauseUntilIdx = -1;
      const recent = [];
      let shadowCount = 0, spikeUntilIdx = -1;
      let prevFastAtr = null, winRun = 0;
      const dayPnl = new Map();

      let lastEr = 0, lastAdx = 0, lastHalfWidthAtr = 2.0, lastVolRatio = 1.0;

      function settleTrade(trd) {
        const closeP = candles[trd.settleIdx].close;
        let outcome = 0;
        const priceEpsilon = Math.max(1e-10, Math.abs(trd.entryPrice) * 1e-10);
        if (Math.abs(closeP - trd.entryPrice) > priceEpsilon) {
          const won = trd.dir === "buy" ? closeP > trd.entryPrice : closeP < trd.entryPrice;
          outcome = won ? 1 : -1;
        }

        if (outcome === 1) {
          rawStreak = 0;
          winRun += 1;
          if (winRun >= Math.max(1, params.pauseResumeWins)) pauseUntilIdx = -1;
          recent.push(1);
        } else if (outcome === -1) {
          winRun = 0;
          rawStreak += 1;
          if (params.pauseLossStreak > 0 && rawStreak % params.pauseLossStreak === 0) {
            pauseUntilIdx = trd.settleIdx + params.pauseBars;
          }
          recent.push(0);
        }
        while (recent.length > params.wrWindow) recent.shift();

        if (!trd.emitted) return;

        const pnl = outcome === 1 ? trd.payoutFrac : outcome === -1 ? -1 : 0;
        const dKey = time.dayStart(candles[trd.entryIdx].time);
        dayPnl.set(dKey, (dayPnl.get(dKey) || 0) + pnl);

        if (candles[trd.entryIdx].time < baselineTime) return;

        settledCount += 1;
        sumExpSec += trd.expSec;
        if (outcome === 0) draws += 1;
        else if (outcome === 1) { wins += 1; curLossStreak = 0; }
        else { losses += 1; curLossStreak += 1; if (curLossStreak > maxLossStreak) maxLossStreak = curLossStreak; }

        if (outcome !== 0) {
          if (trd.dir === "buy") { if (outcome === 1) buyW += 1; else buyL += 1; }
          else { if (outcome === 1) sellW += 1; else sellL += 1; }
          let cell = byBars.get(trd.expBars);
          if (!cell) { cell = { w: 0, l: 0 }; byBars.set(trd.expBars, cell); }
          if (outcome === 1) cell.w += 1; else cell.l += 1;
          const tCell = byTouch[trd.touches >= 3 ? 1 : 0];
          if (outcome === 1) tCell.w += 1; else tCell.l += 1;
        }

        equity += pnl;
        if (equity > peakEquity) peakEquity = equity;
        if (peakEquity - equity > maxDd) maxDd = peakEquity - equity;
      }

      function pauseReasonAt(idx) {
        if (params.pauseLossStreak > 0 && idx <= pauseUntilIdx) return rawStreak + " убытков подряд";
        if (params.pauseWr > 0 && recent.length >= params.wrWindow) {
          let w = 0;
          for (let q = 0; q < recent.length; q++) w += recent[q];
          const wrPct = (w / recent.length) * 100;
          if (wrPct < params.pauseWr) return "WR" + recent.length + " " + fmt.num(wrPct, 0) + "%";
        }
        return "";
      }

      for (let i = 0; i <= evalEnd; i++) {
        const c = candles[i];
        const fastAtr = atrFastInd.add(c);
        const slowAtr = atrSlowInd.add(c);
        const refAtr = prevFastAtr !== null && prevFastAtr > 0 ? prevFastAtr : fastAtr;
        prevFastAtr = fastAtr;
        const rsi = rsiInd.add(c.close);
        const adx = adxInd.add(c);
        const chRange = rangeInd.add(c.close);

        if (i <= lastClosedIdx && pending.length > 0) {
          const due = [];
          for (let q = pending.length - 1; q >= 0; q--) {
            if (pending[q].settleIdx <= i) { due.push(pending[q]); pending.splice(q, 1); }
          }
          if (due.length > 0) {
            due.sort((a, b) => a.settleIdx - b.settleIdx || a.entryIdx - b.entryIdx);
            for (let q = 0; q < due.length; q++) settleTrade(due[q]);
          }
        }

        if (fastAtr !== null && fastAtr > 0 && slowAtr !== null && slowAtr > 0) {
          const spikeVol = params.maxVolRatio > 0 && fastAtr / slowAtr > params.maxVolRatio;
          const spikeBar = params.spikeBarAtr > 0 && refAtr !== null && c.high - c.low > refAtr * params.spikeBarAtr;
          if (spikeVol || spikeBar) spikeUntilIdx = i + params.volPauseBars;
        }

        for (let m = levels.length - 1; m >= 0; m--) {
          if (levels[m].lastTouchIdx < i - params.lookback) levels.splice(m, 1);
        }

        const zone = fastAtr !== null && fastAtr > 0 ? fastAtr * params.zoneAtrMult : 0;

        if (i >= 4 && i <= lastClosedIdx && zone > 0) {
          const k = i - 2;
          const ck = candles[k];
          const isRes = ck.high > candles[k-1].high && ck.high > candles[k-2].high && ck.high > candles[k+1].high && ck.high > candles[k+2].high;
          const isSup = ck.low < candles[k-1].low && ck.low < candles[k-2].low && ck.low < candles[k+1].low && ck.low < candles[k+2].low;

          if (isRes) {
            let merged = false;
            for (let m = 0; m < levels.length; m++) {
              const lv = levels[m];
              if (lv.type === "resistance" && Math.abs(lv.price - ck.high) <= zone * 1.2) {
                lv.touches += 1;
                lv.price += (ck.high - lv.price) / lv.touches;
                lv.lastTouchIdx = k;
                merged = true;
                break;
              }
            }
            if (!merged) levels.push({ price: ck.high, type: "resistance", touches: 1, firstIdx: k, lastTouchIdx: k });
          }
          if (isSup) {
            let merged = false;
            for (let m = 0; m < levels.length; m++) {
              const lv = levels[m];
              if (lv.type === "support" && Math.abs(lv.price - ck.low) <= zone * 1.2) {
                lv.touches += 1;
                lv.price += (ck.low - lv.price) / lv.touches;
                lv.lastTouchIdx = k;
                merged = true;
                break;
              }
            }
            if (!merged) levels.push({ price: ck.low, type: "support", touches: 1, firstIdx: k, lastTouchIdx: k });
          }
        }

        if (i <= lastClosedIdx && zone > 0) {
          for (let m = levels.length - 1; m >= 0; m--) {
            const lv = levels[m];
            if ((lv.type === "resistance" && c.close > lv.price + zone * 1.2) ||
                (lv.type === "support" && c.close < lv.price - zone * 1.2)) {
              levels.splice(m, 1);
            }
          }
        }

        if (fastAtr === null || fastAtr <= 0 || rsi === null || adx === null || chRange === null) continue;
        if (i < params.erPeriod || i < params.lookback) continue;

        const netMove = Math.abs(c.close - candles[i - params.erPeriod].close);
        let pathMove = 0;
        for (let m = i - params.erPeriod + 1; m <= i; m++) pathMove += Math.abs(candles[m].close - candles[m-1].close);
        const er = pathMove > 0 ? netMove / pathMove : 0;
        const volRatio = slowAtr !== null && slowAtr > 0 ? fastAtr / slowAtr : 1.0;
        const halfWidthAtr = ((chRange.highest - chRange.lowest) * 0.5) / fastAtr + 0.5;

        if (i === lastClosedIdx) {
          lastEr = er; lastAdx = adx; lastVolRatio = volRatio; lastHalfWidthAtr = halfWidthAtr;
        }

        if (er > params.maxEr || adx > params.maxAdx) continue;
        if (i <= spikeUntilIdx) continue;
        if (params.minVolRatio > 0 && volRatio < params.minVolRatio) continue;

        // Фильтр объёма (только если брокер отдаёт и включено)
        if (params.useVolumeFilter && market.hasVolume && avgVol > 0 && c.volume < avgVol * params.minVolumeMult) continue;

        const barRange = c.high - c.low;
        if (barRange <= 0 || barRange > refAtr * params.maxBarAtr) continue;

        const upperWick = c.high - Math.max(c.open, c.close);
        const lowerWick = Math.min(c.open, c.close) - c.low;

        let buyHit = false, sellHit = false, hitTouches = 0, hitDist = 999;

        for (let m = 0; m < levels.length; m++) {
          const lv = levels[m];
          if (lv.touches < params.minTouches) continue;
          if (params.minLevelSpan > 0 && lv.lastTouchIdx - lv.firstIdx < params.minLevelSpan) continue;

          const distAtr = Math.abs(c.close - lv.price) / fastAtr;
          if (params.maxDistAtr > 0 && distAtr > params.maxDistAtr) continue;

          if (lv.type === "resistance") {
            if (c.open < lv.price + zone * 0.3 &&
                c.high >= lv.price - zone && c.high <= lv.price + zone * 1.2 &&
                c.close < lv.price &&
                upperWick / barRange >= params.minWickRatio &&
                (c.high - c.close) / barRange >= params.minClosePos &&
                rsi >= params.rsiOb) {
              sellHit = true;
              if (lv.touches > hitTouches) hitTouches = lv.touches;
              if (distAtr < hitDist) hitDist = distAtr;
            }
          } else if (lv.type === "support") {
            if (c.open > lv.price - zone * 0.3 &&
                c.low <= lv.price + zone && c.low >= lv.price - zone * 1.2 &&
                c.close > lv.price &&
                lowerWick / barRange >= params.minWickRatio &&
                (c.close - c.low) / barRange >= params.minClosePos &&
                rsi <= params.rsiOs) {
              buyHit = true;
              if (lv.touches > hitTouches) hitTouches = lv.touches;
              if (distAtr < hitDist) hitDist = distAtr;
            }
          }
        }

        if ((buyHit && sellHit) || (!buyHit && !sellHit)) continue;

        const markerIdx = i + 1;
        if (markerIdx >= n) continue;

        // Фильтр старшего ТФ
        if (params.useHtfFilter && tfSec < htfSec && htfCandles.length > 0 && candles[markerIdx].time >= htfCandles[0].time + htfSec) {
          const hj = bars.indexAt(params.higherTf, candles[markerIdx].time);
          if (hj >= 0) {
            if (params.htfMode === "flat") {
              const hAdx = htfAdxVals[hj];
              if (hAdx < 0 || hAdx > params.htfFlatAdx) continue;
            } else if (params.htfMode === "slope") {
              if (buyHit && htfSlope[hj] === -1) continue;
              if (sellHit && htfSlope[hj] === 1) continue;
            } else {
              if (buyHit && htfTrendBlock[hj] === -1) continue;
              if (sellHit && htfTrendBlock[hj] === 1) continue;
            }
          }
        }

        const expBars = calcAdaptiveBars(tfSec, halfWidthAtr, volRatio, er);
        const exp = alignExpiration(expBars * tfSec, tfSec);

        if (markerIdx - lastMarkerIdx <= params.cooldownBars) continue;
        if (params.serialTrades && markerIdx < busyUntilIdx) continue;
        if (params.maxSignalsHour > 0) {
          while (sigIdxs.length > 0 && sigIdxs[0] <= markerIdx - hourBars) sigIdxs.shift();
          if (sigIdxs.length >= params.maxSignalsHour) continue;
        }
        lastMarkerIdx = markerIdx;
        busyUntilIdx = markerIdx + (exp.valid ? exp.bars : 1);
        sigIdxs.push(markerIdx);

        const dir = buyHit ? "buy" : "sell";
        const targetBar = candles[markerIdx];

        const protectionReason = pauseReasonAt(i);
        const isLiveSignal = markerIdx === n - 1;
        let liveReason = "";
        if (isLiveSignal) {
          if (isPayoutBlocked) liveReason = !payoutKnown ? "выплата неизвестна" : `выплата ${livePayout}% < ${params.minPayout}%`;
          else if (params.maxEntryDelaySec > 0 && time.now() - targetBar.time > params.maxEntryDelaySec) {
            liveReason = "поздний вход";
          }
        }
        const blockReason = protectionReason || liveReason || (!exp.valid ? "нет допустимой экспирации" : "");
        const emitted = blockReason === "";
        const outputAllowed = emitted && !paused;
        if (!emitted || (paused && markerIdx === n - 1 && emitted)) shadowCount += 1;

        if (outputAllowed) {
          markers.push({
            name: dir,
            time: targetBar.time,
            price: dir === "buy" ? targetBar.low : targetBar.high,
            position: dir === "buy" ? "belowBar" : "aboveBar",
            shape: dir === "buy" ? "arrowUp" : "arrowDown",
            color: dir === "buy" ? params.colorBuy : params.colorSell,
            expiration: exp.sec,
            text: `${dir === "buy" ? "CALL" : "PUT"} ${exp.sec}s`
          });
        }

        const statEntryIdx = i + 1;
        const statSettleIdx = i + exp.bars;
        if (statEntryIdx <= lastClosedIdx && exp.valid) {
          const slip = params.entrySlipAtr * fastAtr;
          const entryOpen = candles[statEntryIdx].open;
          pending.push({
            entryIdx: statEntryIdx,
            settleIdx: statSettleIdx,
            dir,
            expSec: exp.sec,
            expBars: exp.bars,
            entryPrice: dir === "buy" ? entryOpen + slip : entryOpen - slip,
            payoutFrac: virtualPayoutFrac,
            touches: hitTouches,
            emitted
          });
        }
      }

      // Отрисовка уровней
      const lastClose = candles[n - 1].close;
      let nearestRes = null, nearestSup = null, supCount = 0, resCount = 0;
      for (let m = 0; m < levels.length; m++) {
        const lv = levels[m];
        if (lv.touches < params.minTouches) continue;
        if (lv.type === "resistance") {
          resCount += 1;
          if (lv.price >= lastClose && (nearestRes === null || lv.price < nearestRes)) nearestRes = lv.price;
        } else {
          supCount += 1;
          if (lv.price <= lastClose && (nearestSup === null || lv.price > nearestSup)) nearestSup = lv.price;
        }
      }
      if (params.showLevels && nearestRes !== null) resPriceLine.applyOptions({ price: nearestRes, lineVisible: true, axisLabelVisible: true });
      else resPriceLine.applyOptions({ lineVisible: false, axisLabelVisible: false });
      if (params.showLevels && nearestSup !== null) supPriceLine.applyOptions({ price: nearestSup, lineVisible: true, axisLabelVisible: true });
      else supPriceLine.applyOptions({ lineVisible: false, axisLabelVisible: false });

      markersApi.setMarkers(markers);

      const decided = wins + losses;
      const wr = decided > 0 ? (wins / decided) * 100 : 0;
      const ev = settledCount > 0 ? (equity / settledCount) * 100 : 0;
      const avgExp = settledCount > 0 ? sumExpSec / settledCount : 0;

      const previewBars = calcAdaptiveBars(tfSec, lastHalfWidthAtr, lastVolRatio, lastEr);
      const previewExp = alignExpiration(previewBars * tfSec, tfSec);
      const previewSec = previewExp.sec;

      const isTrendBlocked = lastEr > params.maxEr || lastAdx > params.maxAdx;
      const spikeNow = spikeUntilIdx >= evalEnd;
      const reasonNow = pauseReasonAt(evalEnd);
      const todayPnl = dayPnl.get(time.dayStart(candles[n - 1].time)) || 0;

      let statusText = "Активен (ожидание сетапа)";
      let statusClass = "ok";
      if (paused) { statusText = "На паузе"; statusClass = "warn"; }
      else if (isPayoutBlocked) { statusText = !payoutKnown ? "Блок: выплата неизвестна" : `Блок: выплата ${livePayout}% < ${params.minPayout}%`; statusClass = "bad"; }
      else if (spikeNow) { statusText = "Пауза: всплеск волатильности"; statusClass = "warn"; }
      else if (reasonNow !== "") { statusText = `Пауза защиты: ${reasonNow}`; statusClass = "warn"; }
      else if (decided >= 20 && ev <= 0) { statusText = "Внимание: отрицательное МО"; statusClass = "bad"; }

      const brkKeys = Array.from(byBars.keys()).sort((a, b) => a - b);
      const brkText = brkKeys.length > 0 ? brkKeys.map(k => `${k}св ${byBars.get(k).w}/${byBars.get(k).l}`).join(" · ") : "нет данных";
      const touchText = `2: ${byTouch[0].w}/${byTouch[0].l} · 3+: ${byTouch[1].w}/${byTouch[1].l}`;

      ctx.hud.set({
        pair: market.label || market.pair || "Real",
        tf: time.tfName || `${tfSec}s`,
        payoutText: payoutKnown ? `Выплата ${livePayout}%` : "Выплата неизвестна",
        supCount, resCount, levelsTotal: supCount + resCount,
        regimeText: isTrendBlocked ? `Тренд ER ${fmt.num(lastEr, 2)} / ADX ${fmt.num(lastAdx, 0)}` : `Флэт ER ${fmt.num(lastEr, 2)} / ADX ${fmt.num(lastAdx, 0)}`,
        regimeClass: isTrendBlocked ? "warn" : "ok",
        expLabel: params.adaptiveMode ? `Адаптив ${previewSec}с (${previewExp.bars} св.)` : `Фикс ${previewSec}с`,
        wins, losses, draws,
        wrText: fmt.num(wr, 1), beText: fmt.num(breakevenWr, 1),
        wrClass: decided === 0 ? "" : wr >= breakevenWr ? "ok" : "bad",
        evText: (ev >= 0 ? "+" : "") + fmt.num(ev, 2),
        evClass: settledCount === 0 ? "" : ev > 0 ? "ok" : "bad",
        avgExpText: settledCount > 0 ? fmt.num(avgExp, 0) : String(previewSec),
        maxLossStreak,
        dirText: `CALL ${buyW}/${buyL} · PUT ${sellW}/${sellL}`,
        brkText, touchText,
        ddText: fmt.num(maxDd, 1),
        dayText: (todayPnl >= 0 ? "+" : "") + fmt.num(todayPnl, 1),
        dayClass: todayPnl > 0 ? "ok" : todayPnl < 0 ? "bad" : "",
        shadowCount, paused, statusText, statusClass
      });

      return markers;
    }
  };
}