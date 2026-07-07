import { Nav } from '../../components/Nav';

const cards = [
  ['Authentication', 'Server-seitige JWT-Login-Logik mit Admin- und Mitarbeiterrollen.'],
  ['Paper Trading', 'Simulierte Orders, Portfolio-Positionen und risikofreie Strategietests.'],
  ['AI Training', 'Datensatz-Registry und Trainingswarteschlange für spätere Python-Worker.'],
  ['Security', 'Keine Frontend-Geheimnisse, Rollenprüfungen, Audit-Logs und Admin-Übersicht.']
];

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="page-shell">
        <div className="mb-8">
          <p className="eyebrow">Control Center</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Alpha Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Die zentrale Oberfläche für Forschung, Simulation und interne Betriebssteuerung.</p>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {cards.map(([title, text]) => (
            <article className="card" key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-slate-300">{text}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
