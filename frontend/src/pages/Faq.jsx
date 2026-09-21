import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

const FAQS = [
  { q: "Do you require long-term contracts?", a: "No. We start with risk-free pilots, transitioning into a rolling month-to-month commitment." },
  { q: "What ad spend ranges do you manage?", a: "We manage multi-tier budgets across Meta, Google Ads, and LinkedIn — from multi-lakh to crore-plus per month." },
  { q: "How exactly does your pricing work?", a: "Custom pricing. Growth Pilots are fixed-fee. Retainers have a flat base plus a performance bonus tied directly to revenue." },
  { q: "Do you charge a percentage of ad spend?", a: "No. We focus on maximizing your ROAS, not maximizing our fee." },
  { q: "What happens during the initial planning phase?", a: "7-14 days of Deep Discovery. We audit accounts, CRM setup, and present a 90-day action plan before spending a dime." },
  { q: "Who owns the ad accounts and the data?", a: "You do. If you part ways with us, you keep all historical data and creatives." },
  { q: "Who builds the creatives and landing pages?", a: "We do. Copy, video editing, and coding are all done in-house." },
  { q: "How often do we get reports?", a: "24/7 client dashboard access, weekly async catch-ups, and a monthly deep strategy review." },
  { q: "Do you work with bootstrapped startups?", a: "Yes, provided the product has market validation and strong unit economics." },
  { q: "What if the 14-day pilot fails?", a: "You can walk away without obligation if we don't hit agreed leading indicators (CPA/CPL)." },
  { q: "Do you handle B2B or B2C brands?", a: "Both. We have dedicated pods for high-ticket B2B SaaS and D2C e-commerce." },
  { q: "Do you guarantee ROI?", a: "No one can guarantee exact ROAS due to market volatility. We guarantee our output quality, testing velocity, and absolute transparency." }
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

export default function Faq() {
  useSEO({
    title: 'FAQ — Digital Marketing Agency Bangalore Questions Answered',
    description: 'Common questions about BASK Growth Agency, Bangalore. How we work, pricing, ad spend ranges, reporting, and what happens during the 14-day pilot.',
    path: '/faq',
    schema: FAQ_SCHEMA,
  });

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Deep Dive</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100 mb-24" style={{ maxWidth: 900 }}>
          Everything you need to know.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200">
          How we operate, how we bill, and how we scale.
        </p>
      </div>

      <div className="container pb-xl">
        <div className="bask-faq-list" style={{ borderTop: '2px solid var(--black)', maxWidth: 900 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bask-faq-item" style={{ borderBottom: '2px solid var(--gray-200)' }}>
                <button 
                  className="bask-faq-q"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--black)', paddingRight: 32 }}>{faq.q}</span>
                  <span className="material-icons" style={{ fontSize: 24, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="bask-faq-a" style={{ paddingBottom: '32px', fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--gray-700)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
