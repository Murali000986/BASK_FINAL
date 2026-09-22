import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const CLIENTS = ['PEPS', 'CONCORDE', 'ADARSH', 'SHEAFFER', 'AUKERA', 'WEBER', 'PURAVANKARA', 'EMBASSY', 'PLATINUM', 'SKYYE', 'ZLATE', 'SOBHA'];

const TYPWORDS = ['Branding', 'Advertising', 'Digital', 'Film', 'OOH', 'Strategy'];

const SERVICES = ['Brand Strategy', 'Advertising', 'Film', 'Digital', 'OOH', 'Production', 'Environmental Graphics', 'Marketing Consultancy'];

const WORKS = [
  { id: '01', title: 'Puravankara', category: 'Real Estate', count: '11 works', image: '1600596542815-ffad4c1539a9' },
  { id: '02', title: 'Salvadores', category: 'F&B / Restaurant', count: '3 works', image: '1555396273-367ea4eb4db5' },
  { id: '03', title: 'The Presidential Tower', category: 'Real Estate', count: '4 works', image: '1486406146926-c627a92ad1ab' },
];

const BANNERS = [
  {
    id: 1,
    badge: '🔥 FIRST 5 CLIENTS OFFER · 30% TO 40% OFF',
    title: 'First 5 New Clients Get Up to 40% Off Strategy & Campaigns',
    sub: 'Transform your brand growth with high-converting ads, digital strategy, & production. Only 2 remaining spots for this month.',
    cta: 'Claim 40% Offer Now',
    link: '/contact',
    bg: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    badge: 'OOH MEDIA PACK · BENGALURU',
    title: 'Dominating Billboard & Outdoor Media Across Bangalore',
    sub: 'High-visibility outdoor placements in Indiranagar, MG Road, & Koramangala. Turn street traffic into active brand search.',
    cta: 'Explore OOH Packages',
    link: '/services',
    bg: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    badge: 'AI CONVERSION ENGINE',
    title: 'Automated 24/7 AI Lead Assistant & Smart Campaign Funnels',
    sub: 'Engage every website visitor with intelligent custom AI assistants trained directly on your service catalog.',
    cta: 'Try AI Assistant',
    link: '/case-studies',
    bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
  }
];



export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % TYPWORDS.length);
        setFade(true);
      }, 400);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Hero Banner Carousel Auto-Play Timer
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);



  useSEO({
    title: 'Bask Creative — Built for impact.',
    description: 'Bask is an ad agency in Bangalore bringing strategic thinking and bold ideas to the table. Branding, digital strategy, film & production.',
    path: '/',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "additionalType": "https://schema.org/MarketingAgency",
      "name": "Bask Creative",
      "url": "https://www.baskgrowth.xyz",
      "logo": "https://www.baskgrowth.xyz/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560005",
        "streetAddress": "No. 3-B, 3rd Floor, Platinum Square, Coles Road",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
  });

  const activeBanner = BANNERS[slideIdx];

  return (
    <div className="bask-home">
      {/* Rectangular Top Announcement Bar */}
      <div className="bask-top-offer-bar">
        <span className="bask-top-offer-pill">SPECIAL OFFER</span>
        <span>🎉 First 5 New Clients Get <strong>30% to 40% OFF</strong> Full-Service Growth & Campaign Strategy!</span>
        <Link to="/contact" className="bask-top-offer-btn">Claim 40% Offer →</Link>
      </div>

      {/* Editorial Header Note */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
        <p className="bask-text-small text-muted fw-600">Independent creative agency · Est. 2018</p>
      </div>

      {/* ── Giant Editorial Hero ── */}
      <div className="container pb-lg bask-hero-grid">
        <div className="bask-hero-text">
          <h1 className="bask-hero-heading animate-fade-up">Hello,<br/>we are<br/>Bask.</h1>
          <p className="bask-hero-paragraph animate-fade-up delay-100">
            Bask is an ad agency that brings strategic thinking and bold ideas to the table, with an eye for creativity that would make your brand truly stand out. Whether it's branding, digital strategy, or a standout communication. We take pride in turning fresh ideas into impactful results.
          </p>
        </div>
        <div className="bask-hero-logo-wrap animate-fade-up delay-200">
          <div className="bask-circle-logo">
            {/* Spinning circular text ring */}
            <svg className="bask-circle-spin" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="circlePath" d="M 100, 20 a 80,80 0 1,1 0,160 a 80,80 0 1,1 0,-160" />
              </defs>
              <text fontSize="11" fontWeight="700" letterSpacing="3" fill="currentColor" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif">
                <textPath href="#circlePath" startOffset="0%">BASK CREATIVE · BANGALORE · AD AGENCY · </textPath>
              </text>
            </svg>
            {/* Centered logo */}
            <div className="bask-circle-center">
              <div className="bask-logo-aura-glow">
                <img src="/logo.png" alt="Bask Logo" className="bask-center-logo-img" />
              </div>
            </div>
          </div>

          {/* Animated stats + typewriter */}
          <div className="bask-hero-side-info animate-fade-up delay-300">
            <div className="bask-hero-stats">
              <div className="bask-stat-pill"><span className="bask-stat-num">50+</span><span className="bask-stat-label">Brands Built</span></div>
              <div className="bask-stat-pill"><span className="bask-stat-num">8</span><span className="bask-stat-label">Years in the Game</span></div>
              <div className="bask-stat-pill"><span className="bask-stat-num">47</span><span className="bask-stat-label">Happy Clients</span></div>
            </div>
            <div className="bask-typewriter">
              <span className="bask-typewriter-prefix">We do </span>
              <span className="bask-typewriter-word" style={{ opacity: fade ? 1 : 0 }}>{TYPWORDS[wordIdx]}</span>
              <span className="bask-typewriter-cursor">|</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flipkart-Style Hero Banner Carousel ── */}
      <div className="container">
        <div className="bask-carousel-container">
          <div 
            className="bask-carousel-slide" 
            style={{ backgroundImage: `url(${activeBanner.bg})` }}
          >
            <div className="bask-carousel-overlay" />
            <div className="bask-carousel-content">
              <span className="bask-carousel-badge">{activeBanner.badge}</span>
              <h2 className="bask-carousel-title">{activeBanner.title}</h2>
              <p className="bask-carousel-sub">{activeBanner.sub}</p>
              <Link to={activeBanner.link} className="btn btn--primary btn--lg">{activeBanner.cta} →</Link>
            </div>
          </div>

          <div className="bask-carousel-dots">
            {BANNERS.map((_, i) => (
              <div 
                key={i} 
                className={`bask-carousel-dot ${i === slideIdx ? 'active' : ''}`} 
                onClick={() => setSlideIdx(i)}
              />
            ))}
          </div>

          <div className="bask-carousel-controls">
            <button className="bask-carousel-arrow" onClick={() => setSlideIdx(prev => (prev - 1 + BANNERS.length) % BANNERS.length)}>‹</button>
            <button className="bask-carousel-arrow" onClick={() => setSlideIdx(prev => (prev + 1) % BANNERS.length)}>›</button>
          </div>
        </div>
      </div>

      {/* ── Services Ticker ── */}
      <div className="bask-ticker-wrap bg-black text-white py-sm mt-lg">
        <div className="bask-ticker">
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} className="bask-ticker-item">{s}</span>
          ))}
        </div>
      </div>



      {/* ── Recent Obsessions (Work) ── */}
      <div className="container pb-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="bask-text-small text-muted fw-600 mb-8">PEEP SHOW / 2024</p>
            <h2 className="bask-section-heading" style={{ marginBottom: 0 }}>Recent obsessions.</h2>
          </div>
          <Link to="/case-studies" className="bask-link-underline" style={{ whiteSpace: 'nowrap', paddingBottom: 8 }}>View all work</Link>
        </div>

        <div className="bask-work-list">
          {WORKS.map((w) => (
            <div key={w.id} className="bask-work-item">
              <div className="bask-work-meta">
                <span className="bask-work-id">{w.id}</span>
                <div>
                  <h3 className="bask-work-title">{w.title}</h3>
                  <p className="bask-text-small text-muted">{w.category} · {w.count}</p>
                </div>
              </div>
              <div className="bask-work-visual img-shimmer-wrapper">
                <img src={`https://images.unsplash.com/photo-${w.image}?auto=format&fit=crop&w=1200&q=80`} alt={w.title} className="img-animated-card" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full-Width Special Offer Banner ── */}
      <div className="container">
        <div className="bask-offer-banner-full">
          <div className="bask-offer-banner-text">
            <span className="bask-promo-tag" style={{ background: '#FFE600', color: '#000' }}>LIMITED CLIENT AVAILABILITY</span>
            <h2 className="bask-offer-banner-title">First 5 Clients Get 30% to 40% Off Full Campaign Execution</h2>
            <p className="bask-offer-banner-sub">Claim your early partner discount on branding, video production, performance ad scaling & AI automation.</p>
          </div>
          <div className="bask-offer-banner-cta">
            <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000' }}>Claim 40% Off Offer →</Link>
          </div>
        </div>
      </div>

      {/* ── What We Do ── */}
      <div className="container pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8">What we do</p>
        <div className="grid-2 gap-lg align-start">
          <div>
            <h2 className="bask-headline-large mb-16">A multidisciplinary studio for brands who refuse to blend in.</h2>
            <Link to="/about" className="bask-link-underline">More about us</Link>
          </div>
          <div className="bask-services-list">
            {SERVICES.map((s, idx) => (
              <div key={s} className="bask-service-row">
                <span className="bask-text-small text-muted">/ 0{idx + 1}</span>
                <span className="bask-service-name">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trusted By ── */}
      <div className="pt-lg pb-lg">
        <div className="container">
          <p className="bask-text-small text-muted fw-600 mb-8">Trusted by</p>
          <h2 className="bask-section-heading mb-32">Our clients.</h2>
        </div>
        
        {/* Ticker 1 */}
        <div className="bask-ticker-wrap bg-gray-50 py-sm">
          <div className="bask-ticker">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bask-client-logo">{c}</span>
            ))}
          </div>
        </div>
        {/* Ticker 2 - Reverse */}
        <div className="bask-ticker-wrap bg-gray-50 pb-sm">
          <div className="bask-ticker bask-ticker--reverse">
            {[...CLIENTS, ...CLIENTS].reverse().map((c, i) => (
              <span key={i} className="bask-client-logo">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── What We Offer ── */}
      <div className="container pb-xl pt-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="bask-text-small text-muted fw-600 mb-8">OUR OFFERINGS</p>
            <h2 className="bask-section-heading" style={{ marginBottom: 0 }}>Services that move the needle.</h2>
          </div>
          <Link to="/services" className="bask-link-underline" style={{ paddingBottom: 8 }}>View all services</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            {
              num: '01', title: 'Internet Marketing', color: '#6EE7B7',
              items: 'SEO · CRO · Email Marketing · Analytics · Audits',
              desc: 'ROI-driven digital strategies built around your funnel — not guesswork.',
            },
            {
              num: '02', title: 'Advertising Agency', color: '#93C5FD',
              items: 'Google Ads · Display · Video · LinkedIn · Shopping',
              desc: 'Reach the right audience at the right time with campaigns that actually convert.',
            },
            {
              num: '03', title: 'Marketing Consulting', color: '#FCA5A5',
              items: 'Strategy · Digital Roadmap · Performance Audits',
              desc: 'Data-backed consulting tailored to your industry and growth stage.',
            },
            {
              num: '04', title: 'Website Design', color: '#FDE68A',
              items: 'Web Design · Landing Pages · UX/UI · Technical SEO',
              desc: 'Conversion-optimised websites built for performance and mobile-first users.',
            },
          ].map((cat, i, arr) => (
            <div key={cat.num} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr auto', gap: 24, alignItems: 'center', padding: '28px 0', borderTop: '1px solid var(--gray-200)', borderBottom: i === arr.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <span style={{ fontWeight: 900, fontSize: 13, color: 'var(--gray-400)', letterSpacing: 1 }}>{cat.num}</span>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>{cat.title}</h3>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--gray-500)', letterSpacing: 0.3 }}>{cat.items}</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
              <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Why BASK ── */}
      <div style={{ margin: '0 20px 0', borderRadius: 28 }} className="py-xl" >
        <div style={{ background: '#111', borderRadius: 28, overflow: 'hidden', position: 'relative' }}>
          {/* Yellow accent stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: '100%', background: '#FFE600', borderRadius: '28px 0 0 28px' }} />
          <div className="container py-xl" style={{ paddingLeft: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: '#FFE600', marginBottom: 24 }}>WHY BASK?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 28px', color: '#fff' }}>
                  Every brand<br />treated as a<br /><em style={{ fontStyle: 'italic', color: '#FFE600' }}>unique project.</em>
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', maxWidth: 420, marginBottom: 36 }}>
                  There are many marketing agencies in Bangalore. We differentiate by treating each company differently — a beauty brand needs a completely different approach than an ISP. At BASK, every strategy is built from scratch.
                </p>
                <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000', fontWeight: 800 }}>
                  Book a Free Strategy Call →
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  ['01', 'Tailor-made strategies. No cookie-cutter plans.'],
                  ['02', 'Zero long-term lock-ins. Cancel anytime.'],
                  ['03', 'Radical dashboard transparency. Always.'],
                  ['04', 'Performance bonus tied to your revenue.'],
                ].map(([n, t]) => (
                  <div key={n} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontWeight: 900, fontSize: 28, color: 'rgba(255,255,255,0.12)', lineHeight: 1, flexShrink: 0, width: 40 }}>{n}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The Team ── */}
      <div className="container" style={{ paddingTop: 72, paddingBottom: 64 }}>
        <p className="bask-text-small text-muted fw-600 mb-8">THE TEAM</p>
        <h2 className="bask-section-heading mb-48">Two teams. One vision.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            {
              label: 'Technical Team',
              icon: 'terminal',
              tags: ['SEO', 'SMO', 'Web Design', 'Analytics', 'Dev'],
              desc: 'Our engineers and SEO specialists build the foundation — fast sites, deep technical audits, and data pipelines that track everything.',
              bg: '#1e1b4b', accent: 'rgba(255,255,255,0.1)', color: '#fff',
            },
            {
              label: 'Creative Team',
              icon: 'auto_awesome',
              tags: ['Content', 'Design', 'Social Media', 'Copywriting'],
              desc: 'Our creatives turn strategy into stories — compelling visuals, sharp copy, and social content that earns attention and drives action.',
              bg: '#064e3b', accent: 'rgba(255,255,255,0.1)', color: '#fff',
            },
          ].map(t => (
            <div key={t.label} style={{ background: t.bg, color: t.color, borderRadius: 24, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 20, minHeight: 280 }}>
              <span className="material-icons" style={{ fontSize: 36, opacity: 0.85 }}>{t.icon}</span>
              <h3 style={{ fontWeight: 900, fontSize: 22, margin: 0 }}>{t.label}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.75, margin: 0, maxWidth: 340 }}>{t.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                {t.tags.map(tag => (
                  <span key={tag} style={{ background: t.accent, padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)', maxWidth: 600, marginTop: 32 }}>
          Both teams work in complete sync — so when your ad runs, the landing page converts, and when the SEO ranks, the content retains. Nothing falls through the cracks.
        </p>
      </div>

      {/* ── Achievements + Pocket Friendly ── */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }} className="py-xl">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64, alignItems: 'start' }}>
            <div>
              <p className="bask-text-small text-muted fw-600 mb-8">OUR ACHIEVEMENTS</p>
              <h2 className="bask-section-heading mb-20">A portfolio you'd recognise.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--gray-600)', marginBottom: 32, maxWidth: 480 }}>
                Our client portfolio includes the likes of Tata Housing, Orient Cement, Restolex, Ziphop, Acharya Bangalore B-School, Foundation School, and other recognisable names — all amazed by the results BASK delivered.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {['Tata Housing', 'Orient Cement', 'Restolex', 'Ziphop', 'Acharya B-School', 'Foundation School'].map(c => (
                  <span key={c} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 10, padding: '8px 18px', fontSize: 13, fontWeight: 700, letterSpacing: 0.3 }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--black)', color: '#fff', borderRadius: 24, padding: '40px 36px' }}>
              <div style={{ width: 52, height: 52, background: '#FFE600', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <span className="material-icons" style={{ fontSize: 28, color: '#000' }}>savings</span>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: 22, marginBottom: 16, lineHeight: 1.2 }}>Pocket-Friendly<br />Packages</h3>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 32 }}>
                Top-tier digital marketing in Bangalore, priced for real businesses. You pay only for the services you actually need. No bundle bloat.
              </p>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000', fontWeight: 800, display: 'block', textAlign: 'center' }}>
                Get a Custom Quote →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Let's Build It / CTA ── */}
      <div className="container pt-lg pb-xl text-center">
        <h2 className="bask-headline-huge mb-24">Have an idea?<br/>Let's build it.</h2>
        <Link to="/contact" className="btn btn--primary btn--lg">Work with us</Link>
      </div>

      {/* ── Services Ticker Footer ── */}
      <div className="bask-ticker-wrap bg-black text-white py-sm shrink">
        <div className="bask-ticker">
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} className="bask-ticker-item-small">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

