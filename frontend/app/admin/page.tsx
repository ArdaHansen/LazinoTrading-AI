'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nav } from '../../components/Nav';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const initialSources = [
  'BTC-Analyse-Feed',
  'Makro-News-Feed',
  'Regulatorische Hinweise',
  'Trading-Community Insights'
];

export default function AdminPage() {
  const router = useRouter();
  const [system, setSystem] = useState('Noch nicht geladen');
  const [sources, setSources] = useState(initialSources);
  const [newSource, setNewSource] = useState('');
  const [newsInput, setNewsInput] = useState('');
  const [aiSummary, setAiSummary] = useState('Die KI analysiert derzeit Marktbewegungen, News-Impulse und interne Trainingssignale.');

  useEffect(() => {
    const token = localStorage.getItem('ltai_token');
    const storedUser = localStorage.getItem('ltai_user');

    if (!token) {
      router.replace('/login');
      return;
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'admin') {
          router.replace('/dashboard');
        }
      } catch {
        router.replace('/login');
      }
    }
  }, [router]);

  async function loadSystem() {
    const token = localStorage.getItem('ltai_token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const response = await fetch(`${API}/api/admin/system`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        router.replace('/dashboard');
        return;
      }
      setSystem('Systemstatus konnte nicht geladen werden.');
      return;
    }

    const data = await response.json();
    setSystem(JSON.stringify(data, null, 2));
  }

  function addSource() {
    const trimmed = newSource.trim();
    if (!trimmed) return;
    setSources((prev) => [...prev, trimmed]);
    setNewSource('');
  }

  const aiAnalysis = useMemo(() => {
    const base = newsInput.trim().toLowerCase();
    if (!base) {
      return 'Warte auf neue News oder Inputs, um die KI-Analyse zu aktualisieren.';
    }

    if (base.includes('fed') || base.includes('zinsen') || base.includes('inflation')) {
      return 'Die KI bewertet diesen Input als makro-driven und empfiehlt vorsichtige Positionierung mit reduzierter Risikoexposition.';
    }

    if (base.includes('bitcoin') || base.includes('etf') || base.includes('regulierung')) {
      return 'Die KI sieht einen klaren Marktimpuls und empfiehlt eine beobachtende, aber potenziell positive Einstiegshaltung.';
    }

    return 'Die KI verarbeitet den Input als allgemeinen Marktimpuls und hält die Strategie neutral bis vorsichtig.';
  }, [newsInput]);

  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-8">
          <p className="eyebrow">Admin Tools</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Administration Center</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Admins können der KI Wissensquellen geben, News-Impulse einordnen und automatische Analysen überwachen.</p>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="card">
            <h2 className="text-2xl font-semibold">KI-Input & Lernquellen</h2>
            <p className="mt-3 text-slate-300">Gib der KI neue Quellen, Inhalte oder Hinweise, die sie bei zukünftigen Analysen berücksichtigen soll.</p>

            <div className="mt-6 space-y-4">
              <input className="input" value={newSource} onChange={(e) => setNewSource(e.target.value)} placeholder="Neue Quelle oder Anweisung" />
              <button className="btn" onClick={addSource}>Quelle hinzufügen</button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {sources.map((source) => (
                <span key={source} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
                  {source}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-semibold">Auto-Analyse der KI</h2>
            <p className="mt-3 text-slate-300">Die KI analysiert neue Markt- und News-Inputs selbstständig und formuliert daraus eine Einschätzung.</p>
            <textarea
              className="input mt-4 min-h-32"
              value={newsInput}
              onChange={(e) => setNewsInput(e.target.value)}
              placeholder="Beispiel: ETF-Zulassung, Fed-Statement, Bitcoin-ETF, geopolitische Nachrichten..."
            />
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <p className="font-semibold">KI-Einschätzung</p>
              <p className="mt-2">{aiAnalysis}</p>
            </div>
          </div>
        </section>

        <section className="card mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Systemstatus</h2>
              <p className="mt-2 text-slate-300">Lade den aktuellen Status der internen Plattform und der KI-Integration.</p>
            </div>
            <button className="btn" onClick={loadSystem}>Systemstatus laden</button>
          </div>
          <pre className="mt-6 overflow-auto rounded-2xl bg-black/40 p-4 text-sm text-slate-300">{system}</pre>
        </section>
      </main>
    </>
  );
}
