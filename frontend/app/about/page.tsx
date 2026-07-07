'use client';

import { useState } from 'react';
import { Nav } from '../../components/Nav';

const sections = [
  {
    title: 'Overview',
    body: 'LazinoTrading AI ist eine private, KI-gestützte Trading-Forschungsplattform für Strategieentwicklung, Paper Trading, Marktanalyse und Machine-Learning-Experimente.'
  },
  {
    title: 'Features',
    body: 'Umfasst KI-gestützte Strategieerzeugung, Paper Trading, Sicherheitskontrollen, Admin-Funktionen und eine skalierbare Trainingsarchitektur.'
  },
  {
    title: 'Architecture',
    body: 'Die Plattform ist modular aufgebaut aus Frontend, Backend, AI-Core, Paper-Trading, Security, Datenbank und Tests.'
  },
  {
    title: 'Security Principles',
    body: 'Vertrauliche Zugangsdaten bleiben im Backend, Authentifizierung läuft serverseitig, Rollen und Audit-Logs sind zentral geregelt.'
  },
  {
    title: 'Roadmap',
    body: 'Phase 1 deckt Website, Authentifizierung, Admin Center, Paper Trading und AI Training ab; spätere Phasen erweitern Learning, Backtesting und ML.'
  }
];

const stack = [
  ['Frontend', 'Next.js, React, TypeScript, Tailwind CSS'],
  ['Backend', 'Node.js, Express, REST API'],
  ['Database', 'PostgreSQL, Redis'],
  ['AI & ML', 'Python, TensorFlow, PyTorch, Scikit-Learn'],
  ['Deployment', 'Docker, GitHub, Linux Server']
];

export default function AboutPage() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [knowledgeNote, setKnowledgeNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submitKnowledge() {
    if (!youtubeLink.trim()) {
      setKnowledgeNote('Bitte füge mindestens einen YouTube-Link hinzu.');
      return;
    }

    setKnowledgeNote(`Wissensinput gespeichert: ${youtubeLink}. Die KI kann diesen Input später für Trainings- und Lernschritte verwenden.`);
    setSubmitted(true);
    setYoutubeLink('');
  }

  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Trust & Structure</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">LazinoTrading AI</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Eine sichere und moderne Plattform für Trading-Forschung, simulierte Strategien und kontrollierte KI-Entwicklung.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="card">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-slate-300">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="card mt-8">
          <h2 className="text-2xl font-semibold">So funktioniert die KI</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold text-white">1. Daten sammeln</h3>
              <p className="mt-2 text-sm text-slate-300">Die KI verarbeitet Marktpreise, Paper-Trading-Ergebnisse und strukturierte Trainingssignale.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold text-white">2. Muster erkennen</h3>
              <p className="mt-2 text-sm text-slate-300">Anhand von Trends und Historie erkennt sie wahrscheinliche Einstiegspunkte oder Risikobereiche.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold text-white">3. Hinweise geben</h3>
              <p className="mt-2 text-sm text-slate-300">Die KI zeigt dann grün für gute Einstiege, gelb für neutral und rot für hohe Gefahr.</p>
            </div>
          </div>
        </section>

        <section className="card mt-8">
          <h2 className="text-2xl font-semibold">KI-Wissen für Admins</h2>
          <p className="mt-3 text-slate-300">Admins können der KI über YouTube-Links neues Wissen zuführen. Dieses wird später als Trainings- und Lernquelle genutzt.</p>
          <div className="mt-6 space-y-4">
            <input
              className="input"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <button className="btn" onClick={submitKnowledge}>Wissensinput speichern</button>
            {knowledgeNote && (
              <div className={`rounded-2xl border p-4 text-sm ${submitted ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-amber-400/30 bg-amber-500/10 text-amber-200'}`}>
                {knowledgeNote}
              </div>
            )}
          </div>
        </section>

        <section className="card mt-8">
          <h2 className="text-2xl font-semibold">So halten wir alles sicher</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <h3 className="font-semibold text-emerald-200">HTTPS & Verschlüsselung</h3>
              <p className="mt-2 text-sm text-slate-300">Alle sensiblen Daten werden verschlüsselt übertragen, damit keine ungeschützten Verbindungen oder Man-in-the-Middle-Angriffe entstehen.</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
              <h3 className="font-semibold text-cyan-200">Passwort-Sicherheit</h3>
              <p className="mt-2 text-sm text-slate-300">Passwörter werden nicht im Klartext gespeichert, sondern sicher gehasht und serverseitig verarbeitet.</p>
            </div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
              <h3 className="font-semibold text-amber-200">Brute-Force-Schutz</h3>
              <p className="mt-2 text-sm text-slate-300">Login-Versuche werden begrenzt, um automatisierte Angriffe und Passwort-Guessing zu erschweren.</p>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4">
              <h3 className="font-semibold text-rose-200">Rollenbasierter Zugriff</h3>
              <p className="mt-2 text-sm text-slate-300">Admins und Nutzer erhalten nur die Bereiche, die für ihre Rolle sinnvoll und erlaubt sind.</p>
            </div>
          </div>
        </section>

        <section className="card mt-8">
          <h2 className="text-2xl font-semibold">Technology Stack</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {stack.map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card mt-8">
          <h2 className="text-2xl font-semibold">Mission</h2>
          <p className="mt-3 text-slate-300">
            LazinoTrading AI soll eine sichere, intelligente und kontrollierte Trading-Forschungsumgebung schaffen, die sich stetig durch Daten, Tests und KI-Analysen verbessert – bei voller Kontrolle über Risiko und Sicherheit.
          </p>
        </section>
      </main>
    </>
  );
}
