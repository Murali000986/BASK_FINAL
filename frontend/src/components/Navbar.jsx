import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const logout = () => supabase.auth.signOut();

  return (
    <>
      <nav className="bask-navbar">
        <div className="bask-navbar-inner">
          <Link to="/" className="bask-logo">Bask.</Link>
          
          <div className="bask-nav-links">
            <NavLink to="/case-studies">Work</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/showcase">Showcase</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            {user ? (
              <button onClick={logout} style={{ background: 'none', border: '1px solid #e4e4e7', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#09090b' }}>Sign Out</button>
            ) : (
              <Link to="/login" className="bask-nav-cta">Sign In</Link>
            )}
            <Link to="/onboarding" className="bask-nav-cta" style={{ background: '#FFE600', color: '#09090b' }}>Write a brief</Link>
          </div>

          <button className={`bask-hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`bask-mobile-nav ${isOpen ? 'open' : ''}`}>
        <NavLink to="/case-studies" onClick={() => setIsOpen(false)}>Work</NavLink>
        <NavLink to="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</NavLink>
        <NavLink to="/careers" onClick={() => setIsOpen(false)}>Careers</NavLink>
        <NavLink to="/showcase" onClick={() => setIsOpen(false)}>Showcase</NavLink>
        <NavLink to="/faq" onClick={() => setIsOpen(false)}>FAQ</NavLink>
        {user ? (
          <button onClick={() => { logout(); setIsOpen(false); }} style={{ background: 'none', border: '1px solid #e4e4e7', padding: '12px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#09090b', textAlign: 'center', marginTop: 8 }}>Sign Out</button>
        ) : (
          <Link to="/login" className="btn btn--outline" onClick={() => setIsOpen(false)} style={{ marginTop: 8, justifyContent: 'center' }}>Sign In</Link>
        )}
        <Link to="/onboarding" className="btn btn--primary" onClick={() => setIsOpen(false)} style={{ marginTop: 8, justifyContent: 'center' }}>Write a brief</Link>
      </div>
    </>
  );
}
