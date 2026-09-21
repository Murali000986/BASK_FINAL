import { useSEO } from '../hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About — Bask Creative Agency',
    description: 'Bask is a multidisciplinary studio for brands who refuse to blend in. Founded by operators, creatives, and data-scientists in Bangalore.',
    path: '/about',
  });

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">About us</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          A multidisciplinary studio for brands who refuse to blend in.
        </h1>
      </div>

      <div className="container pb-lg">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
          alt="Bask team collaborating in Bangalore studio" 
          style={{ width: '100%', height: '500px', objectFit: 'cover' }} 
        />
      </div>

      <div className="container pb-lg">
        <div className="grid-2 gap-lg align-start">
          <h2 className="bask-headline-large">We aren't a traditional agency.</h2>
          <div>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--gray-700)', marginBottom: 24 }}>
              Founded in 2018 in Bangalore, Bask was built to break the mold of bloated, slow-moving traditional agencies. We exist to build brands that internet culture actually cares about.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--gray-600)', marginBottom: 40 }}>
              Because we are founded by product operators, data scientists, and creative strategists, there are no black boxes here. When you partner with us, you work directly with the experts pulling the levers. No account management bloat; just direct execution at the highest level of craft.
            </p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16 }}>Our Philosophy</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                "1. Radical transparency in all data.",
                "2. Creative craft over generic templates.",
                "3. Strategic speed over bureaucratic perfection."
              ].map(p => (
                <li key={p} style={{ fontWeight: 600, fontSize: '1.1rem', paddingBottom: 16, borderBottom: '1px solid var(--gray-200)' }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
