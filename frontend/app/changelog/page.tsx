'use client';

import { Nav } from '../../components/Nav';

const entries = [
  {
    version: 'v0.3',
    date: '07.07.2026',
    title: 'KI-Test- und Sicherheits-Expansion',
    details: 'Neue KI-Testseite, Admin-Login, Nutzer-Login, Sicherheitsabschnitt auf About und mehr strukturierte UI.'
  },
  {
    version: 'v0.2',
    date: '06.07.2026',
    title: 'Trading-Demo und Live-Preis',
    details: 'Live-Bitcoin-Kurs, KI-Signale, fiktives Trading-Konto und dynamische Trading-Ansicht.'
  },
  {
    version: 'v0.1',
    date: '05.07.2026',
    title: 'Grundstruktur der Website',
    details: 'Landingpage, Dashboard, Login, About, Paper Trading und Backend-Setup.'
  }
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-8">
          <p className="eyebrow">Release Notes</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Changelog</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Alle wichtigen Änderungen und Erweiterungen der Plattform in einer übersichtlichen Historie.</p>
        </div>

        <div className="space-y-5">
          {entries.map((entry) => (
            <article key={entry.version} className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{entry.version}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{entry.title}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-slate-400">{entry.date}</span>
              </div>
              <p className="mt-4 text-slate-300">{entry.details}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
