'use client';

import { useEffect, useMemo, useState } from 'react';
import { Nav } from '../../components/Nav';

type CandlePoint = {
  time: string;
  price: number;
  change24h: number;
};

type DemoTrade = {
  id: number;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
};

type MarketAsset = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  signal: 'green' | 'amber' | 'red';
  description: string;
};

const PRICE_API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tesla&vs_currencies=usd&include_24hr_change=true';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 4 }).format(value);
}

export default function PaperTradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('bitcoin');
  const [price, setPrice] = useState(68000);
  const [change24h, setChange24h] = useState(0);
  const [history, setHistory] = useState<CandlePoint[]>([]);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState(5000);
  const [cash, setCash] = useState(100000);
  const [btc, setBtc] = useState(0);
  const [message, setMessage] = useState('Live-Daten werden geladen…');
  const [trades, setTrades] = useState<DemoTrade[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadPrice() {
      try {
        const response = await fetch(PRICE_API);
        if (!response.ok) throw new Error('Preis konnte nicht geladen werden');
        const data = await response.json();
        if (cancelled) return;

        const selected = data[selectedSymbol] || data.bitcoin;
        const nextPrice = selected.usd;
        const nextChange = selected.usd_24h_change ?? 0;
        setPrice(nextPrice);
        setChange24h(nextChange);
        setHistory((prev) => {
          const nextPoint = {
            time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            price: nextPrice,
            change24h: nextChange
          };
          return [...prev, nextPoint].slice(-32);
        });
        setMessage(`KI-Analyse aktualisiert für ${selectedSymbol.toUpperCase()}`);
      } catch {
        setMessage('Live-Feed nicht verfügbar – Demo-Daten werden weitergeführt');
      }
    }

    loadPrice();
    const interval = window.setInterval(loadPrice, 10000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [selectedSymbol]);

  const signal = useMemo(() => {
    if (history.length < 4) {
      return {
        label: 'Warten',
        tone: 'amber',
        text: 'Noch zu wenig Daten für eine klare KI-Einschätzung.',
        score: 50
      };
    }

    const latest = history[history.length - 1].price;
    const previous = history[history.length - 2].price;
    const recentAverage = history.slice(-5).reduce((sum, point) => sum + point.price, 0) / 5;
    const longAverage = history.slice(-12).reduce((sum, point) => sum + point.price, 0) / Math.min(12, history.length);
    const momentum = ((latest - previous) / previous) * 100;

    if (momentum > 0.75 && latest > recentAverage && latest > longAverage) {
      return {
        label: 'Guter Einstieg',
        tone: 'green',
        text: 'Die KI sieht einen starken Aufwärtstrend und empfiehlt einen vorsichtigen Einstieg.',
        score: 88
      };
    }

    if (momentum < -0.9 || latest < recentAverage) {
      return {
        label: 'Hohe Gefahr',
        tone: 'red',
        text: 'Die KI signalisiert erhöhtes Risiko – besser erst abwarten.',
        score: 18
      };
    }

    return {
      label: 'Neutral',
      tone: 'amber',
      text: 'Kurs bewegt sich seitwärts – ein Einstieg bleibt eher konservativ.',
      score: 62
    };
  }, [history]);

  const chartPath = useMemo(() => {
    if (history.length < 2) return '';

    const width = 560;
    const height = 220;
    const values = history.map((point) => point.price);
    const min = Math.min(...values) * 0.995;
    const max = Math.max(...values) * 1.005;

    return history
      .map((point, index) => {
        const x = (index / (history.length - 1)) * width;
        const y = height - ((point.price - min) / (max - min || 1)) * height;
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [history]);

  const assets: MarketAsset[] = [
    { symbol: 'bitcoin', name: 'Bitcoin', price: 68000, change24h: 2.4, signal: 'green', description: 'Starker Trend und gute Einstiegschancen.' },
    { symbol: 'ethereum', name: 'Ethereum', price: 3500, change24h: -0.8, signal: 'amber', description: 'Konsolidierung mit mittlerem Risiko.' },
    { symbol: 'solana', name: 'Solana', price: 180, change24h: 1.6, signal: 'green', description: 'Momentum positiv bei guter Volatilität.' },
    { symbol: 'tesla', name: 'Tesla', price: 240, change24h: -1.2, signal: 'red', description: 'Sichere Abwarten-Phase wegen schwächerem Momentum.' }
  ];

  const selectedAsset = assets.find((asset) => asset.symbol === selectedSymbol) ?? assets[0];
  const equity = cash + btc * price;

  function placeTrade() {
    if (amount <= 0) {
      setMessage('Bitte einen gültigen Betrag eingeben.');
      return;
    }

    if (side === 'buy') {
      if (cash < amount) {
        setMessage('Nicht genug fiktives Guthaben vorhanden.');
        return;
      }

      const boughtBtc = amount / price;
      setCash((prev) => prev - amount);
      setBtc((prev) => prev + boughtBtc);
      setTrades((prev) => [{ id: Date.now(), side: 'buy' as const, amount, price, timestamp: new Date().toLocaleTimeString('de-DE') }, ...prev].slice(0, 6));
      setMessage(`Kauf angelegt: ${formatCompact(boughtBtc)} BTC für ${formatCurrency(amount)}.`);
      return;
    }

    if (btc <= 0) {
      setMessage('Es ist kein BTC im fiktiven Portfolio vorhanden.');
      return;
    }

    const sellAmount = Math.min(amount / price, btc);
    const usdValue = sellAmount * price;
    setCash((prev) => prev + usdValue);
    setBtc((prev) => prev - sellAmount);
    setTrades((prev) => [{ id: Date.now(), side: 'sell' as const, amount: usdValue, price, timestamp: new Date().toLocaleTimeString('de-DE') }, ...prev].slice(0, 6));
    setMessage(`Verkauf angelegt: ${formatCompact(sellAmount)} BTC für ${formatCurrency(usdValue)}.`);
  }

  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Live Demo Trading</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Global Market Arena</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Beobachte mehrere Assets der Börse, erhalte KI-Signale und teste Trades mit fiktivem Guthaben.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
            Status: {message}
          </div>
        </div>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {assets.map((asset) => {
            const toneClass = asset.signal === 'green' ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : asset.signal === 'red' ? 'border-rose-400/20 bg-rose-500/10 text-rose-200' : 'border-amber-400/20 bg-amber-500/10 text-amber-200';
            return (
              <button key={asset.symbol} onClick={() => setSelectedSymbol(asset.symbol)} className={`rounded-2xl border p-4 text-left transition ${selectedSymbol === asset.symbol ? 'ring-2 ring-cyan-400/40' : 'hover:bg-white/10'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{asset.name}</p>
                    <p className="text-xs text-slate-400">{asset.symbol.toUpperCase()}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${toneClass}`}>{asset.signal === 'green' ? 'Gut' : asset.signal === 'red' ? 'Riskant' : 'Neutral'}</span>
                </div>
                <p className="mt-3 text-lg font-semibold">{formatCurrency(asset.price)}</p>
                <p className={`mt-1 text-sm ${asset.change24h >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(1)}%</p>
              </button>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{selectedAsset.symbol.toUpperCase()} / USD</p>
                <h2 className="mt-2 text-4xl font-black">{formatCurrency(price)}</h2>
                <p className={`mt-2 text-sm font-semibold ${change24h >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}% in 24h
                </p>
              </div>
              <div className={`rounded-full px-3 py-1 text-sm font-semibold ${signal.tone === 'green' ? 'bg-emerald-500/15 text-emerald-200' : signal.tone === 'red' ? 'bg-rose-500/15 text-rose-200' : 'bg-amber-500/15 text-amber-200'}`}>
                {signal.label}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
              <svg viewBox="0 0 560 220" className="h-56 w-full">
                <line x1="0" y1="220" x2="560" y2="220" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="0" y1="170" x2="560" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="0" y1="120" x2="560" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="0" y1="70" x2="560" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <path d={chartPath} fill="none" stroke={signal.tone === 'green' ? '#34d399' : signal.tone === 'red' ? '#fb7185' : '#fbbf24'} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">KI-Signal</p>
              <div className={`mt-4 rounded-2xl border px-4 py-4 ${signal.tone === 'green' ? 'border-emerald-400/30 bg-emerald-500/10' : signal.tone === 'red' ? 'border-rose-400/30 bg-rose-500/10' : 'border-amber-400/30 bg-amber-500/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{signal.label}</span>
                  <span className="text-sm font-semibold">{signal.score}/100</span>
                </div>
                <p className="mt-3 text-sm text-slate-200">{selectedAsset.description}</p>
              </div>
            </div>

            <div className="card">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fiktives Konto</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-slate-400">Cash</p>
                  <p className="mt-2 text-xl font-semibold">{formatCurrency(cash)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-slate-400">Position</p>
                  <p className="mt-2 text-xl font-semibold">{formatCompact(btc)} ₿</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                <p className="text-sm text-cyan-100">Gesamtwert</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(equity)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="card">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Demo Order</p>
            <div className="mt-4 space-y-4">
              <select className="input" value={side} onChange={(e) => setSide(e.target.value as 'buy' | 'sell')}>
                <option value="buy">Kaufen</option>
                <option value="sell">Verkaufen</option>
              </select>
              <input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Betrag in USD" />
              <button className="btn w-full" onClick={placeTrade}>Trade ausführen</button>
              <p className="rounded-2xl bg-black/20 p-3 text-sm text-slate-300">{message}</p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Letzte Trades</p>
              <span className="text-sm text-slate-400">Nur Demo</span>
            </div>
            <div className="mt-4 space-y-3">
              {trades.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">Noch keine fiktiven Trades ausgeführt.</div>
              ) : (
                trades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <div>
                      <p className={`font-semibold ${trade.side === 'buy' ? 'text-emerald-300' : 'text-rose-300'}`}>{trade.side === 'buy' ? 'Kauf' : 'Verkauf'}</p>
                      <p className="text-xs text-slate-400">{trade.timestamp}</p>
                    </div>
                    <div className="text-right text-sm text-slate-200">
                      <p>{formatCurrency(trade.amount)}</p>
                      <p className="text-slate-400">@ {formatCurrency(trade.price)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
