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

