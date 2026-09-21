import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const TIMELINE = [
  { year: '2015', text: 'Founded in San Francisco — first team of product marketers and data scientists.' },
  { year: '2018', text: 'Expanded to EMEA and launched performance-based pilot program with revenue-share option.' },
  { year: '2021', text: 'Achieved Google Premier Partner status and introduced full-funnel analytics product.' },
  { year: '2024', text: 'Scaled to 60+ specialists, delivered multi-million dollar growth programs for enterprise clients.' },
];

const VALUES = ['Data-Driven Decisions', 'Client-First Mindset', 'Cross-Functional Teams', 'Continuous Learning', 'Transparency & Ownership'];

const PARTNERS = [
  { icon: 'g_translate', name: 'Google Premier Partner' },
  { icon: 'chat', name: 'Meta Business Partner' },
  { icon: 'hub', name: 'HubSpot Solutions Partner' },
  { icon: 'shopping_cart', name: 'Shopify Expert' },
  { icon: 'credit_card', name: 'Stripe Partner' },
];

export default function About() {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.getTeam().then(setTeam).catch(() => {});
  }, []);

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>

      {/* ── Hero ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'center', marginBottom: 64 }}>
        <div>
          <h1 style={{ marginBottom: 20 }}>We build predictable revenue engines.</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24, fontWeight: 500 }}>
            BASK Agency replaces the "black box" with pure transparency. We align our incentives with yours—delivering growth through rigorous testing and zero vanity metrics.
          </p>
          {[
            'Acquisition, retention, and LTV optimization.',
            'Live dashboards and weekly KPI tracking.',
            'Risk-free trial pilots and performance-aligned retainers.',
          ].map(t => (
            <p key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 12 }}>
              <span className="material-icons" style={{ fontSize: 16, marginTop: 3, color: 'var(--black)' }}>check_circle</span>
              <span style={{ fontSize: 14, color: 'var(--gray-700)', fontWeight: 500 }}>{t}</span>
            </p>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Link to="/contact" className="btn btn--primary">Talk to us</Link>
            <button className="btn btn--outline">Download Deck</button>
          </div>
        </div>
        <div style={{ height: 320, background: 'var(--black)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team Huddle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar" style={{ marginBottom: 64 }}>
        {[
          { v: 'Average 3.4x Growth', d: 'Median revenue lift across paid channels in first 6 months' },
          { v: '14-Day Pilot', d: 'Risk-free trial to validate approach and initial impact' },
          { v: 'Performance Aligned', d: 'Option for revenue-share or bonus tied to agreed KPIs' },
        ].map(s => (
          <div key={s.v} className="stat-item">
            <p className="stat-item__value" style={{ fontSize: '1.1rem' }}>✦</p>
            <p className="stat-item__label">{s.v}</p>
            <p className="stat-item__desc">{s.d}</p>
          </div>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="about-grid">
        <div>
          {/* Story / Timeline */}
          <div className="card" style={{ marginBottom: 32 }}>
            <h2 style={{ marginBottom: 6 }}>Our Story</h2>
            <p style={{ fontSize: 14, marginBottom: 20 }}>
              Founded in 2015 by growth practitioners from top startups and agencies, BASK Agency
              combines product, marketing, and analytics expertise to deliver sustainable growth.
              We prioritize repeatable processes, technical integrations, and creative rigor.
            </p>
            <div className="timeline">
              {TIMELINE.map(t => (
                <div key={t.year} className="timeline-item">
                  <span className="timeline-item__year">{t.year}</span>
                  <p className="timeline-item__text">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Culture & Values */}
          <div className="card" style={{ marginBottom: 32 }}>
            <h2 style={{ marginBottom: 16 }}>Culture & Values</h2>
            <div className="value-tags" style={{ marginBottom: 24 }}>
              {VALUES.map(v => <span key={v} className="value-tag" style={{ background: 'var(--black)', color: 'var(--white)', borderColor: 'var(--black)' }}>{v}</span>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                '1553877522-431f50afc596',
                '1517048676732-d61def652ce8',
                '1542744094-114d07619d85',
              ].map((img, i) => (
                <div key={i} style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                  <img src={`https://images.unsplash.com/photo-${img}?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`} alt="office culture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Model */}
          <div className="card">
            <h2 style={{ marginBottom: 20 }}>Client Engagement Model & Guarantees</h2>
            <div className="two-col" style={{ gap: 32 }}>
              <div>
                <h4 style={{ marginBottom: 16, fontSize: '1.1rem' }}>How we work</h4>
                {[
                  'Discovery — 1 week deep-dive and analytics audit.',
                  '14-Day Pilot — We validate hypotheses.',
                  'Scale — Continuous rapid testing.',
                  'Governance — Weekly dashboards, no secrets.',
                ].map((t, idx) => <p key={t} style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', marginBottom: 12 }}><span style={{ color: 'var(--gray-400)', marginRight: 6 }}>0{idx+1}</span> {t}</p>)}
              </div>
              <div>
                <h4 style={{ marginBottom: 12 }}>Guarantees</h4>
                {[
                  ['Risk-free trial', 'Pilot KPIs are not met within 14 days.'],
                  ['Performance alignment', 'Bonus based on agreed uplift.'],
                  ['Transparent billing', 'Clear scoping and monthly statements.'],
                ].map(([k, v]) => (
                  <p key={k} style={{ fontSize: 13, marginBottom: 8 }}>
                    <strong>{k}</strong> — <span style={{ color: 'var(--gray-600)' }}>{v}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
          {/* Executive Team */}
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Executive Team</h3>
            {(team?.executive || []).map(m => (
              <div key={m.name} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div className="team-card__avatar" style={{ width: 40, height: 40, fontSize: 12, flexShrink: 0 }}>{m.avatar}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 4 }}>{m.role}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.5 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Team */}
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 14 }}>Core Team</h3>
            {(team?.core || []).map(m => (
              <p key={m.name} style={{ fontSize: 13, marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="material-icons" style={{ fontSize: 14, color: 'var(--gray-400)' }}>person</span>
                {m.role} — {m.name}
              </p>
            ))}
          </div>

          {/* Partners */}
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 14 }}>Partners & Technology</h3>
            <div className="partners-grid">
              {PARTNERS.map(p => (
                <div key={p.name} className="partner-item">
                  <span className="material-icons">{p.icon}</span>
                  <span style={{ fontSize: 12 }}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Careers */}
          <div className="card">
            <h3 style={{ marginBottom: 10 }}>Careers</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 16 }}>
              We're hiring interdisciplinary talent: performance marketers, data engineers, creatives, and account strategists.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--primary btn--sm">View Open Roles</button>
              <button className="btn btn--outline btn--sm">Refer a Friend</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
