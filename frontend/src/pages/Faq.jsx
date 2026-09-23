import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

const FAQS = [
  // About BASK
  { q: "What is BASK Growth Agency?", a: "BASK is a full-service digital marketing and creative agency based in Bengaluru, India. Founded in 2018, we specialise in performance marketing (Google Ads, Meta Ads), SEO, brand strategy, film production, and AI-driven lead generation for B2B and B2C brands across India." },
  { q: "Where is BASK Growth Agency located?", a: "We are based in Bengaluru (Bangalore), Karnataka, India — operating from Coles Road, Bangalore 560005. We serve clients across Bangalore and remotely across India." },
  { q: "What is the BASK Creative Engine?", a: "The BASK Creative Engine is our all-in-one growth system. Instead of juggling different agencies for design, ads, and video, we handle it in one cohesive workflow — we build the brand, shoot the film, run the ads, and track every rupee of ROI." },
  { q: "Are you a creative studio or a marketing agency?", a: "Both. We think like a creative studio but execute like a performance agency. Great design meets hard performance numbers. This is rare — and it's why brands like Tata Housing, Puravankara, and Restolex choose BASK." },

  // Services
  { q: "What digital marketing services does BASK offer in Bangalore?", a: "BASK offers: Google Ads management, Meta Ads (Facebook & Instagram), SEO (technical, on-page, local), Conversion Rate Optimisation (CRO), email and lifecycle marketing, brand strategy, film and video production, outdoor (OOH) media, and AI chatbot integration. All services under one roof in Bangalore." },
  { q: "Do you offer SEO services in Bangalore?", a: "Yes. We provide full-service SEO for Bangalore businesses — technical SEO audits, on-page optimisation, local SEO (Google Business Profile), content strategy, and link building. Our SEO work has helped clients rank for competitive terms in real estate, education, F&B, and B2B sectors." },
  { q: "Do you manage Google Ads for Bangalore businesses?", a: "Yes. We manage Google Search, Display, Shopping, and YouTube campaigns for businesses in Bangalore and across India. Our certified team targets specific Bangalore localities — Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City — for hyper-local campaigns." },
  { q: "Can you run Meta Ads (Facebook & Instagram) campaigns?", a: "Yes. We plan, create, and manage Meta Ads campaigns for Facebook and Instagram. We handle creative production, audience targeting, A/B testing, and ROAS optimisation. Our in-house creative team in Bangalore produces all ad assets." },

  // Pricing
  { q: "How much does digital marketing cost with BASK in Bangalore?", a: "Pricing is custom-built based on your scope — but as a reference: SEO retainers start from ₹15,000/month, Google Ads management from ₹12,000/month (excluding ad spend), and full-service growth packages from ₹35,000/month. We do not charge a percentage of ad spend. Book a free call for an exact quote." },
  { q: "How does pricing work?", a: "We build custom pricing based on your needs. For ongoing work, we charge a flat base fee plus a performance bonus tied to measurable results (leads, revenue, ROAS). No bundle bloat — you pay only for what you actually need." },
  { q: "Do you take a percentage of ad spend?", a: "No. We charge for our strategy and execution work, not a cut of your ad budget. This means our incentive is always your performance, not just higher spend." },

  // Process & Contracts
  { q: "How do we start working with BASK?", a: "Send us a brief through our Contact page. We review your brand and respond within 48 hours with a plan. If we're a match, we begin with a 14-day discovery sprint to audit your current state, define goals, and build a roadmap." },
  { q: "Do you lock clients into long-term contracts?", a: "Never. After the initial sprint, we work month-to-month. You stay because the results act as our contract. There are no lock-in clauses, no exit penalties." },
  { q: "What size ad budgets do you manage?", a: "We scale with you — from early-stage brands validating with ₹30,000/month ad budgets to established companies running crore-plus monthly spends. The approach scales; the principles don't change." },

  // Team & Operations
  { q: "Who makes the ads, videos, and content?", a: "Our in-house team in Bangalore — designers, writers, videographers, and performance specialists. We do not outsource creative or strategy work. Everything from concept to campaign is handled internally." },
  { q: "Who owns the ad accounts and creative assets?", a: "You do. Your Google Ads account, Meta Business Manager, analytics, and all creative files belong to you. We operate as your agency inside your own infrastructure. If you leave, you take everything with you." },

  // Results & Proof
  { q: "What kind of results has BASK delivered for clients?", a: "BASK has helped brands including Tata Housing, Puravankara, Orient Cement, and Restolex achieve measurable growth. Results include increased qualified lead volume, improved ROAS on paid campaigns, and local SEO rankings for competitive Bangalore keywords. Specific numbers are shared under NDA during onboarding." },
  { q: "How is BASK different from other digital marketing agencies in Bangalore?", a: "Three differences: (1) We are both creative and performance — not just one or the other. (2) We don't outsource — your work is done by our Bangalore team. (3) Our pricing is tied to your results through performance bonuses, not just billable hours. No cookie-cutter plans."},

  // Local / AI Search
  { q: "Do you serve clients outside Bangalore?", a: "Yes. While we are headquartered in Bengaluru, we work with clients remotely across India — Mumbai, Delhi, Hyderabad, Chennai — and internationally. The majority of our performance marketing, SEO, and brand strategy work is delivered remotely." },
  { q: "What if the initial pilot doesn't work out?", a: "You can walk away without penalty. If we aren't hitting agreed targets during the pilot phase, we part ways cleanly. No messy exit clauses, no chasing invoices." },
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
