import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Search Engine Optimization",
  "name": "SEO Company in Bangalore",
  "description": "Technical SEO, on-page optimisation, local SEO, content strategy, and link building for businesses in Bangalore and India.",
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
  "areaServed": [
    { "@type": "City", "name": "Bengaluru" },
    { "@type": "Country", "name": "India" }
  ],
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "INR",
    "description": "SEO retainer starting from ₹15,000/month"
  }
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does SEO cost in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "SEO retainers at BASK start from ₹15,000/month for small businesses. Mid-size brand packages (technical SEO + content + link building) range from ₹25,000–₹60,000/month depending on competitiveness and scope. Enterprise/ecommerce SEO is priced on a custom basis." }
    },
    {
      "@type": "Question",
      "name": "How long does SEO take to show results in Bangalore?",
      "acceptedAnswer": { "@type": "Answer", "text": "For moderately competitive keywords in Bangalore, expect initial ranking movement in 3–6 months and meaningful traffic increases in 6–12 months. Highly competitive terms like 'SEO company Bangalore' or 'real estate agency Bangalore' take 12–18+ months of sustained effort for new domains." }
    },
    {
      "@type": "Question",
      "name": "Do you do local SEO for Bangalore businesses?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Local SEO is a core offering. We optimise Google Business Profiles, build local citations (Justdial, Sulekha, IndiaMART), target locality-specific keywords (Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City), and build locally relevant content to rank in the local map pack." }
    },
    {
      "@type": "Question",
      "name": "What SEO services does BASK provide?",
      "acceptedAnswer": { "@type": "Answer", "text": "We provide: technical SEO audits (Core Web Vitals, crawlability, structured data), on-page optimisation (title tags, H1-H3 hierarchy, content), local SEO (GBP, citations, local keyword targeting), content strategy and blog writing, and off-page link building through ethical white-hat methods." }
    }
  ]
};

const PROCESS = [
  { n: '01', title: 'Technical Audit', desc: 'Full crawl of your site — Core Web Vitals, crawlability, structured data, duplicate content, and indexing issues. We find what\'s blocking rankings before touching content.' },
  { n: '02', title: 'Keyword Research', desc: 'Map your audience to specific search intents — commercial, informational, local. We prioritise terms your domain can realistically rank for in 3–12 months, not just the highest-volume head terms.' },
  { n: '03', title: 'On-Page Optimisation', desc: 'Unique H1s, meta titles under 60 chars, descriptive meta descriptions, proper H2–H3 hierarchy, image alt text, and internal linking — done for every page, not just the homepage.' },
  { n: '04', title: 'Content Strategy', desc: 'One genuinely useful piece of content is worth more than 10 thin pages. We build a content calendar targeting long-tail, high-conversion queries your competitors ignore.' },
  { n: '05', title: 'Local SEO', desc: 'Google Business Profile optimisation, local citation building, review generation strategy, and locality-specific landing pages for Bangalore neighbourhoods.' },
  { n: '06', title: 'Link Building', desc: 'Ethical, contextual backlinks from Indian business publications, industry directories (Clutch, GoodFirms), and guest posts — no link farms, no PBNs.' },
];

const CLIENTS = ['Tata Housing', 'Puravankara', 'Orient Cement', 'Restolex', 'Acharya B-School', 'Foundation School'];

export default function SeoLanding() {
  useSEO({
    title: 'SEO Company in Bangalore — Technical SEO, Local SEO & Content Strategy',
    description: 'BASK Growth Agency is a top SEO company in Bangalore. We offer technical SEO audits, on-page optimisation, local SEO for Google Business Profile, and content strategy. Retainers from ₹15,000/month. Book a free SEO audit.',
    path: '/services/seo-company-bangalore',
    schema: [SEO_SCHEMA, FAQ_SCHEMA],
  });

  return (
    <div className="bask-page">
      {/* Hero */}
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">SEO SERVICES · BANGALORE</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          SEO Company<br/>in Bangalore.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200" style={{ maxWidth: 640 }}>
          Technical SEO, local SEO, and content strategy for Bangalore businesses. We make your site findable by Google, Bing, and AI-powered search — not just in theory, but in the actual HTML crawlers read.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn--primary btn--lg">Get a Free SEO Audit →</Link>
          <Link to="/services" className="btn btn--lg" style={{ background: 'transparent', border: '2px solid var(--gray-300)', color: 'var(--black)' }}>All Services</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }} className="py-lg">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {[
              { num: '₹15K', label: 'Starting monthly retainer' },
              { num: '47+', label: 'Clients ranked' },
              { num: '8', label: 'Years in SEO' },
              { num: '100%', label: 'White-hat only' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="container pb-lg pt-lg">
        <p className="bask-text-small text-muted fw-600 mb-8">WHAT'S INCLUDED</p>
        <h2 className="bask-section-heading mb-48">Full-service SEO.<br/>No partial solutions.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '2px solid var(--black)' }}>
          {[
            { title: 'Technical SEO Audit', items: 'Core Web Vitals · Crawlability · Structured Data · Indexing · Mobile Usability', desc: 'We find what\'s technically blocking your rankings before touching a single piece of content. Fixes here compound everything downstream.' },
            { title: 'On-Page Optimisation', items: 'Title Tags · Meta Descriptions · H1–H3 · Alt Text · Internal Links', desc: 'Every indexed page gets correct title lengths, unique descriptions, proper heading hierarchy, and descriptive alt text. Basic, but most sites ignore it.' },
            { title: 'Local SEO Bangalore', items: 'Google Business Profile · Citations · Locality Keywords · Map Pack', desc: 'We rank you in Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City, and the broader Bangalore local pack. NAP consistency across Justdial, Sulekha, IndiaMART.' },
            { title: 'Content Strategy & Writing', items: 'Keyword Research · Content Briefs · Blog Posts · Landing Pages', desc: 'Long-tail, high-intent content that converts — not just keyword-stuffed articles. Every piece targets a specific search intent and links to a service page.' },
            { title: 'Link Building', items: 'Guest Posts · Directory Listings · PR · Contextual Backlinks', desc: 'Ethical white-hat links from Indian business publications and niche directories. We don\'t do link farms — that\'s how you get penalised.' },
            { title: 'Schema & Structured Data', items: 'LocalBusiness · FAQPage · Service · AggregateRating · BreadcrumbList', desc: 'Properly coded JSON-LD schema validated against Google Rich Results Test. Essential for AI-powered search citations (ChatGPT, Perplexity, Google AI Overviews).' },
          ].map((s, i, arr) => (
            <div key={s.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: '36px 0', borderBottom: i < arr.length - 1 ? '2px solid var(--gray-200)' : '2px solid var(--gray-200)', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', letterSpacing: 0.3, margin: 0 }}>{s.items}</p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div style={{ background: '#111', color: '#fff' }} className="py-xl">
        <div className="container">
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, color: '#FFE600', marginBottom: 24 }}>OUR SEO PROCESS</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 56, color: '#fff' }}>How we do it.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {PROCESS.map(p => (
              <div key={p.n} style={{ padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.12)', display: 'block', marginBottom: 12 }}>{p.n}</span>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container pt-lg pb-lg" style={{ maxWidth: 800 }}>
        <p className="bask-text-small text-muted fw-600 mb-8">FAQs</p>
        <h2 className="bask-section-heading mb-40">SEO questions, answered.</h2>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '2px solid var(--black)' }}>
          {[
            { q: 'How much does SEO cost in Bangalore?', a: 'SEO retainers at BASK start from ₹15,000/month for small businesses. Mid-size brand packages (technical SEO + content + link building) range from ₹25,000–₹60,000/month depending on competitiveness and scope.' },
            { q: 'How long does SEO take to work?', a: 'For moderately competitive keywords in Bangalore, expect initial ranking movement in 3–6 months and meaningful traffic increases in 6–12 months. Highly competitive terms take 12–18+ months for new domains.' },
            { q: 'Do you do local SEO for Bangalore neighbourhoods?', a: 'Yes — Koramangala, Indiranagar, Whitefield, HSR Layout, Electronic City, JP Nagar, Jayanagar, Marathahalli and more. We build locality-specific landing pages and optimise your Google Business Profile for map pack visibility.' },
            { q: 'Do you guarantee rankings?', a: 'No reputable SEO agency can guarantee specific rankings — Google\'s algorithm is a black box. What we guarantee is transparent process, measurable inputs (content published, links built, technical fixes shipped), and regular reporting on traffic and ranking trends.' },
          ].map(f => (
            <div key={f.q} style={{ padding: '28px 0', borderBottom: '1px solid var(--gray-200)' }}>
              <dt style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: 'var(--black)' }}>{f.q}</dt>
              <dd style={{ margin: 0, fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7 }}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Clients */}
      <div style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-200)' }} className="py-lg">
        <div className="container">
          <p className="bask-text-small text-muted fw-600 mb-24">BRANDS WE'VE RANKED</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {CLIENTS.map(c => (
              <span key={c} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 10, padding: '8px 18px', fontSize: 13, fontWeight: 700 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container pt-lg pb-xl text-center">
        <h2 className="bask-headline-huge mb-24">Ready to rank<br/>in Bangalore?</h2>
        <p style={{ fontSize: 17, color: 'var(--gray-600)', maxWidth: 500, margin: '0 auto 32px' }}>Book a free 30-minute SEO audit call. We'll show you exactly what's holding your rankings back.</p>
        <Link to="/contact" className="btn btn--primary btn--lg">Book Free SEO Audit →</Link>
      </div>
    </div>
  );
}
