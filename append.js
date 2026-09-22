const fs = require('fs');
const path = 'frontend/src/index.css';
const css = `
/* ── Navbar & Form Redesign ─────────────────────────────────── */
.bask-navbar { position: sticky; top: 0; background: var(--white); z-index: 1000; border-bottom: 1px solid var(--gray-200); }
.bask-navbar-inner { width: 100%; max-width: 1400px; margin: 0 auto; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
.bask-logo { font-size: 28px; font-weight: 900; letter-spacing: -0.05em; color: var(--black); text-decoration: none; }
.bask-nav-links { display: flex; gap: 32px; align-items: center; }
.bask-nav-links a { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--black); transition: opacity 0.2s; text-decoration: none; }
.bask-nav-links a.active { opacity: 0.5; }
.bask-nav-links a:hover { opacity: 0.5; }
.bask-nav-cta { border-bottom: 2px solid var(--black); padding-bottom: 2px; }
.bask-hamburger { display: none; flex-direction: column; gap: 6px; padding: 8px; background: transparent; border: none; cursor: pointer; }
.bask-hamburger span { width: 28px; height: 3px; background: var(--black); transition: 0.3s; }
.bask-hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
.bask-hamburger.open span:nth-child(2) { opacity: 0; }
.bask-hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
.bask-mobile-nav { display: none; }

@media(max-width: 900px) {
  .bask-nav-links { display: none; }
  .bask-hamburger { display: flex; }
  .bask-mobile-nav.open { display: flex; flex-direction: column; background: var(--white); position: fixed; top: 73px; left: 0; width: 100%; height: calc(100vh - 73px); padding: 24px; z-index: 999; }
  .bask-mobile-nav a { font-size: 24px; font-weight: 800; border-bottom: 1px solid var(--gray-200); padding: 20px 0; color: var(--black); letter-spacing: -0.02em; text-decoration: none; }
}

.bask-form-input {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--black);
  padding: 16px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--black);
  background: transparent;
  outline: none;
  border-radius: 0;
  transition: opacity 0.2s;
}
.bask-form-input::placeholder { color: var(--gray-400); font-weight: 500; }
.bask-form-input:focus { border-bottom-color: var(--black); opacity: 0.8; }
`;
fs.appendFileSync(path, css);
console.log('Appended to file');
