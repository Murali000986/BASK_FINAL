import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1.5px solid #e4e4e7',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  transition: 'border 0.2s',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  background: '#fafafa',
};

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    // If already logged in, redirect home
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/');
    });
  }, [navigate]);

  const setError = (text) => setMsg({ type: 'error', text });
  const setSuccess = (text) => setMsg({ type: 'success', text });

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields.');
    setLoading(true); setMsg({ type: '', text: '' });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate('/');
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields.');
    setLoading(true); setMsg({ type: '', text: '' });
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    });
    setLoading(false);
    if (error) return setError(error.message);
    setSuccess('Account created! Check your email to confirm your account.');
  }

  async function handleForgot(e) {
    e.preventDefault();
    if (!email) return setError('Enter your email address.');
    setLoading(true); setMsg({ type: '', text: '' });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`
    });
    setLoading(false);
    if (error) return setError(error.message);
    setSuccess('Password reset link sent! Check your inbox.');
  }

  async function handleGoogle() {
    setLoading(true); setMsg({ type: '', text: '' });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    });
    if (error) { setLoading(false); setError(error.message); }
  }

  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', background: '#FAFAFA', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        background: '#fff', borderRadius: 28, padding: '48px 44px', width: '100%',
        maxWidth: 460, boxShadow: '0 12px 48px rgba(0,0,0,0.07)', border: '1px solid #e4e4e7'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src="/logo.png" alt="BASK" style={{ height: 44, marginBottom: 12 }} />
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
            {isLogin ? 'Welcome back' : isSignup ? 'Create an account' : 'Reset password'}
          </h1>
          <p style={{ color: '#71717a', fontSize: 14, marginTop: 6 }}>
            {isLogin ? "Sign in to your BASK account" : isSignup ? 'Join the BASK community' : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {/* Alert */}
        {msg.text && (
          <div style={{
            marginBottom: 20, padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            background: msg.type === 'error' ? '#fef2f2' : '#f0fdf4',
            color: msg.type === 'error' ? '#dc2626' : '#16a34a',
            border: `1px solid ${msg.type === 'error' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {msg.type === 'error' ? '⚠ ' : '✓ '}{msg.text}
          </div>
        )}

        {/* Google Button */}
        {!isForgot && (
          <>
            <button onClick={handleGoogle} disabled={loading}
              style={{
                width: '100%', padding: '13px 16px', border: '1.5px solid #e4e4e7', borderRadius: 10,
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                color: '#09090b', marginBottom: 20
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              {/* Google Icon SVG */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: '#e4e4e7' }} />
              <span style={{ fontSize: 13, color: '#a1a1aa', fontWeight: 500 }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#e4e4e7' }} />
            </div>
          </>
        )}

        {/* Email/Password Form */}
        <form onSubmit={isLogin ? handleLogin : isSignup ? handleSignup : handleForgot}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {isSignup && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                style={inputStyle} placeholder="John Doe" />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              style={inputStyle} placeholder="john@example.com" autoComplete="email" />
          </div>

          {!isForgot && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                style={inputStyle} placeholder="••••••••" autoComplete={isLogin ? 'current-password' : 'new-password'} />
            </div>
          )}

          {isLogin && (
            <button type="button" onClick={() => setMode('forgot')}
              style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'right', padding: 0, marginTop: -8 }}>
              Forgot password?
            </button>
          )}

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', border: 'none', borderRadius: 10,
              background: loading ? '#d4d4d8' : '#FFE600', color: '#09090b',
              fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', marginTop: 4, letterSpacing: '0.02em'
            }}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : isSignup ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#71717a' }}>
          {isForgot ? (
            <button onClick={() => setMode('login')}
              style={{ background: 'none', border: 'none', color: '#09090b', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
              ← Back to Sign In
            </button>
          ) : isLogin ? (
            <>Don't have an account?{' '}
              <button onClick={() => setMode('signup')}
                style={{ background: 'none', border: 'none', color: '#09090b', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Sign up free
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: '#09090b', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
