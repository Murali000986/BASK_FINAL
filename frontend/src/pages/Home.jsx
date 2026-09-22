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

      {/* ── What We Offer (Service Categories) ── */}
      <div className="container pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8">OUR OFFERINGS</p>
        <h2 className="bask-section-heading mb-32">Services that move the needle.</h2>
        <div className="grid-3 gap-lg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              title: 'Internet Marketing Services',
              desc: 'ROI-driven digital strategies to grow your business online through SEO, email, and analytics.',
              items: ['SEO Services', 'Conversion Rate Optimization', 'Email Marketing', 'Website Analytics', 'SEO Website Audits'],
              icon: 'trending_up',
            },
            {
              title: 'Advertising Agency Services',
              desc: 'Reach the right audience at the right time with high-performance ad campaigns.',
              items: ['Google Ads', 'Display Ads', 'Video Ads', 'LinkedIn Ads', 'Shopping Ads'],
              icon: 'campaign',
            },
            {
              title: 'Marketing Consultant',
              desc: 'Data-backed growth strategies tailored for your industry and funnel stage.',
              items: ['Marketing Consulting', 'Digital Strategy', 'Performance Audits'],
              icon: 'insights',
            },
            {
              title: 'Website Designer',
              desc: 'Build stunning, conversion-optimized websites designed for local and mobile users.',
              items: ['Website Design', 'Landing Page Design', 'UX/UI Design', 'Technical SEO Setup'],
              icon: 'web',
            },
          ].map((cat) => (
            <div key={cat.title} style={{ background: 'var(--gray-50)', borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid var(--gray-200)', transition: 'box-shadow 0.2s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="material-icons" style={{ fontSize: 28, color: 'var(--black)' }}>{cat.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{cat.title}</h3>
              </div>
              <p className="bask-text-small text-muted" style={{ lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cat.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-600)' }}>
                    <span className="material-icons" style={{ fontSize: 14, color: 'var(--black)' }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why BASK ── */}
      <div style={{ background: 'var(--black)', color: 'var(--white)' }} className="py-xl">
        <div className="container">
          <div className="grid-2 gap-xl align-start">
            <div>
              <p className="bask-text-small fw-600 mb-8" style={{ color: '#FFE600', letterSpacing: 2 }}>WHY BASK?</p>
              <h2 className="bask-section-heading mb-24" style={{ color: 'var(--white)' }}>We treat every brand as a unique project.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', maxWidth: 480 }}>
                There are a lot of online marketing companies out there offering a bunch of digital marketing services in Bangalore. So why choose us over them? We treat each company as a unique project — the approach for each is different. A beauty care company can't be dealt with the same way as an ISP. At BASK, we create our own unique strategies to boost your brand and get it to the top.
              </p>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ marginTop: 32, background: '#FFE600', color: '#000', display: 'inline-block' }}>Start a Strategy Call →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {['Tailor-made strategies — no cookie-cutter plans.', 'Zero long-term lock-ins. Cancel anytime.', 'Radical dashboard transparency. Always.', 'Performance bonus tied to your revenue, not just effort.'].map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 20px' }}>
                  <span style={{ fontWeight: 900, fontSize: 22, color: '#FFE600', lineHeight: 1 }}>0{i + 1}</span>
                  <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── The Team ── */}
      <div className="container py-xl">
        <p className="bask-text-small text-muted fw-600 mb-8">THE TEAM</p>
        <div className="grid-2 gap-lg align-start">
          <div>
            <h2 className="bask-section-heading mb-16">Talent meets creativity.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--gray-600)' }}>
              We are a Digital Marketing Agency in Bangalore that consists of a talented, creative team on board. Our technical team handles SEO, SMO, and web design, while our creative team handles content, creative design, and social media interaction. Both teams work in sync to help any brand we work with achieve real results.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { icon: 'code', label: 'Technical Team', desc: 'SEO · SMO · Web Design · Analytics' },
              { icon: 'brush', label: 'Creative Team', desc: 'Content · Design · Social Media' },
            ].map(t => (
              <div key={t.label} style={{ flex: '1 1 200px', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
                <span className="material-icons" style={{ fontSize: 40, marginBottom: 12, display: 'block' }}>{t.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t.label}</h3>
                <p className="bask-text-small text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Achievements + Pocket Friendly ── */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }} className="py-xl">
        <div className="container">
          <div className="grid-2 gap-xl align-start">
            <div>
              <p className="bask-text-small text-muted fw-600 mb-8">OUR ACHIEVEMENTS</p>
              <h2 className="bask-section-heading mb-16">A portfolio you'd recognise.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--gray-600)', marginBottom: 20 }}>
                Our client portfolio includes the likes of Tata Housing, Orient Cement, Restolex, Ziphop, Acharya Bangalore B-School, Foundation School, and other very familiar names. Our clients are amazed by the way their brands are getting boosted in the digital space.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['Tata Housing', 'Orient Cement', 'Restolex', 'Acharya B-School'].map(c => (
                  <span key={c} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--black)', color: 'var(--white)', borderRadius: 20, padding: '36px 32px', textAlign: 'center' }}>
              <span className="material-icons" style={{ fontSize: 48, color: '#FFE600', marginBottom: 16, display: 'block' }}>savings</span>
              <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Pocket-Friendly Packages</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', marginBottom: 24 }}>
                We are one of the top digital marketing agencies in Bangalore yet have the most attractive and affordable packages. You pay only for the specific services you request — nothing more, nothing less.
              </p>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000' }}>Get a Custom Quote →</Link>
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

