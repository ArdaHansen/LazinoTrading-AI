'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@lazinotrading.ai');
  const [password, setPassword] = useState('LazinoAdmin123!');
  const [roleLabel, setRoleLabel] = useState('Admin- oder Mitarbeiterzugang');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const response = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setError('Nutzername oder Passwort ungültig.');
      setLoading(false);
      return;
    }

    const data = await response.json();
    localStorage.setItem('ltai_token', data.token);
    localStorage.setItem('ltai_user', JSON.stringify(data.user));
    localStorage.setItem('ltai_session_id', data.sessionId || '');
    setRoleLabel(data.user?.role === 'admin' ? 'Admin-Zugang aktiviert' : 'Mitarbeiter-Zugang aktiviert');
    router.push(data.user?.role === 'admin' ? '/admin' : '/dashboard');
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_35%),linear-gradient(135deg,_#05070a,_#111827)] px-6 py-10">
      <form onSubmit={login} className="card w-full max-w-md">
        <p className="eyebrow">Secure Access</p>
        <h1 className="text-3xl font-bold tracking-tight">Employee Login</h1>
        <p className="mt-2 text-sm text-slate-400">Internes Login für die Trading-Research-Umgebung.</p>
        <p className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">{roleLabel}</p>
        <div className="mt-8 space-y-4">
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" type="password" />
        </div>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        <button className="btn mt-6 w-full" type="submit" disabled={loading}>
          {loading ? 'Anmeldung läuft…' : 'Anmelden'}
        </button>
        <p className="mt-4 text-center text-xs text-slate-500">Demo-Zugang: admin@lazinotrading.ai / LazinoAdmin123!</p>
      </form>
    </main>
  );
}
