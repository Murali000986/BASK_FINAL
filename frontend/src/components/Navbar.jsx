import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <NavLink to="/faq">FAQ</NavLink>
            <Link to="/contact" className="bask-nav-cta">Write a brief</Link>
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
        <NavLink to="/faq" onClick={() => setIsOpen(false)}>FAQ</NavLink>
        <Link to="/contact" className="btn btn--primary" onClick={() => setIsOpen(false)} style={{ marginTop: 24, justifyContent: 'center' }}>Write a brief</Link>
      </div>
    </>
  );
}
