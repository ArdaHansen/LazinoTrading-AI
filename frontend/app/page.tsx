import Link from 'next/link';

const highlights = [
  {
    title: 'KI-gestützte Marktanalyse',
    text: 'Analysiere Marktimpulse, News und interne Signale in einer gemeinsamen Oberfläche.'
  },
  {
    title: 'Paper Trading ohne Risiko',
    text: 'Teste Strategien mit virtuellen Mitteln, ohne reale Positionen einzugehen.'
  },
  {
    title: 'Sichere Admin- und Nutzersteuerung',
    text: 'Kontrolliere Rollen, Zugriffe und systemische Zustände zentral und transparent.'
  }
];

const trustPoints = [
  'Live-Demo mit realitätsnahen Markt- und Preisansichten',
  'Klare Struktur für Forschung, Test und Team-Workflow',
  'Sichere Auth- und Rollenlogik für interne Nutzung'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_45%),linear-gradient(135deg,_#05070a,_#0f172a)] px-6 py-16 text-slate-100 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Private AI Trading Platform</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              LazinoTrading AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
              Eine moderne Plattform für Trading-Forschung, Marktbeobachtung, KI-Tests und sichere Demo-Workflows – elegant aufgebaut, flexibel erweiterbar und sofort verständlich.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn" href="/login">
                Zum Login
              </Link>
              <Link className="rounded-xl border border-cyan-400/30 px-5 py-3 font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10" href="/dashboard">
                Dashboard öffnen
              </Link>
              <Link className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10" href="/about">
                Mehr über die Plattform
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">MVP bereit</span>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200">Live-Demo</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">Für Forschung & Präsentation</span>
            </div>
          </div>

          <div className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Was Sie erwartet</p>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <li key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <h2 className="text-base font-semibold text-white">{item.title}</h2>
                  </div>
                  <p className="mt-2 pl-5 text-sm leading-6 text-slate-300">{item.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Status: MVP bereit für lokale Nutzung, Präsentation und Weiterentwicklung.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card">
          <p className="eyebrow">Warum diese Plattform</p>
          <h2 className="mt-3 text-3xl font-semibold">Klarer Aufbau für echte Nutzung</h2>
          <p className="mt-4 text-slate-300">
            Die Oberfläche wurde bewusst so gestaltet, dass Nutzer sofort verstehen, wo sie sich befinden: im Dashboard, im Trading-Demo-Workspace, im KI-Testbereich oder im Admin-Tooling.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="eyebrow">Produktvision</p>
          <h2 className="mt-3 text-3xl font-semibold">Vom Demo-Setup zur seriösen Research-Umgebung</h2>
          <p className="mt-4 text-slate-300">
            LazinoTrading AI verbindet aktuelle UX, strukturierte Workflows und eine überzeugende Story rund um KI, Risiko und Marktbeobachtung – ideal für interne Tests, Kundenpräsentationen und zukünftige Produktstufen.
          </p>
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
            Ziel: ein verständliches, professionelles und erweiterbares Trading-Research-Produkt mit echten Use-Cases.
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Nächster Schritt</p>
            <h2 className="text-3xl font-semibold">Bereit für den nächsten Schritt?</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Öffne das Dashboard, starte die Trading-Demo oder schaue dir die Plattformstruktur im About-Bereich an.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn" href="/dashboard">Zum Dashboard</Link>
            <Link className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10" href="/paper-trading">Paper Trading starten</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
