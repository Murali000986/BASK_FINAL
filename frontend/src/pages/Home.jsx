import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const CLIENTS = ['PEPS', 'CONCORDE', 'ADARSH', 'SHEAFFER', 'AUKERA', 'WEBER', 'PURAVANKARA', 'EMBASSY', 'PLATINUM', 'SKYYE', 'ZLATE', 'SOBHA'];

const SERVICES = ['Brand Strategy', 'Advertising', 'Film', 'Digital', 'OOH', 'Production', 'Environmental Graphics', 'Marketing Consultancy'];

const WORKS = [
  { id: '01', title: 'Puravankara', category: 'Real Estate', count: '11 works', image: '1600596542815-ffad4c1539a9' },
  { id: '02', title: 'Salvadores', category: 'F&B / Restaurant', count: '3 works', image: '1555396273-367ea4eb4db5' },
  { id: '03', title: 'The Presidential Tower', category: 'Real Estate', count: '4 works', image: '1486406146926-c627a92ad1ab' },
];

export default function Home() {
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

  return (
    <div className="bask-home">
      {/* Editorial Header Note */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
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
                <path id="circlePath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
              </defs>
              <text fontSize="13" fontWeight="700" letterSpacing="6" fill="currentColor" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">
                <textPath href="#circlePath" startOffset="0%">BASK CREATIVE · BANGALORE · AD AGENCY · </textPath>
              </text>
            </svg>
            {/* Static center logo */}
            <div className="bask-circle-center">
              <img src="/logo.png" alt="Bask Logo" style={{ width: '55%', height: 'auto', display: 'block' }} />
            </div>
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
      <div className="container pt-lg pb-lg">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <p className="bask-text-small text-muted fw-600 mb-8">Peep Show / 2024</p>
            <h2 className="bask-section-heading">Recent obsessions.</h2>
          </div>
          <Link to="/case-studies" className="bask-link-underline">View all work</Link>
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
              <div className="bask-work-visual">
                <img src={`https://images.unsplash.com/photo-${w.image}?auto=format&fit=crop&w=1200&q=80`} alt={w.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── What We Do ── */}
      <div className="container pt-lg pb-lg">
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
