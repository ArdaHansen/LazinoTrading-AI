'use client';

import { useState } from 'react';
import { Nav } from '../../components/Nav';

const testCases = [
  { title: 'Trend-Erkennung', description: 'Die KI bewertet, ob ein Marktaufwärtstrend stark genug für einen Einstieg ist.' },
  { title: 'Risiko-Analyse', description: 'Die KI prüft, ob der aktuelle Marktimpuls zu riskant für einen frühen Einstieg ist.' },
  { title: 'News-Impact', description: 'Die KI ordnet neue News- und Ereignisimpulse ein und schlägt eine vorsichtige Reaktion vor.' }
];

export default function TrainingPage() {
  const [prompt, setPrompt] = useState('Bitcoin zeigt starke Bewegung nach einem positiven ETF-Impuls.');
  const [result, setResult] = useState('Die KI ist bereit. Gib ihr einen Test-Input und sie erstellt eine erste Einschätzung.');

  function runTest() {
    const normalized = prompt.toLowerCase();

    if (normalized.includes('bitcoin') || normalized.includes('etf')) {
      setResult('KI-Einschätzung: Grün – starker Aufwärtstrend mit guter Chance auf einen strukturierten Einstieg.');
      return;
    }

    if (normalized.includes('krise') || normalized.includes('inflation') || normalized.includes('fed')) {
      setResult('KI-Einschätzung: Rot – hoher Unsicherheitsfaktor und erhöhte Gefahr für einen frühen Einstieg.');
      return;
    }

    setResult('KI-Einschätzung: Gelb – Markt bleibt neutral und sollte vorsichtig beobachtet werden.');
  }

  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-8">
          <p className="eyebrow">AI Experiments</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">KI-Testzentrum</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Hier können erste Tests mit der KI durchgeführt werden – mit Marktimpulsen, News-Inputs und Einstiegssignalen.</p>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="card">
            <h2 className="text-2xl font-semibold">KI-Test-Panel</h2>
            <textarea
              className="input mt-4 min-h-32"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Gib einen Markt- oder News-Input ein..."
            />
            <button className="btn mt-4" onClick={runTest}>KI analysieren lassen</button>
            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
              {result}
            </div>
          </div>

          <div className="space-y-4">
            {testCases.map((testCase) => (
              <article key={testCase.title} className="card">
                <h3 className="text-lg font-semibold">{testCase.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{testCase.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
