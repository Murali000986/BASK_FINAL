import { useState, useEffect } from 'react';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "BASK Growth Agency",
  "url": "https://www.baskgrowth.xyz/services",
  "description": "Full-service digital marketing agency in Bangalore offering Google Ads, Meta Ads, SEO, CRO, brand strategy, film production, and AI automation.",
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
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing & Creative Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Company Bangalore", "description": "Technical SEO, on-page optimisation, local SEO, and content strategy for Bangalore businesses." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Agency Bangalore", "description": "Google Search, Display, Shopping, and YouTube campaign management for businesses in Bangalore and India." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads Agency Bangalore", "description": "Facebook and Instagram advertising with in-house creative production and ROAS optimisation." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conversion Rate Optimisation (CRO)", "description": "Landing page audits, A/B testing, and funnel optimisation to turn more visitors into customers." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Strategy & Identity", "description": "Brand positioning, visual identity, messaging frameworks, and brand guidelines for growing businesses." } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Film & Video Production Bangalore", "description": "Brand films, ad creatives, social reels, and corporate video production by our in-house Bangalore team." } }
    ]
  }
};

export default function Services() {
  const [services, setServices] = useState([]);

  useSEO({
    title: 'Digital Marketing Services in Bangalore — Google Ads, Meta Ads, SEO & More',
    description: 'BASK Growth Agency offers Google Ads, Meta Ads, SEO, CRO, brand strategy, film production and AI automation in Bangalore. Full-service agency — all in-house, no outsourcing. Get a free strategy call.',
    path: '/services',
    schema: SERVICES_SCHEMA,
  });

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Capabilities</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 1000 }}>
          End-to-End Execution.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200 mt-24" style={{ marginTop: 24 }}>
          From finding authentic product-market fit to scaling multi-channel digital strategies. We build brands that drive culture.
        </p>
      </div>

      <div className="container pb-lg">
        <div className="bask-services-list" style={{ borderTop: '2px solid var(--black)' }}>
          {services.map((s, idx) => (
            <div key={s.id} className="bask-service-row" style={{ padding: '48px 0', alignItems: 'flex-start', borderBottom: '2px solid var(--gray-200)' }}>
              <span className="bask-text-small text-muted" style={{ width: '80px', flexShrink: 0, marginTop: 12 }}>/ 0{idx + 1}</span>
              <div className="grid-2 gap-lg" style={{ width: '100%' }}>
                <h3 className="bask-headline-large" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{s.title}</h3>
                <div>
                  <p style={{ fontSize: '1.15rem', color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: 24, fontWeight: 500 }}>{s.description}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {(s.deliverables || ['Strategy', 'Execution']).map(d => (
                      <li key={d} style={{ fontSize: '13px', fontWeight: 700, padding: '8px 16px', border: '1px solid var(--gray-200)', borderRadius: '100px' }}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
