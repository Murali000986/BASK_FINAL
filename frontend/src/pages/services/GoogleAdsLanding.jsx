import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const GADS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Google Ads Management",
  "name": "Google Ads Agency Bangalore",
  "description": "Google Search, Display, Shopping, and YouTube campaign management for businesses in Bangalore and across India.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "BASK Growth Agency",
    "url": "https://www.baskgrowth.xyz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560005",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5"
    }
  },
  "areaServed": [{ "@type": "City", "name": "Bengaluru" }, { "@type": "Country", "name": "India" }],
  "offers": {
    "@type": "Offer",
    "price": "12000",
    "priceCurrency": "INR",
    "description": "Google Ads management from ₹12,000/month (excluding ad spend)"
  }
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does Google Ads management cost in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "BASK charges a flat management fee starting from ₹12,000/month for Google Ads — this is separate from your ad spend budget. We do not charge a percentage of ad spend, so our incentive is always your ROAS, not higher spending." }
    },
    {
      "@type": "Question",
      "name": "What types of Google Ads campaigns do you manage?",
      "acceptedAnswer": { "@type": "Answer", "text": "We manage Google Search campaigns, Display Network, Shopping campaigns (for ecommerce), YouTube video ads, Performance Max, and Local campaigns for businesses targeting specific Bangalore locations." }
    },
    {
      "@type": "Question",
      "name": "What is a realistic ROAS from Google Ads in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "ROAS varies widely by industry: ecommerce campaigns typically target 3–6x ROAS, B2B lead generation targets cost-per-lead metrics rather than ROAS, and local service businesses (real estate, education) measure by qualified lead volume and cost-per-appointment. We set realistic expectations in the first 30 days before scaling." }
    },
    {
      "@type": "Question",
      "name": "How quickly can Google Ads generate results?",
      "acceptedAnswer": { "@type": "Answer", "text": "Unlike SEO, Google Ads can deliver leads on Day 1. However, the first 30–60 days are a learning and optimisation phase — we gather conversion data, adjust bidding, and refine audiences. Expect mature performance (stable cost-per-lead, predictable volume) by month 2–3." }
    }
  ]
};

export default function GoogleAdsLanding() {
  useSEO({
    title: 'Google Ads Agency in Bangalore — Search, Display, Shopping & YouTube Campaigns',
    description: 'BASK Growth Agency manages Google Ads (Search, Display, Shopping, YouTube) for businesses in Bangalore. Flat fee from ₹12,000/month — no percentage of ad spend. Certified team, in-house creative, transparent ROAS reporting.',
    path: '/services/google-ads-agency-bangalore',
    schema: [GADS_SCHEMA, FAQ_SCHEMA],
  });

  return (
    <div className="bask-page">
      {/* Hero */}
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">GOOGLE ADS · BANGALORE</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          Google Ads Agency<br/>in Bangalore.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200" style={{ maxWidth: 640 }}>
          Search, Display, Shopping, and YouTube campaigns managed by a flat-fee team — not one that takes a cut of your budget. We target the right keywords, build ad creatives in-house, and optimise for the metrics that actually matter to your business.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn--primary btn--lg">Get a Free Google Ads Audit →</Link>
          <Link to="/services" className="btn btn--lg" style={{ background: 'transparent', border: '2px solid var(--gray-300)', color: 'var(--black)' }}>All Services</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }} className="py-lg">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {[
              { num: '₹12K', label: 'Management fee (from)' },
              { num: '0%', label: 'Ad spend commission' },
              { num: '47+', label: 'Clients managed' },
              { num: '8 yrs', label: 'PPC experience' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign types */}
      <div className="container pb-lg pt-lg">
        <p className="bask-text-small text-muted fw-600 mb-8">CAMPAIGN TYPES WE MANAGE</p>
        <h2 className="bask-section-heading mb-48">Every Google Ads format.<br/>One team.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '2px solid var(--black)' }}>
          {[
            { title: 'Google Search Campaigns', items: 'Keyword Research · Match Types · Negative Keywords · Ad Copy Testing', desc: 'Capture high-intent buyers actively searching for your product or service in Bangalore and across India. We build tight ad groups, test multiple copy angles, and kill what doesn\'t convert.' },
            { title: 'Display & Remarketing', items: 'Audience Targeting · Retargeting · Banner Creative · Placement Exclusions', desc: 'Re-engage website visitors and reach relevant audiences across the Google Display Network. Our in-house designers produce all banner creatives — no stock templates.' },
            { title: 'Shopping & Performance Max', items: 'Product Feed Optimisation · Merchant Centre · Smart Bidding', desc: 'For ecommerce brands. We optimise your product feed, structure Shopping campaigns for margin-first ROAS, and manage Performance Max with full creative asset production.' },
            { title: 'YouTube & Video Ads', items: 'Skippable · Non-Skippable · Bumper Ads · In-Feed Video', desc: 'Short and long-form video ad scripts, production, and YouTube targeting. We handle the entire pipeline from storyboarding to campaign launch.' },
            { title: 'Local & Call Campaigns', items: 'Location Targeting · Call Extensions · Local Pack · Lead Forms', desc: 'For Bangalore-based businesses targeting specific neighbourhoods — Koramangala, HSR Layout, Whitefield, Indiranagar. Call and lead form campaigns drive direct enquiries.' },
          ].map((s, i, arr) => (
            <div key={s.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: '36px 0', borderBottom: '2px solid var(--gray-200)', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', letterSpacing: 0.3, margin: 0 }}>{s.items}</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why flat fee */}
      <div style={{ background: '#111', color: '#fff' }} className="py-xl">
        <div className="container">
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: '#FFE600', marginBottom: 24 }}>THE BASK DIFFERENCE</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 24 }}>We don't earn<br/>more when you<br/><em style={{ color: '#FFE600', fontStyle: 'italic' }}>spend more.</em></h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 32, maxWidth: 420 }}>Most Google Ads agencies charge 15–20% of your ad spend. That means their income goes up the more you spend — not when you perform better. Our flat fee aligns incentives: we make money only if you stay, and you stay only if the ROI is there.</p>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000', fontWeight: 800 }}>Book a Free Google Ads Audit →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                ['Flat monthly fee — not a % of spend', true],
                ['In-house creative for all ad assets', true],
                ['Full access to your own Google Ads account', true],
                ['Weekly reporting, not monthly', true],
                ['15–20% agency commission model', false],
                ['Outsourced creatives from freelancers', false],
              ].map(([text, good]) => (
                <div key={text} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, color: good ? '#FFE600' : 'rgba(255,255,255,0.3)' }}>{good ? '✓' : '✗'}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: good ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container pt-lg pb-lg" style={{ maxWidth: 800 }}>
        <p className="bask-text-small text-muted fw-600 mb-8">FAQs</p>
        <h2 className="bask-section-heading mb-40">Google Ads, plain English.</h2>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '2px solid var(--black)' }}>
          {[
            { q: 'How much does Google Ads management cost in Bangalore?', a: 'BASK charges a flat management fee from ₹12,000/month — separate from your ad spend. No percentage of budget commission.' },
            { q: 'What is a realistic ROAS from Google Ads?', a: 'Ecommerce: 3–6x ROAS is achievable for well-structured campaigns. B2B lead gen: measured by cost-per-qualified-lead, not ROAS. Local services: cost-per-appointment is the metric. We set realistic benchmarks in month 1.' },
            { q: 'How fast can Google Ads generate leads?', a: 'Day 1 is possible. Month 2–3 is when campaigns hit stable, predictable performance after the learning phase and data-driven optimisation.' },
            { q: 'Do you handle the creative (ad copy and banners)?', a: 'Yes. Our in-house team in Bangalore writes all ad copy and produces all display and video creative. No outsourcing.' },
          ].map(f => (
            <div key={f.q} style={{ padding: '28px 0', borderBottom: '1px solid var(--gray-200)' }}>
              <dt style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: 'var(--black)' }}>{f.q}</dt>
              <dd style={{ margin: 0, fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7 }}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* CTA */}
      <div className="container pt-lg pb-xl text-center">
        <h2 className="bask-headline-huge mb-24">Ready to run<br/>better Google Ads?</h2>
        <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 500, margin: '0 auto 32px' }}>Book a free 30-minute Google Ads audit. We'll show you exactly where your budget is leaking.</p>
        <Link to="/contact" className="btn btn--primary btn--lg">Book Free Audit →</Link>
      </div>
    </div>
  );
}
