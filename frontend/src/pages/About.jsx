import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const SKILLS = [
  { label: 'SEO Services', pct: 95 },
  { label: 'Social Media Management', pct: 90 },
  { label: 'Website Development', pct: 93 },
  { label: 'Website Analytics', pct: 80 },
  { label: 'Paid Search', pct: 85 },
  { label: 'App Store Optimisation', pct: 78 },
];

const CLIENTS_LOGOS = [
  'Tata Housing', 'Orient Cement', 'Restolex', 'Ziphop',
  'Acharya B-School', 'Foundation School', 'PEPS', 'CONCORDE',
];

export default function About() {
  useSEO({
    title: 'About — BASK Creative Agency',
    description: 'BASK is a multidisciplinary digital marketing studio in Bangalore. We blend creativity with feasibility — no black boxes, no cookie-cutter plans.',
    path: '/about',
  });

  return (
    <div className="bask-page">

      {/* ── Hero ── */}
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">About us</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          Follow the path — or create your own.
        </h1>
        <p className="animate-fade-up delay-200" style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--gray-600)', maxWidth: 680, marginTop: 16 }}>
          At BASK, we are dedicated worshippers of the latter.
        </p>
      </div>

      {/* ── Team Photo ── */}
      <div className="container pb-lg">
        <div className="img-shimmer-wrapper img-color-halo" style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="BASK team collaborating in Bangalore studio"
            className="img-animated-card"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* ── Who We Are ── */}
      <div className="container pb-lg">
        <div className="grid-2 gap-lg align-start">
          <div>
            <p className="bask-text-small text-muted fw-600 mb-8">WHO WE ARE</p>
            <h2 className="bask-headline-large">We aren't a traditional agency.</h2>
          </div>
          <div>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--gray-700)', marginBottom: 20 }}>
              BASK Agency is one of those unique digital marketing providers in Bangalore which blends creativity with feasibility. We offer a plethora of services — SEO, SEM, SMM, Complete Digital Marketing, Website Design & Development, E-Commerce Solutions, Content Management Systems and other IT-related projects.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--gray-600)', marginBottom: 20 }}>
              We do not believe in getting lost in the crowd. So we differentiate ourselves by delivering what we promise. Although we offer digital marketing solutions at unbelievably attractive packages, quality is something we never compromise on.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--gray-600)' }}>
              We at BASK do not believe that our work is over once the service is delivered. We believe that it <em>begins</em> after the service is generated, with the ripples it creates. Our purpose is to imprint value to a brand so that it knits a wonderful tell-tale.
            </p>
          </div>
        </div>
      </div>

      {/* ── Core Purpose / Values / Passion ── */}
      <div style={{ margin: '0 20px', borderRadius: 28, overflow: 'hidden' }} className="py-xl">
        <div style={{ background: '#111', borderRadius: 28 }} className="py-xl">
          <div className="container">
            <p className="bask-text-small fw-600 mb-8" style={{ color: '#FFE600', letterSpacing: 2 }}>OUR FOUNDATIONS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginTop: 32 }}>
              {[
                { title: 'Core Purpose', icon: 'flag', accent: '#7c3aed', text: 'To imprint lasting value on every brand we work with — so it glows brightest in the digital space and tells stories worth remembering.' },
                { title: 'Core Values', icon: 'verified', accent: '#0891b2', text: 'Radical transparency. Creative craft over generic templates. Strategic speed over bureaucratic perfection. We deliver what we promise.' },
                { title: 'Our Passion', icon: 'favorite', accent: '#e11d48', text: 'We want to create success stories. We are not done when the service is delivered — we track the ripples it creates and double-down on what works.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#111', borderRadius: 20, padding: '36px 32px', minHeight: 240, display: 'flex', flexDirection: 'column', gap: 16, borderTop: `4px solid ${item.accent}` }}>
                  <span className="material-icons" style={{ fontSize: 40, color: item.accent, display: 'block' }}>{item.icon}</span>
                  <h3 style={{ fontWeight: 800, fontSize: 20, margin: 0, color: '#fff' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── How to Choose Section / FAQ ── */}
      <div className="container py-xl">
        <p className="bask-text-small text-muted fw-600 mb-8">YOUR QUESTIONS, ANSWERED</p>
        <h2 className="bask-section-heading mb-32">How to choose the best digital marketing agency in Bangalore.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            {
              q: 'What does a digital marketing agency do?',
              a: 'A digital marketing agency grows your business online by combining SEO, paid search and social ads, content, web design, conversion rate optimization, and analytics into one coordinated strategy rather than separate vendors. The best agency is the one whose verifiable results, transparency, and experience match your goals and budget.',
            },
            {
              q: 'How much does digital marketing cost in Bangalore?',
              a: 'Digital marketing in Bangalore typically costs ₹25,000 to ₹2,00,000+ per month depending on the channels and scope of work. BASK plans are scoped after a free consultation. Anything unusually cheap rarely funds real strategy, content, and ad management together.',
            },
            {
              q: 'What to look for in a digital marketing agency?',
              a: null,
              bullets: [
                'Full-channel capability in-house: SEO, paid media, social, content, web and analytics — coordinated as one strategy.',
                'Verifiable results and named case studies, not vanity metrics.',
                'Transparent reporting: live GA4, Search Console and ad dashboards.',
                'Goals tied to revenue and qualified leads, not just impressions or rankings.',
                'Real Bangalore and India experience.',
                'Honest, realistic timelines — no "guaranteed #1" promises.',
              ],
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--gray-200)', padding: '28px 0' }}>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{item.q}</h3>
              {item.a && <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)', margin: 0 }}>{item.a}</p>}
              {item.bullets && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.6 }}>
                      <span className="material-icons" style={{ fontSize: 18, color: 'var(--black)', flexShrink: 0 }}>check_circle</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Skill Bars ── */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }} className="py-xl">
        <div className="container">
          <p className="bask-text-small text-muted fw-600 mb-8">WHAT WE EXCEL AT</p>
          <h2 className="bask-section-heading mb-32">Our expertise at a glance.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {SKILLS.map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  <span>{s.label}</span>
                  <span>{s.pct}%</span>
                </div>
                <div style={{ background: 'var(--gray-200)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: 'var(--black)', borderRadius: 99, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Clients Grid ── */}
      <div className="container py-xl">
        <p className="bask-text-small text-muted fw-600 mb-8">TRUSTED BY</p>
        <h2 className="bask-section-heading mb-32">Some of the clients we have worked with.</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {CLIENTS_LOGOS.map(c => (
            <span key={c} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="container pb-xl text-center">
        <h2 className="bask-headline-huge mb-24">Ready to grow with BASK?</h2>
        <Link to="/contact" className="btn btn--primary btn--lg">Let's talk →</Link>
      </div>

    </div>
  );
}
