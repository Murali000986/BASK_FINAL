import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const QUICK_CONTACT = {
  phone: '+1 (415) 555-0132',
  email: 'hello@growthpartner.agency',
};

const FAQS = [
  { q: 'How does onboarding work?', a: 'Onboarding starts with a discovery session (1–2 hours), followed by data collection and kickoff. Typical onboarding is 2–3 weeks to complete audits and establish an initial roadmap.' },
  { q: 'What is the reporting cadence?', a: 'We provide weekly updates during active optimization, monthly performance reports, and quarterly strategic reviews with leadership-level insights and recommended pivots.' },
  { q: 'When can we expect results?', a: 'Timing depends on the service: paid campaigns often show measurable lifts within 4–12 weeks; SEO and content requires 3–6 months for consistent organic growth.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className={`faq-item__q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {q}
        <span className="material-icons">expand_more</span>
      </button>
      {open && <p className="faq-item__a">{a}</p>}
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);

  useSEO({
    title: 'Digital Marketing Services Bangalore — Google Ads, SEO, CRO & More',
    description: 'Full-funnel digital marketing services in Bengaluru: Paid Media (Google & Meta Ads), Technical SEO, CRO, Email Lifecycle Marketing. Data-driven results for Indian brands.',
    path: '/services',
  });

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <div>
      {/* Page Hero */}
      <div className="container">
        <div className="page-hero">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
            <div>
              <p className="page-hero__tag">Services</p>
              <h1 className="page-hero__title" style={{ maxWidth: 640 }}>Growth Architecture, Delivered.</h1>
              <p className="page-hero__sub" style={{ maxWidth: 500 }}>
                We don't sell random deliverables. We engineer end-to-end growth engines. Select a service to see our deliverables, approach, and case studies.
              </p>
              <div className="page-hero__actions">
                <Link to="/contact" className="btn btn--primary">Book Strategy Call</Link>
                <button className="btn btn--outline">Download Methods PDF</button>
              </div>
            </div>
            <div style={{ width: 280, height: 180, background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" alt="Data Analytics Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Services + Sidebar */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, paddingBottom: 80, alignItems: 'start' }}>
        <div>
          {services.map(s => (
            <div key={s.id} className="service-detail">
              <div className="service-detail__header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="service-detail__label-badge">{s.label}</span>
                  <h2 style={{ fontSize: '1.3rem' }}>{s.title}</h2>
                </div>
                <div className="service-detail__actions">
                  <Link to="/contact" className="btn btn--primary btn--sm">Book a Strategy Call</Link>
                  <button className="btn btn--outline btn--sm">Download One-Pager</button>
                </div>
              </div>
              <div className="service-detail__body">
                <p className="service-detail__desc">{s.description}</p>
                <div className="service-detail__cols">
                  <div>
                    <p className="service-detail__col-head">Key Deliverables</p>
                    <ul className="service-detail__list">
                      {s.deliverables.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="service-detail__col-head">Typical Timelines</p>
                    <ul className="service-detail__list">
                      {s.timelines.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="service-detail__col-head">Strategic Focus</p>
                    <ul className="service-detail__list">
                      {s.approach ? s.approach.map(a => <li key={a}>{a}</li>) : s.pricing?.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
                {s.caseHighlight && (
                  <div className="highlight-card">
                    <p className="highlight-card__label">Case Highlight: {s.caseHighlight.label}</p>
                    <p className="highlight-card__text">{s.caseHighlight.result}</p>
                    <p className="highlight-card__metric">Metric: {s.caseHighlight.metric}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sidebar-card" style={{ marginBottom: 24 }}>
            <h3>Quick Contact</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>
              Schedule a call or send us a brief and we'll respond within 1 business day.
            </p>
            <p style={{ fontSize: 13, marginBottom: 4 }}><strong>Phone</strong></p>
            <p style={{ fontSize: 13, marginBottom: 12 }}>{QUICK_CONTACT.phone}</p>
            <p style={{ fontSize: 13, marginBottom: 4 }}><strong>Email</strong></p>
            <a href={`mailto:${QUICK_CONTACT.email}`} style={{ fontSize: 13, color: 'var(--black)' }}>{QUICK_CONTACT.email}</a>

            <p style={{ fontSize: 13, fontWeight: 700, margin: '20px 0 12px' }}>Book a slot</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input type="text" placeholder="Full name" />
              <input type="email" placeholder="Work email" />
              <input type="text" placeholder="Company" />
              <input type="date" defaultValue="2026-10-01" />
              <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>Request Call</button>
            </div>
          </div>

          <div className="sidebar-card" style={{ marginBottom: 24 }}>
            <h3>Download One-Pagers</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {['Growth Strategy.pdf', 'Performance Marketing.pdf', 'SEO & Content.pdf'].map(f => (
                <div key={f} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                  <span>{f}</span>
                  <button className="btn btn--outline btn--sm">Download</button>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>FAQs</h3>
            <div className="faq-list" style={{ marginTop: 12 }}>
              {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
