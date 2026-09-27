import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { requestPasswordReset } from '../api/client';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to log in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setResetLink('');
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(username);
      setResetMessage(result.resetLink ? 'Local reset link is ready. Open it to choose a password.' : 'If an eligible account matches that email, a password-reset link has been sent.');
      setResetLink(result.resetLink || '');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'We could not process your request.');
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
        <form onSubmit={resetMode ? handlePasswordReset : handleSubmit} className="space-y-4">
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
          {!resetMode && <div className="relative">
            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-white/70">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-signal-400 focus:outline-none"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white"><i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true" /></button>
          </div>}
          {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
          {resetMessage && <p role="status" className="text-xs text-emerald-300">{resetMessage}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full px-4 py-2.5 text-sm font-bold transition-colors disabled:opacity-50"
          >
            {submitting ? 'Please wait…' : resetMode ? 'Send reset link' : 'Sign In'}
          </button>
          {resetLink && (
            <a
              href={resetLink}
              className="block rounded-md border border-signal-400/40 bg-signal-400/10 px-3 py-2 text-center text-xs font-semibold text-signal-200 hover:bg-signal-400/15"
            >
              Open local reset link
            </a>
          )}
          <button
            type="button"
            onClick={() => { setResetMode((value) => !value); setError(''); setResetMessage(''); setResetLink(''); }}
            className="w-full text-center text-xs font-semibold text-signal-300 hover:text-signal-200"
          >
            {resetMode ? 'Back to sign in' : 'Forgot your password?'}
          </button>
        </form>
      </div>
    </div>
  );
}
