import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    try {
      await api.subscribe(email);
      setStatus('Subscribed!');
      setEmail('');
    } catch {
      setStatus('Error — try again');
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__logo" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src="/logo.png" alt="BASK Agency" style={{ height: 48 }} />
            </div>
            <p className="footer__tagline">Helping B2B and B2C brands scale acquisition with measurable ROI.</p>
            <address className="footer__address" style={{ fontStyle: 'normal' }}>
              Bengaluru, Karnataka, India — 560001<br />
              <a href="mailto:hello@baskgrowth.xyz">hello@baskgrowth.xyz</a>
            </address>
          </div>
          <div>
            <p className="footer__col-head">Company</p>
            <div className="footer__links">
              <Link to="/about">About & Team</Link>
              <Link to="/case-studies">Case Studies</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact & Get a Proposal</Link>
            </div>
          </div>
          <div>
            <p className="footer__col-head">Services</p>
            <div className="footer__links">
              <Link to="/services">Paid Media</Link>
              <Link to="/services">Growth Strategy</Link>
              <Link to="/services">Analytics & Data</Link>
              <Link to="/services">Creative & CRO</Link>
            </div>
          </div>
          <div>
            <p className="footer__col-head">Stay in the loop</p>
            <form className="footer__subscribe" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn--primary btn--sm">
                {status || 'Subscribe'}
              </button>
            </form>
            <div className="footer__social">
              <a href="https://share.google/NPrUXz7rn1IGZtOAF" target="_blank" rel="noopener noreferrer" aria-label="Google">Google</a>
              <a href="https://x.com/BASKGROWTH" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
              <a href="https://www.instagram.com/bask.growth?stkn=MTJ0ZGJzdDhlcTRwZw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
              <a href="https://www.facebook.com/share/19VtjLQRUh/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2015–2026 BASK Agency. All rights reserved.</p>
          <div>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
