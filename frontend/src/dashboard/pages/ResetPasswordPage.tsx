import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api/client';

export default function ResetPasswordPage() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!uid || !token) { setError('This password-reset link is invalid.'); return; }
    if (password !== confirmation) { setError('The passwords do not match.'); return; }
    setSubmitting(true);
    try {
      await confirmPasswordReset(uid, token, password);
      navigate('/dashboard/login', { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'We could not reset your password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-primary-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[.04] p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-signal-500 text-primary-950"><i className="ri-lock-password-line text-2xl" aria-hidden="true" /></span>
          <h1 className="mt-4 font-heading text-xl font-bold text-white">Choose a new password</h1>
          <p className="mt-1 text-sm text-white/60">CPCM Dashboard</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="mb-1 block text-xs font-semibold text-white/70">New password</label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 pr-10 text-sm text-white focus:border-signal-400 focus:outline-none"
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white">
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1 block text-xs font-semibold text-white/70">Confirm new password</label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmation ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 pr-10 text-sm text-white focus:border-signal-400 focus:outline-none"
              />
              <button type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? 'Hide password confirmation' : 'Show password confirmation'} className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white">
                <i className={showConfirmation ? 'ri-eye-off-line' : 'ri-eye-line'} aria-hidden="true" />
              </button>
            </div>
          </div>
          {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full px-4 py-2.5 text-sm font-bold disabled:opacity-50">{submitting ? 'Saving...' : 'Reset password'}</button>
        </form>
        <Link to="/dashboard/login" className="mt-4 block text-center text-xs font-semibold text-signal-300 hover:text-signal-200">Back to sign in</Link>
      </div>
    </div>
  );
}
