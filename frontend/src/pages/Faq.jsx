import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function Faq() {
  useSEO({
    title: 'FAQ — Digital Marketing Agency Bangalore Questions Answered',
    description: 'Common questions about BASK Growth Agency, Bangalore. How we work, pricing, ad spend ranges, reporting, and what happens during the 14-day pilot.',
    path: '/faq',
  });

  const FAQS = [
    { q: "Do you require long-term contracts?", a: "No. We start with risk-free pilots, transitioning into a rolling month-to-month commitment." },
    { q: "What ad spend ranges do you manage?", a: "We manage multi-tier budgets across Meta, Google Ads, and LinkedIn." },
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

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 860 }}>
      {/* ── Hero ── */}
      <div className="section-header section-header--center">
        <p className="section-header__label animate-fade-up">Deep Dive</p>
        <h1 className="section-header__title animate-fade-up delay-100">Frequently Asked Questions</h1>
        <p className="animate-fade-up delay-200" style={{ fontSize: '1.1rem', color: 'var(--gray-600)', marginTop: 16 }}>
          Everything you need to know about how we operate, how we bill, and how we scale.
        </p>
      </div>

      {/* ── FAQ List ── */}
      <div className="faq-list animate-fade-up delay-300" style={{ marginTop: 48 }}>
        {FAQS.map((faq, i) => (
          <div key={i} className="faq-item" style={i === 0 ? { borderTop: '1px solid var(--gray-200)' } : {}}>
            <h3 className="faq-item__q" style={{ cursor: 'default' }}>{faq.q}</h3>
            <p className="faq-item__a">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="animate-fade-up delay-400" style={{ textAlign: 'center', marginTop: 64 }}>
        <h3 style={{ marginBottom: 16 }}>Still have specific questions?</h3>
        <Link to="/contact" className="btn btn--primary">Get in Touch</Link>
      </div>
    </div>
  );
}
