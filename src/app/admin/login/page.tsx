'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#1d293d' }}
    >
      <div
        className="w-full max-w-md p-8 rounded"
        style={{ backgroundColor: '#0f172b', border: '1px solid #444444' }}
      >
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}
        >
          Admin Panel
        </h1>
        <p
          className="text-center mb-8 text-sm"
          style={{ color: '#314158', fontFamily: 'Geist, sans-serif' }}
        >
          Sign in to manage your business
        </p>

        {error && (
          <div
            className="p-3 rounded mb-6 text-sm"
            style={{ backgroundColor: '#fb2c36', color: '#ffffff' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#314158', fontFamily: 'Geist, sans-serif' }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#1d293d',
                border: '1px solid #444444',
                color: '#ffffff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#ac4bff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#444444';
              }}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: '#314158', fontFamily: 'Geist, sans-serif' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#1d293d',
                border: '1px solid #444444',
                color: '#ffffff',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#ac4bff';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#444444';
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded font-medium transition-opacity text-sm mt-6"
            style={{
              backgroundColor: '#ac4bff',
              color: '#ffffff',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div
          className="text-center mt-6 text-xs"
          style={{ color: '#314158', fontFamily: 'Geist, sans-serif' }}
        >
          Need help?{' '}
          <Link
            href="/"
            style={{ color: '#ac4bff', textDecoration: 'none' }}
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
