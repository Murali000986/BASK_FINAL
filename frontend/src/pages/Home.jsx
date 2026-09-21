import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const STATS = [
  { value: 'Average 3.4x Growth', label: 'Average 3.4x Growth', desc: 'Median revenue lift across paid channels in first 6 months' },
  { value: '14-Day Pilot', label: '14-Day Pilot', desc: 'Risk-free trial to validate approach and initial impact' },
  { value: 'Performance Aligned', label: 'Performance Aligned', desc: 'Option for revenue-share or bonus tied to agreed KPIs' },
];

const HERO_FEATURES = [
  { icon: 'check', text: 'Value-driven strategies focused on acquisition, retention, and lifetime value.' },
  { icon: 'show_chart', text: 'Transparent performance reporting with weekly insights and KPI tracking.' },
  { icon: 'record_voice_over', text: 'Aligned engagement models: trial pilots, performance-based fees, and scalable retainers.' },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [cases, setCases] = useState([]);
  const [team, setTeam] = useState(null);

  useSEO({
    title: 'Performance Marketing Agency Bangalore — Real Growth, Measurable ROI',
    description: 'BASK is Bangalore\'s top performance marketing agency. Google Ads, Meta Ads, SEO, CRO & Email for B2B & B2C brands across India. 3.4x average growth. Get a free strategy call.',
    path: '/',
    schema: {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "BASK Growth Agency",
      "url": "https://www.baskgrowth.xyz",
      "logo": "https://www.baskgrowth.xyz/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560001",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Rahul Menon" },
          "reviewBody": "BASK scaled our Google Ads ROAS from 1.8x to 4.6x in 90 days. Best growth team we've worked with in Bangalore."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Priya Iyer" },
          "reviewBody": "Excellent transparency, weekly reports, and their SEO strategy brought 3x organic traffic in 6 months."
        }
      ]
    },
  });

  useEffect(() => {
    api.getServices().then(s => setServices(s.slice(0, 3))).catch(() => {});
    api.getCaseStudies().then(c => setCases(c.slice(0, 3))).catch(() => {});
    api.getTeam().then(t => setTeam(t)).catch(() => {});
  }, []);

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section 
        className="section--lg"
        style={{ 
          position: 'relative', 
          minHeight: '85vh', 
          display: 'flex', 
          alignItems: 'center', 
          background: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80) center/cover no-repeat',
          color: 'var(--white)'
        }}
      >
        {/* Dark Glass Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,12,18,0.96) 0%, rgba(8,12,18,0.7) 100%)', zIndex: 0 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 960 }}>
          <p className="hero__badge animate-fade-up" style={{ color: 'var(--gray-300)', marginBottom: 24, fontSize: '14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            ✦ Rated #1 Premium Growth Agency
            <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '3px 12px', fontSize: 12, color: '#86efac', letterSpacing: '0.06em' }}>2 Spots Open Q4</span>
          </p>
          <h1 className="hero__title animate-fade-up delay-100" style={{ color: 'var(--white)', fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
            Scale Your Revenue. Not Your Agency Spend.
          </h1>
          <p className="hero__sub animate-fade-up delay-200" style={{ color: 'var(--gray-300)', fontSize: '1.25rem', maxWidth: 720, lineHeight: 1.8 }}>
            Data-driven growth marketing for ambitious brands. No black boxes. No long-term contracts. Just measurable ROI.
          </p>
          
          <div className="hero__actions animate-fade-up delay-300" style={{ marginTop: 40, marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: 'var(--white)', color: 'var(--black)', borderColor: 'var(--white)', padding: '16px 32px' }}>Book a Free Strategy Call</Link>
              <span style={{ fontSize: 12, color: 'var(--gray-500)', paddingLeft: 4 }}>Free 30-min call. No commitment. No credit card.</span>
            </div>
            <Link to="/about" className="btn btn--outline btn--lg" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)', padding: '16px 32px' }}>View Our Work</Link>
          </div>

          <div className="hero__trust animate-fade-up delay-400" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, marginTop: 40 }}>
            <span className="hero__trust-label" style={{ display: 'block', marginBottom: 20, color: 'var(--gray-500)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Trusted by growth teams at</span>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Lumen', 'FlowTask', 'Northwell', 'Aurora', 'Stripe', 'Bolt'].map(b => (
                <span key={b} style={{
                  padding: '6px 16px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.75)'
                }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Point / Problem Statement ── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header section-header--center" style={{ marginBottom: 16 }}>
            <p className="section-header__label animate-fade-up">Sound Familiar?</p>
            <h2 className="section-header__title animate-fade-up delay-100" style={{ maxWidth: 640, margin: '0 auto 16px' }}>
              Most agencies drain your budget. We grow your business.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { icon: 'money_off', title: 'Burning Budget', desc: 'High spend but low measurable return.' },
              { icon: 'insights', title: 'Vanity Metrics', desc: 'Reports showing clicks, not revenue.' },
              { icon: 'lock', title: 'Locked In', desc: 'Stuck in 12-month rigid retainers.' },
            ].map(p => (
              <div key={p.title} className="card animate-fade-up delay-200" style={{ borderLeft: '4px solid #ef4444', borderRadius: '0 var(--radius-lg) var(--radius-lg) 0', padding: 32, background: 'var(--gray-50)' }}>
                <p style={{ marginBottom: 16 }}><span className="material-icons" style={{ fontSize: '2rem', color: '#ef4444' }}>{p.icon}</span></p>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--black)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-600)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="animate-fade-up delay-300" style={{ textAlign: 'center', marginTop: 48, background: 'var(--black)', color: 'var(--white)', padding: 32, borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>The BASK Difference</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--gray-400)' }}>
              <strong>Performance-aligned. Zero black box. Cancel anytime.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats / Trust Ribbon ── */}
      <section className="section" style={{ background: 'var(--black)', color: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ color: 'var(--white)', fontSize: '2.5rem', marginBottom: 16 }}>Delivering measurable impact since 2015.</h2>
            <p style={{ color: 'var(--gray-400)', fontSize: '1.2rem', maxWidth: 640, margin: '0 auto' }}>
              We don't operate like a traditional agency. We act as an extension of your growth team, driven purely by performance and data.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'var(--gray-900)', padding: 40, borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-800)' }}>
                <p style={{ fontSize: '2.5rem', color: 'var(--white)', fontWeight: 800, marginBottom: 12 }}>✦</p>
                <p style={{ fontSize: '1.2rem', color: 'var(--white)', fontWeight: 700, marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: '1rem', color: 'var(--gray-400)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Highlights ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-header__label animate-fade-up">Fast, Scalable Growth</p>
            <h2 className="animate-fade-up delay-100" style={{ fontSize: '2.5rem', marginBottom: 16 }}>Built for Ambition</h2>
            <p className="animate-fade-up delay-200" style={{ fontSize: '1.2rem', color: 'var(--gray-600)', maxWidth: 640, margin: '0 auto' }}>
              We treat your business like our own. 100% focused on efficiency and scale.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[
              { icon: 'storefront', title: 'Startups', desc: 'Stretch initial budgets into explosive traction.' },
              { icon: 'trending_up', title: 'Mid-Market Scale', desc: 'Full-funnel ownership for aggressive MRR growth.' },
              { icon: 'corporate_fare', title: 'Enterprise', desc: 'Complex, multi-channel data-driven architecture.' },
            ].map((b, i) => (
              <div key={b.title} className={`card animate-fade-up delay-${200 + i * 100}`} style={{ padding: 32, textAlign: 'center', border: '1px solid var(--gray-200)' }}>
                <span className="material-icons" style={{ fontSize: '3rem', color: 'var(--black)', marginBottom: 16 }}>{b.icon}</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: 'var(--gray-600)' }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Agency Principles */}
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { quote: "Every decision backed by rigorous data.", author: "Head of Growth" },
              { quote: "Radical transparency. No black box reporting.", author: "VP Analytics" },
              { quote: "We only win when your bottom line grows.", author: "Founding Team" }
            ].map((q, i) => (
              <div key={i} className={`animate-fade-up delay-${300 + (i * 100)}`} style={{ background: 'var(--gray-50)', padding: '24px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--black)' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>"{q.quote}"</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-header__label animate-fade-up">Our Methodology</p>
            <h2 className="section-header__title animate-fade-up delay-100">Engineering Growth, Not Guesswork.</h2>
            <p className="section-header__sub animate-fade-up delay-200">Our signature 4-step framework removes intuition and replaces it with data-led execution.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
            {[
              { num: '01', title: 'Strategic Alignment', desc: 'Deep-dive to understand your business model, revenue targets, and exactly what success looks like.' },
              { num: '02', title: 'Deep Research', desc: 'Rigorous audit of your market, competitors, and historical data to build a 90-day action plan.' },
              { num: '03', title: 'Collaborative Review', desc: 'We debate the nuances, refine the roadmap, and align completely before spending a single dollar.' },
              { num: '04', title: 'Calculated Execution', desc: 'Launch targeted experiments, monitor performance strictly, kill losers fast, and scale what works.' },
            ].map((p, i) => (
              <div key={p.num} className={`card animate-fade-up delay-${300 + (i * 100)}`} style={{ display: 'flex', gap: 32, alignItems: 'center', padding: '32px 40px' }}>
                <p style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--black)', opacity: 0.1, lineHeight: 1, margin: 0 }}>{p.num}</p>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities: Digital Marketing & Ads ── */}
      <section className="section" style={{ background: 'var(--black)', color: 'var(--white)' }}>
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-header__label animate-fade-up" style={{ color: 'var(--gray-400)' }}>Elite Execution</p>
            <h2 className="section-header__title animate-fade-up delay-100" style={{ color: 'var(--white)' }}>Digital Marketing & Paid Ads Architecture</h2>
            <p className="section-header__sub animate-fade-up delay-200" style={{ color: 'var(--gray-400)', maxWidth: 700, margin: '0 auto' }}>
              We don't just advise. We build, launch, and scale high-converting acquisition engines. From complex paid media pipelines to foundational SEO.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginTop: 56 }}>
            {[
              { icon: 'ads_click', title: 'Paid Media (Ads)', desc: 'Meta, Google, TikTok, and LinkedIn. We manage enterprise ad budgets with absolute precision to drive down CAC and exponentially increase ROAS.' },
              { icon: 'search', title: 'SEO & Organic', desc: 'Technical SEO, content architecture, and backlink strategies that build an organic moat around your business, reducing reliance on paid channels.' },
              { icon: 'science', title: 'CRO & Landing Pages', desc: 'Traffic means nothing if it doesn\'t convert. We design, code, and A/B test high-performance landing pages that squeeze every drop of ROI from your ads.' },
              { icon: 'bar_chart', title: 'Lifecycle & Email', desc: 'Maximizing LTV through advanced Klaviyo/HubSpot automated flows. We turn one-time buyers into loyal, repeat brand advocates.' },
            ].map((srv, i) => (
              <div key={srv.title} className={`animate-fade-up delay-${200 + (i * 100)}`} style={{ background: 'var(--gray-900)', borderRadius: 'var(--radius-md)', padding: 32, border: '1px solid var(--gray-800)' }}>
                <span className="material-icons" style={{ fontSize: '2.5rem', color: 'var(--white)', marginBottom: 20 }}>{srv.icon}</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--white)', marginBottom: 12 }}>{srv.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-400)', lineHeight: 1.6 }}>{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The BASK Advantage ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-header__label animate-fade-up">The BASK Advantage</p>
            <h2 className="section-header__title animate-fade-up delay-100">Why Top Brands Choose Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32, marginTop: 48 }}>
            <div className="card animate-fade-up delay-200" style={{ padding: 40, background: 'var(--black)', color: 'var(--white)' }}>
              <span className="material-icons" style={{ fontSize: '3rem', marginBottom: 20, color: 'var(--gray-400)' }}>architecture</span>
              <h3 style={{ fontSize: '2rem', marginBottom: 16 }}>Full-Funnel Alignment</h3>
              <ul className="info-list" style={{ gap: 16 }}>
                <li><span className="material-icons" style={{ color: '#86efac' }}>check_circle</span> <strong>CRM Integration:</strong> Optimize for SQLs & LTV, not just clicks.</li>
                <li><span className="material-icons" style={{ color: '#86efac' }}>check_circle</span> <strong>Down-Funnel Metrics:</strong> Win when closed-won grows.</li>
                <li><span className="material-icons" style={{ color: '#86efac' }}>check_circle</span> <strong>Sales Alignment:</strong> Feedback loops between marketing and sales.</li>
              </ul>
            </div>
            
            <div className="card animate-fade-up delay-300" style={{ padding: 40, border: '2px solid var(--black)' }}>
              <span className="material-icons" style={{ fontSize: '3rem', marginBottom: 20, color: 'var(--black)' }}>visibility</span>
              <h3 style={{ fontSize: '2rem', marginBottom: 16 }}>Radical Transparency</h3>
              <ul className="info-list" style={{ gap: 16 }}>
                <li><span className="material-icons" style={{ color: 'var(--black)' }}>check_circle</span> <strong>Live Dashboards:</strong> See exactly where every dollar goes 24/7.</li>
                <li><span className="material-icons" style={{ color: 'var(--black)' }}>check_circle</span> <strong>Fast Iteration:</strong> Weekly syncs on raw hypotheses and test logs.</li>
                <li><span className="material-icons" style={{ color: 'var(--black)' }}>check_circle</span> <strong>Open Comms:</strong> Dedicated Slack channel for immediate access.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">What We Do</p>
            <h2 className="section-header__title">Expert Growth Services</h2>
            <p className="section-header__sub">From strategy to execution — every service is built around measurable impact.</p>
          </div>
          <div className="services-grid">
            {(services.length ? services : Array(3).fill(null)).map((s, i) => (
              s ? (
                <div key={s.id} className="card animate-fade-up delay-100" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 180, background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)', marginBottom: 20, overflow: 'hidden' }}>
                    <img src={`https://images.unsplash.com/photo-${i === 0 ? '1551288049-bebda4e38f71' : i === 1 ? '1460925895917-afdab827c52f' : '1504868584819-bf31362e5b95'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                  </div>
                  <h3 className="service-card__title">{s.title}</h3>
                  <p className="service-card__desc">{s.description}</p>
                  <Link to="/services" className="btn btn--outline btn--sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Learn More</Link>
                </div>
              ) : (
                <div key={i} className="card" style={{ background: 'var(--gray-100)', border: 'none', minHeight: 200 }} />
              )
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/services" className="btn btn--outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">Proof of Work</p>
            <h2 className="section-header__title">Recent Case Studies</h2>
            <p className="section-header__sub">In-depth growth engagements with measurable outcomes across industries.</p>
          </div>
          <div className="case-grid">
            {(cases.length ? cases : Array(3).fill(null)).map((c, i) => (
              c ? (
                <div key={c.id} className="card animate-fade-up delay-200">
                  <div className="case-card__thumb">
                    <img src={`https://images.unsplash.com/photo-${c.image || '1551288049-bebda4e38f71'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span className="case-card__metric">{c.metric}</span>
                  <h3 className="case-card__title">{c.title}</h3>
                  <p className="case-card__meta">{c.client}</p>
                  <div className="case-card__footer">
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span className="tag">{c.industry}</span>
                      <span className="tag">{c.serviceType}</span>
                    </div>
                    <Link to="/case-studies" className="btn btn--primary btn--sm">View Case</Link>
                  </div>
                </div>
              ) : (
                <div key={i} className="card" style={{ background: 'var(--gray-200)', border: 'none', minHeight: 280 }} />
              )
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/case-studies" className="btn btn--outline">View All Case Studies</Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-header__label">Client Voices</p>
            <h2 className="section-header__title">What Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            {(team?.testimonials || []).map(t => (
              <div key={t.name} className="card">
                <div className="testimonial-card__avatar">
                  <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <p className="testimonial-card__quote">{t.quote}</p>
                <p className="testimonial-card__name">{t.name}</p>
                <p className="testimonial-card__title">{t.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Models ── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-header__label animate-fade-up">Engagement Models</p>
            <h2 className="section-header__title animate-fade-up delay-100">Transparent Pricing, Scalable Impact</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginTop: 48 }}>
            <div className="card animate-fade-up delay-200" style={{ padding: 40, borderTop: '4px solid var(--gray-400)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Growth Pilot</h3>
              <p style={{ color: 'var(--gray-500)', height: 48 }}>A rapid 14-day engagement to validate our methodology before scaling.</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, margin: '24px 0' }}>Custom Quote <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--gray-400)' }}>/ one-time</span></p>
              <ul className="info-list" style={{ marginBottom: 32 }}>
                <li><span className="material-icons">check</span> Deep Funnel Audit</li>
                <li><span className="material-icons">check</span> 3 Rapid Flow Tests</li>
                <li><span className="material-icons">check</span> Landing Page Roadmap</li>
              </ul>
              <Link to="/contact" className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>Start Pilot</Link>
            </div>
            <div className="card animate-fade-up delay-300" style={{ padding: 40, borderTop: '4px solid var(--black)', background: 'var(--black)', color: 'var(--white)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Scaling Partner</h3>
              <p style={{ color: 'var(--gray-400)', height: 48 }}>Our core offering for ambitious brands ready to hit the gas on paid channels.</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, margin: '24px 0' }}>Custom Quote <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--gray-400)' }}>/ retainer</span></p>
              <ul className="info-list" style={{ marginBottom: 32 }}>
                <li style={{ color: 'var(--gray-300)' }}><span className="material-icons" style={{ color: 'var(--white)' }}>check</span> Dedicated Growth Squad</li>
                <li style={{ color: 'var(--gray-300)' }}><span className="material-icons" style={{ color: 'var(--white)' }}>check</span> Cross-Channel Media Buying</li>
                <li style={{ color: 'var(--gray-300)' }}><span className="material-icons" style={{ color: 'var(--white)' }}>check</span> Creative & Copy Pipeline</li>
              </ul>
              <Link to="/contact" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--white)', color: 'var(--black)', borderColor: 'var(--white)' }}>Apply to Partner</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="section-header section-header--center">
            <h2 className="section-header__title animate-fade-up">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list animate-fade-up delay-200">
            <div className="faq-item" style={{ borderTop: '1px solid var(--gray-200)' }}>
              <div className="faq-item__q" style={{ cursor: 'default' }}>Do you require long-term contracts?</div>
              <div className="faq-item__a">No. We believe strictly in earning our keep. Our engagements start with risk-free pilots, transitioning into an easy rolling month-to-month commitment.</div>
            </div>
            <div className="faq-item">
              <div className="faq-item__q" style={{ cursor: 'default' }}>What ad spend ranges do you manage?</div>
              <div className="faq-item__a">We generally work with clients managing multi-lakh to crore-plus budgets per month across primary channels like Meta, Google Ads, and LinkedIn.</div>
            </div>
            <div className="faq-item">
              <div className="faq-item__q" style={{ cursor: 'default' }}>Who builds the creatives and landing pages?</div>
              <div className="faq-item__a">We do. Our in-house creative strategists, copywriters, and designers handle everything needed to execute rapid A/B tests completely off your plate.</div>
            </div>
          </div>
          <div className="animate-fade-up delay-300" style={{ textAlign: 'center', marginTop: 24 }}>
            <Link to="/faq" className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              See More FAQs <span className="material-icons" style={{ fontSize: 18 }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section--sm" style={{ background: 'var(--black)', color: 'var(--white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: 12 }}>Ready to unlock measurable growth?</h2>
          <p style={{ color: 'var(--gray-400)', marginBottom: 24 }}>Start with a risk-free 14-day pilot. No long-term commitment required.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--primary" style={{ background: 'var(--white)', color: 'var(--black)', border: '2px solid var(--white)' }}>Get a Proposal</Link>
            <Link to="/services" className="btn btn--outline" style={{ border: '2px solid var(--gray-600)', color: 'var(--gray-300)' }}>Explore Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
