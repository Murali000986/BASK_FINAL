import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Username and Password are required'); return; }
    setLoading(true);
    setError('');
    try {
      const { token } = await api.admin.login(username, password);
      localStorage.setItem('admin_token', token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#fafafa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        
        {/* Sleek B&W Card UI */}
        <div style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 16, padding: 40, boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <img src="/logo.png" alt="BASK Agency" style={{ height: 80, margin: '0 auto 20px', display: 'block' }} />
            <h2 style={{ margin: '0 0 6px', color: '#09090b', fontSize: 24, letterSpacing: '-0.03em' }}>Admin Portal</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>Authorized Personnel Only</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '14px 16px', marginBottom: 24, color: '#dc2626', fontSize: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="material-icons" style={{ fontSize: 20 }}>error_outline</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#3f3f46', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                autoFocus
                style={{ width: '100%', background: '#fff', border: '1px solid #e4e4e7', color: '#09090b', borderRadius: 10, padding: '14px 16px', fontSize: 15, transition: 'border-color 0.2s' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', color: '#3f3f46', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                style={{ width: '100%', background: '#fff', border: '1px solid #e4e4e7', color: '#09090b', borderRadius: 10, padding: '14px 16px', fontSize: 15, transition: 'border-color 0.2s' }}
              />
            </div>
            
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: '#09090b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? 'Authenticating…' : 'Sign In'}
            </button>
          </form>
        </div>
        
        <p style={{ textAlign: 'center', fontSize: 13, color: '#a1a1aa', marginTop: 24 }}>
          <a href="/" style={{ color: '#71717a', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => e.target.style.color = '#09090b'} onMouseLeave={e => e.target.style.color = '#71717a'}>
            ← Return to public site
          </a>
        </p>
      </div>
    </div>
  );
}
