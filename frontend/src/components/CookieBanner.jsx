import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('bask_cookies_accepted');
    if (!accepted) {
      // Delay slightly so it slides up smoothly
      const t = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 9999, background: '#09090b', color: '#fff',
      padding: '20px 24px', borderRadius: 16, boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
      display: 'flex', alignItems: 'center', gap: 24, maxWidth: 380, animation: 'fadeUp 0.4s ease-out'
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: '#f4f4f5' }}>
          We use cookies to improve your experience and analyze site traffic.
        </p>
      </div>
      <button 
        onClick={() => {
          localStorage.setItem('bask_cookies_accepted', 'true');
          setShow(false);
        }}
        style={{
          background: '#fff', color: '#09090b', border: 'none', padding: '10px 16px',
          borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
        }}
      >
        Accept
      </button>
    </div>
  );
}
