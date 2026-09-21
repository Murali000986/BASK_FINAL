import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/logo.png" alt="BASK Agency" style={{ height: 48 }} />
          </Link>
          <div className="navbar__nav">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => 'navbar__link' + (isActive ? ' active' : '')}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="navbar__actions">
            <Link to="/contact" className="btn btn--primary btn--sm">Get a Proposal</Link>
            <button
              className={`navbar__hamburger${open ? ' open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map(l => <NavLink key={l.to} to={l.to} end={l.to === '/'}>{l.label}</NavLink>)}
        <Link to="/contact" className="btn btn--primary">Get a Proposal</Link>
      </div>
    </>
  );
}
