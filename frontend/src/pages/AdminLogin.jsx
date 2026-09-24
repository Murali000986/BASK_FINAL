import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LOGO_STYLE = { height: 48, marginBottom: 24 };

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

const btnStyle = (disabled) => ({
  width: '100%',
  padding: '14px',
  background: disabled ? '#d4d4d8' : '#09090b',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700,
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background 0.2s',
  marginTop: 8,
});

const TABS = ['Password', 'Magic Link', 'Forgot Password'];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const clearMsg = () => setMsg({ type: '', text: '' });

  async function loginWithPassword(e) {
    e.preventDefault();
    if (!email || !password) return setMsg({ type: 'error', text: 'Please fill in all fields.' });
    setLoading(true); clearMsg();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMsg({ type: 'error', text: error.message });
    navigate('/admin/dashboard');
  }

  async function sendMagicLink(e) {
    e.preventDefault();
    if (!email) return setMsg({ type: 'error', text: 'Enter your email address.' });
    setLoading(true); clearMsg();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` }
    });
    setLoading(false);
    if (error) return setMsg({ type: 'error', text: error.message });
    setMsg({ type: 'success', text: `Magic link sent to ${email}! Check your inbox.` });
  }

  async function forgotPassword(e) {
    e.preventDefault();
    if (!email) return setMsg({ type: 'error', text: 'Enter your email address.' });
    setLoading(true); clearMsg();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/dashboard`
    });
    setLoading(false);
    if (error) return setMsg({ type: 'error', text: error.message });
    setMsg({ type: 'success', text: `Password reset email sent to ${email}!` });
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24, fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '48px 40px', width: '100%',
        maxWidth: 440, boxShadow: '0 8px 40px rgba(0,0,0,0.06)', border: '1px solid #e4e4e7'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="BASK" style={LOGO_STYLE} />
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Admin Portal</h1>
          <p style={{ color: '#71717a', fontSize: 14, marginTop: 6 }}>Sign in to manage BASK Agency</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f4f4f5', borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); clearMsg(); }}
              style={{
                flex: 1, padding: '9px 6px', fontSize: 12, fontWeight: 600, border: 'none', borderRadius: 8,
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#09090b' : '#71717a',
                boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}>
              {t}
            </button>
          ))}
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

        {/* Password Login */}
        {tab === 'Password' && (
          <form onSubmit={loginWithPassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="admin@baskgrowth.xyz" autoComplete="email" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <button type="button" onClick={() => setTab('Forgot Password')}
              style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'center', marginTop: 4 }}>
              Forgot your password?
            </button>
          </form>
        )}

        {/* Magic Link (Email OTP) */}
        {tab === 'Magic Link' && (
          <form onSubmit={sendMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.6, margin: 0 }}>
              We'll email you a secure, one-click login link. No password required.
            </p>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="admin@baskgrowth.xyz" />
            </div>
            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? 'Sending...' : 'Send Magic Link ✨'}
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {tab === 'Forgot Password' && (
          <form onSubmit={forgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.6, margin: 0 }}>
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="admin@baskgrowth.xyz" />
            </div>
            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button type="button" onClick={() => setTab('Password')}
              style={{ background: 'none', border: 'none', color: '#71717a', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
              ← Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
