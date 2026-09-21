import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bask-footer">
      <div className="container">
        
        <div className="flex justify-between items-end mb-lg" style={{ borderBottom: '1px solid var(--gray-900)', paddingBottom: '32px' }}>
          <div>
            <p className="bask-text-small text-muted mb-8">Got a brief?</p>
            <h2 className="bask-headline-large" style={{ color: 'var(--white)' }}>Let's make the internet stare.</h2>
          </div>
          <Link to="/contact" className="bask-link-underline" style={{ color: 'var(--white)' }}>Write a brief</Link>
        </div>

        <div className="bask-footer-grid">
          <div>
            <p className="bask-text-small text-muted mb-16">Studio</p>
            <address style={{ fontStyle: 'normal', color: 'var(--white)', fontSize: '15px', lineHeight: '1.6' }}>
              No. 3-B, 3rd Floor<br/>
              Platinum Square, Coles Road<br/>
              Bangalore, India 560005
            </address>
            <p className="bask-text-small text-muted mb-8 mt-24" style={{ marginTop: 24 }}>Direct</p>
            <a href="mailto:hello@bask.studio" style={{ fontWeight: 600, fontSize: '15px' }}>hello@bask.studio</a>
          </div>

          <div>
            <p className="bask-text-small text-muted mb-16">Pages</p>
            <ul className="bask-footer-ul">
              <li><Link to="/case-studies">Work</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="bask-text-small text-muted mb-16">Elsewhere</p>
            <ul className="bask-footer-ul">
              <li><a href="https://medium.com/@digital_19576" target="_blank" rel="noopener noreferrer">Medium</a></li>
              <li><a href="https://www.linkedin.com/company/baskworldwide-creative/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/weare_bask/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="bask-footer-bottom">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--white)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            Bask
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>© 2026 Bask Creative — Built for impact.</p>
            <p style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600 }}>Bangalore · India · Bold ideas. Striking executions</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
