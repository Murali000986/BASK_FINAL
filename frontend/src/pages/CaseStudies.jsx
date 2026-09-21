import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const INDUSTRIES = ['All Industries', 'eCommerce', 'SaaS', 'Healthcare', 'Fintech', 'B2B'];
const SERVICE_TYPES = ['All Services', 'Paid Media', 'Conversion Rate Optimization', 'SEO & Content', 'Product Analytics', 'Creative Strategy'];
const ICONS = ['storefront', 'science', 'local_hospital', 'account_balance_wallet', 'lock', 'groups'];

export default function CaseStudies() {
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All Industries');
  const [service, setService] = useState('All Services');
  const [team, setTeam] = useState(null);
  const [activeCase, setActiveCase] = useState(null);

  useEffect(() => {
    api.getCaseStudies().then(setCases).catch(() => {});
    api.getTeam().then(setTeam).catch(() => {});
  }, []);

  const filtered = cases.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q);
    const matchInd = industry === 'All Industries' || c.industry === industry;
    const matchSvc = service === 'All Services' || c.serviceType === service;
    return matchSearch && matchInd && matchSvc;
  });

  return (
    <div>
      {/* Page Hero */}
      <div className="container">
        <div className="page-hero">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
            <div>
              <p className="page-hero__tag">Case Studies</p>
              <h1 className="page-hero__title">Case Studies</h1>
              <p className="page-hero__sub">
                Explore in-depth growth engagements where we delivered measurable results across user acquisition,
                conversion optimization and revenue growth. Filter by industry, service type, and project duration
                to find relevant success stories.
              </p>
            </div>
            <div className="card" style={{ minWidth: 200 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 6 }}>Featured Results</p>
              <p style={{ fontWeight: 800, fontSize: '1.6rem' }}>Average +98% Growth</p>
              <hr className="divider" style={{ margin: '12px 0' }} />
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 8 }}>Quick CTA</p>
              <Link to="/contact" className="btn btn--primary btn--sm" style={{ width: '100%', justifyContent: 'center' }}>Request a Growth Audit</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container" style={{ paddingBottom: 32 }}>
        <div className="filter-bar">
          <div className="filter-bar__search">
            <span className="material-icons" style={{ fontSize: 16, color: 'var(--gray-400)' }}>search</span>
            <input placeholder="Search case studies…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>Industry:</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)}>
              {INDUSTRIES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>Service Type:</label>
            <select value={service} onChange={e => setService(e.target.value)}>
              {SERVICE_TYPES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <p style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 'auto' }}>Showing {filtered.length} case studies</p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, alignItems: 'start' }}>
          <div>
            <div className="case-grid">
              {filtered.map((c, i) => (
                <div key={c.id} className="card">
                  <div className="case-card__thumb" style={{ overflow: 'hidden' }}>
                    <img src={`https://images.unsplash.com/photo-${c.image || '1551288049-bebda4e38f71'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--black)', marginBottom: 4 }}>{c.challenge}</p>
                  <p className="case-card__metric">{c.metric}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 16 }}>Client: {c.client}</p>
                  <div className="case-card__footer">
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className="tag">{c.industry}</span>
                      <span className="tag">{c.serviceType}</span>
                    </div>
                    <button className="btn btn--primary btn--sm" onClick={() => setActiveCase(c)}>View Case</button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-400)' }}>
                <span className="material-icons" style={{ fontSize: 40, marginBottom: 12 }}>search_off</span>
                <p>No case studies match your filters.</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button className="btn btn--outline">← Previous</button>
              <button className="btn btn--primary">Load More</button>
            </div>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 12 }}>Showing 1–{filtered.length} of {cases.length} case studies</p>
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 8 }}>Top Insights</p>
              <div style={{ height: 80, background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', marginBottom: 12, display: 'flex', alignItems: 'flex-end', padding: 8, gap: 4 }}>
                {[40, 55, 70, 90, 65, 80, 95].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--black)', borderRadius: 2 }} />
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 8, marginTop: 24 }}>Client Quote</p>
              <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--gray-700)', lineHeight: 1.6, marginBottom: 12 }}>
                "BASK redesigned our funnel and scaled CAC-efficient users within months."
              </p>
              <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>— Maria Vega, Head of Growth, Lumen Home Goods</p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Request a Growth Audit</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" placeholder="Your name" className="input--styled" style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--gray-300)' }} />
                <input type="email" placeholder="Email address" className="input--styled" style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--gray-300)' }} />
                <input type="text" placeholder="Company" className="input--styled" style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--gray-300)' }} />
                <select className="input--styled" style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--gray-300)' }}><option>I'm interested in…</option>{['Growth Strategy', 'Paid Media', 'SEO', 'CRO', 'Analytics'].map(o => <option key={o}>{o}</option>)}</select>
                <Link to="/contact" className="btn btn--primary" style={{ justifyContent: 'center' }}>Request Audit</Link>
              </div>
            </div>
          </aside>
        </div>

      </div> {/* End container */}

      {/* Case Study Modal Viewer */}
      {activeCase && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 860, maxHeight: '90vh', overflowY: 'auto', padding: 0, position: 'relative' }}>
            <button
              onClick={() => setActiveCase(null)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'var(--white)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <span className="material-icons">close</span>
            </button>
            <div style={{ height: 320, background: 'var(--gray-100)', position: 'relative' }}>
              <img src={`https://images.unsplash.com/photo-${activeCase.image || '1551288049-bebda4e38f71'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80`} alt={activeCase.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: 32 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span className="tag" style={{ background: 'var(--black)', color: 'var(--white)' }}>{activeCase.industry}</span>
                    <span className="tag" style={{ background: 'var(--black)', color: 'var(--white)' }}>{activeCase.serviceType}</span>
                  </div>
                  <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: 4 }}>{activeCase.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', fontWeight: 600 }}>{activeCase.metric}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: 40 }}>
              <div className="two-col--3-2" style={{ gap: 48 }}>
                <div>
                  <h4 style={{ marginBottom: 12, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>The Problem We Found</h4>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--black)', marginBottom: 32 }}>{activeCase.challenge}</p>
                  
                  <h4 style={{ marginBottom: 16, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 800 }}>How We Solved It</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {activeCase.approach.map((a, idx) => (
                      <li key={idx} style={{ paddingLeft: 24, position: 'relative', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                        <span style={{ position: 'absolute', left: 0, top: 4, width: 8, height: 8, background: 'var(--black)', borderRadius: '50%' }}></span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="card" style={{ background: 'var(--gray-50)', padding: 24, marginBottom: 24 }}>
                    <h4 style={{ marginBottom: 12, fontWeight: 800 }}>The Business Impact</h4>
                    <p style={{ fontSize: 14, color: 'var(--gray-700)' }}>{activeCase.result}</p>
                  </div>
                  {activeCase.quote && (
                    <div style={{ padding: 24, borderLeft: '4px solid var(--black)', background: 'var(--white)' }}>
                      <p style={{ fontSize: 15, fontStyle: 'italic', fontWeight: 500, lineHeight: 1.6 }}>{activeCase.quote}</p>
                    </div>
                  )}
                  <Link to="/contact" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 32 }}>Book a Free Audit</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
