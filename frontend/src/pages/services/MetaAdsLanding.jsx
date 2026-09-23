import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const META_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Social Media Advertising",
  "name": "Meta Ads Agency Bangalore",
  "description": "Facebook and Instagram advertising with in-house creative production, audience targeting, A/B testing, and ROAS optimisation for Bangalore businesses.",
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
    "description": "Meta Ads management from ₹12,000/month (excluding ad spend)"
  }
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does Meta Ads (Facebook/Instagram) management cost in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "BASK charges a flat management fee from ₹12,000/month for Meta Ads — separate from your ad spend budget. This includes campaign setup, audience research, A/B testing, and in-house creative production." }
    },
    {
      "@type": "Question",
      "name": "What is the minimum budget to run Meta Ads in India?",
      "acceptedAnswer": { "@type": "Answer", "text": "For meaningful data and learning, we recommend a minimum ad spend of ₹20,000–₹30,000/month for Meta Ads in the Indian market. Below this, the algorithm doesn't have enough conversion data to optimise effectively. Serious D2C and B2B brands typically start at ₹50,000–₹2,00,000/month." }
    },
    {
      "@type": "Question",
      "name": "Do you produce the ad creatives (images and videos) for Meta Ads?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our in-house Bangalore team produces all ad creatives — static images, carousel cards, short-form video (Reels format), and story ads. We don't outsource creative work. This is included in the management fee." }
    },
    {
      "@type": "Question",
      "name": "What types of businesses benefit most from Meta Ads in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "D2C brands, real estate developers, education institutes, restaurant chains, fitness clubs, beauty/wellness brands, and B2B companies with mid-funnel nurturing needs all see strong results from Meta Ads. The platform excels at awareness and retargeting, especially when combined with a strong landing page." }
    }
  ]
};

const AD_FORMATS = [
  { title: 'Feed Ads', desc: 'Static image and carousel ads optimised for the Facebook and Instagram feed. We test 3–5 creative variants per ad set.' },
  { title: 'Reels & Story Ads', desc: 'Short-form vertical video built for mobile-first consumption. Our team produces Reels-format ad scripts and edits them in-house.' },
  { title: 'Lead Generation Ads', desc: 'Instant Forms that capture leads without leaving Meta. Lower friction than external landing pages — ideal for real estate, education, and B2B.' },
  { title: 'Catalogue & Shopping Ads', desc: 'Dynamic product ads pulling from your product catalogue. Ideal for ecommerce and D2C brands targeting purchase-intent audiences.' },
  { title: 'Retargeting Campaigns', desc: 'Re-engage website visitors, video viewers, and past customers. Our retargeting funnels match the right creative to each stage of the buyer journey.' },
  { title: 'WhatsApp Click-to-Chat Ads', desc: 'Click-to-WhatsApp ads for high-conversion in the Indian market. Ideal for service businesses where WhatsApp is the primary sales channel.' },
];

export default function MetaAdsLanding() {
  useSEO({
    title: 'Meta Ads Agency in Bangalore — Facebook & Instagram Advertising',
    description: 'BASK Growth Agency manages Meta Ads (Facebook & Instagram) for businesses in Bangalore. In-house creative production, audience targeting, A/B testing, and ROAS optimisation. Flat fee from ₹12,000/month. Book a free audit.',
    path: '/services/meta-ads-agency-bangalore',
    schema: [META_SCHEMA, FAQ_SCHEMA],
  });

  return (
    <div className="bask-page">
      {/* Hero */}
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">META ADS · BANGALORE</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          Meta Ads Agency<br/>in Bangalore.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200" style={{ maxWidth: 640 }}>
          Facebook and Instagram advertising with in-house creative production, audience testing, and transparent ROAS reporting. No outsourced creatives. No percentage commission on your ad spend.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn--primary btn--lg">Get a Free Meta Ads Audit →</Link>
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
              { num: '47+', label: 'Brands managed' },
              { num: 'In-house', label: 'All creative production' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ad formats */}
      <div className="container pb-lg pt-lg">
        <p className="bask-text-small text-muted fw-600 mb-8">AD FORMATS WE MANAGE</p>
        <h2 className="bask-section-heading mb-48">Every Meta placement.<br/>One in-house team.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {AD_FORMATS.map(f => (
            <div key={f.title} style={{ padding: '28px', border: '1px solid var(--gray-200)', borderRadius: 16 }}>
              <h3 style={{ fontWeight: 800, fontSize: 18, margin: '0 0 12px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creative-first section */}
      <div style={{ background: '#111', color: '#fff' }} className="py-xl">
        <div className="container">
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: '#FFE600', marginBottom: 24 }}>WHY CREATIVE MATTERS</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 24 }}>Creative is the<br/><em style={{ color: '#FFE600', fontStyle: 'italic' }}>targeting lever.</em></h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 32, maxWidth: 420 }}>Meta's targeting is now largely automated. The real differentiator in 2026 is ad creative — the right hook, visual, and offer tested against the right audiences. We produce all creatives in-house: scripts, designs, video edits. No brief gets lost in translation to an outsourced freelancer.</p>
              <Link to="/contact" className="btn btn--primary btn--lg" style={{ background: '#FFE600', color: '#000', fontWeight: 800 }}>Book a Free Meta Ads Audit →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                'In-house Bangalore creative team',
                'Static, carousel, video, and Reels formats',
                '3–5 creative variants tested per ad set',
                'Weekly creative performance reviews',
                'Audience research: interest, lookalike, retargeting',
                'WhatsApp Click-to-Chat ads for India',
              ].map(t => (
                <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ color: '#FFE600', fontSize: 18, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container pt-lg pb-lg" style={{ maxWidth: 800 }}>
        <p className="bask-text-small text-muted fw-600 mb-8">FAQs</p>
        <h2 className="bask-section-heading mb-40">Meta Ads questions, answered.</h2>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '2px solid var(--black)' }}>
          {[
            { q: 'How much does Meta Ads management cost in Bangalore?', a: 'BASK charges a flat management fee from ₹12,000/month — separate from ad spend. Includes campaign setup, audience research, creative production, A/B testing, and reporting.' },
            { q: 'What is the minimum ad budget for Meta Ads in India?', a: 'We recommend at least ₹20,000–₹30,000/month ad spend for meaningful data. Serious D2C and B2B brands typically start at ₹50,000–₹2,00,000/month.' },
            { q: 'Do you make the ad creatives?', a: 'Yes. Our in-house Bangalore team produces all images, carousels, Reels-format video, and story ads. Included in the management fee.' },
            { q: 'Which businesses benefit most from Meta Ads in Bangalore?', a: 'D2C, real estate, education, fitness/wellness, restaurants, and B2B companies with mid-funnel content. Especially effective for retargeting site visitors.' },
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
        <h2 className="bask-headline-huge mb-24">Let's build ads<br/>that actually convert.</h2>
        <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 500, margin: '0 auto 32px' }}>Book a free 30-minute Meta Ads audit. We'll review your current campaigns and tell you exactly what to fix.</p>
        <Link to="/contact" className="btn btn--primary btn--lg">Book Free Audit →</Link>
      </div>
    </div>
  );
}
