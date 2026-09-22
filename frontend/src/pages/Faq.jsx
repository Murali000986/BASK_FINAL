import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

const FAQS = [
  { q: "What exactly is the BASK Creative Engine?", a: "It's our all-in-one system for brand growth. Instead of juggling different agencies for design, ads, and video, we handle it all in one cohesive workflow. We build the brand, shoot the film, and run the ads." },
  { q: "Are you a creative studio or a marketing agency?", a: "Both. We think like a creative studio but execute like a performance agency. Great design meets hard numbers." },
  { q: "How do we start working together?", a: "Drop us a brief using the button top right. We'll review your brand and get back to you with a plan within 48 hours. If we're a match, we start with a 14-day discovery sprint." },
  { q: "Do you lock clients into long-term contracts?", a: "Never. After our initial sprint, we work on a month-to-month basis. You stay because the results act as our contract." },
  { q: "How does pricing work?", a: "We build custom pricing based on your needs. For ongoing work, we charge a flat base fee plus a performance bonus tied to the revenue we generate for you." },
  { q: "Do you take a percentage of our ad spend?", a: "No. We charge for our work and performance, not for how much money you spend on ads. Our goal is growth, not just spending." },
  { q: "What size budgets do you manage?", a: "We scale with you. From early validation budgets to crore-plus monthly ad spends. The core principles of the Creative Engine remain the same." },
  { q: "Who actually makes the ads and videos?", a: "Our in-house team in Bangalore. We don't outsource. Our designers, writers, and filmmakers handle everything from start to finish." },
  { q: "What if the initial pilot doesn't work out?", a: "You can walk away without any penalty. If we aren't hitting our agreed targets, we part ways nicely. No messy breakups." },
  { q: "Who owns all the data and creative assets?", a: "You do. Your ad accounts, your data, your videos. We just run the engine. If you leave, you take it all with you." }
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
    title: 'FAQ — BASK Creative Engine | Plain English Answers',
    description: 'Everything you need to know about BASK Creative Engine in plain English. How we work, pricing, structure, and deliverables.',
    path: '/faq',
    schema: FAQ_SCHEMA,
  });

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">FAQ · BASK Creative Engine</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100 mb-24" style={{ maxWidth: 900 }}>
          No jargon.<br/>Just answers.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200">
          Everything about how the BASK Creative Engine operates, delivered in plain, simple English.
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

        {/* CTA */}
        <div style={{ marginTop: 80, padding: '56px 48px', background: 'var(--black)', borderRadius: 4, maxWidth: 900 }}>
          <p className="bask-text-small fw-600 mb-8" style={{ color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Have more questions?</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            Let's talk.
          </h2>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.15rem', marginBottom: 32, lineHeight: 1.6 }}>
            Send us a brief. We'll give you a clear plan and honest numbers in 48 hours.
          </p>
          <a href="/contact" className="btn btn--primary btn--lg" style={{ background: '#fff', color: '#000' }}>
            Write a brief →
          </a>
        </div>
      </div>
    </div>
  );
}
