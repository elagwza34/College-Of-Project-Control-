import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-primary-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[.04] p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-signal-500 text-primary-950">
            <i className="ri-shield-keyhole-line text-2xl" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-heading text-xl font-bold text-white">Dashboard Login</h1>
          <p className="mt-1 text-sm text-white/60">College of Project Controls</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-xs font-semibold text-white/70">Email</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-signal-400 focus:outline-none"
              placeholder="you@collegeofprojectcontrols.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-white/70">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-signal-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full px-4 py-2.5 text-sm font-bold transition-colors disabled:opacity-50"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
