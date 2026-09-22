import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

/* ─── Inline SVG Icons (stroke-based, B&W friendly) ─────────────── */
const icons = {
  globe:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  sparkles:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  server:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  search:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  target:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  chart:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  monitor:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="13" rx="1"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  video:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  bot:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  zap:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  brain:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.8A3 3 0 0 1 5 9.5a3 3 0 0 1 3-3 2.5 2.5 0 0 1 1.5-4.5Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.8A3 3 0 0 0 19 9.5a3 3 0 0 0-3-3 2.5 2.5 0 0 0-1.5-4.5Z"/></svg>,
  trend:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  chevron:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
};

function SvgIcon({ name, size = 18 }) {
  return (
    <span style={{ width: size, height: size, display: 'flex', flexShrink: 0 }}>
      {icons[name]}
    </span>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const COLS = [
  {
    id: 'web',
    icon: 'globe',
    label: 'Web Development',
    sub: 'Full-Stack Technology',
    nodes: [
      { icon: 'globe',     title: 'Frontend Frameworks',  items: ['React 18 + Vite + Hooks', 'Next.js SSR / SSG', 'TypeScript Architecture', 'Design System & Tokens'] },
      { icon: 'sparkles',  title: 'CSS & Motion Design',  items: ['CSS3 Glassmorphism & Variables', 'SVG & Keyframe Animations', 'Framer Motion Library', 'Dark / Light Mode Systems'] },
      { icon: 'server',    title: 'Backend & APIs',       items: ['Node.js + Express REST APIs', 'MongoDB & PostgreSQL', 'JWT Auth & Middleware', 'Redis Caching & Sessions'] },
      { icon: 'search',    title: 'SEO & Performance',    items: ['Schema.org JSON-LD Rich Results', 'Google Lighthouse 100/100', 'Core Web Vitals Optimization', 'FAQPage & LocalBusiness Schema'] },
    ]
  },
  {
    id: 'mktg',
    icon: 'target',
    label: 'Digital Marketing',
    sub: 'Growth & Conversion',
    nodes: [
      { icon: 'target',    title: 'Paid Advertising',         items: ['Meta Ads Manager (FB + IG)', 'Google Search & Performance Max', 'LinkedIn B2B Advertising', 'YouTube Pre-roll & Discovery Ads'] },
      { icon: 'chart',     title: 'Analytics & Attribution',  items: ['Google Analytics 4 (GA4)', 'Meta Conversions API (CAPI)', 'Looker Studio Live Dashboards', 'Multi-Touch Attribution Models'] },
      { icon: 'monitor',   title: 'Outdoor OOH Media',        items: ['3D LED & Digital Billboard Buying', 'Bangalore Prime Locations', 'Transit & Mall Media Buys', 'Anamorphic Visual Production'] },
      { icon: 'video',     title: 'Video & Film Production',  items: ['ARRI 4K Commercial Shoots', 'Instagram Reels & YouTube Shorts', 'TVC & Brand Documentaries', 'Color Grading & Sound Design'] },
    ]
  },
  {
    id: 'ai',
    icon: 'bot',
    label: 'AI & Automation',
    sub: '24/7 Intelligence Engine',
    nodes: [
      { icon: 'bot',    title: 'Conversational AI',      items: ['Custom GPT-4o Trained Chatbots', 'Gemini AI Knowledge Base', 'WhatsApp Business API Bot', '24/7 Automated Lead Capture'] },
      { icon: 'zap',    title: 'Workflow Automation',    items: ['Zapier & Make.com Pipelines', 'CRM Auto-Population', 'Email Drip Sequence Automation', 'Slack & Notification Bots'] },
      { icon: 'brain',  title: 'AI Ad Creative Engine',  items: ['Dynamic Copy Generation', 'A/B Variant Creative Testing', 'Lookalike Audience Modelling', 'ROAS Budget Optimization'] },
      { icon: 'trend',  title: 'Predictive Analytics',   items: ['CLV Forecasting Models', 'Churn Detection Algorithms', 'Lead Scoring Systems', 'Revenue Attribution ML'] },
    ]
  },
];

const PROCESS_COLS = [
  {
    id: 'discovery',
    icon: 'search',
    label: '1. Discovery & Strategy',
    sub: 'The First 14 Days',
    nodes: [
      { icon: 'search', title: 'The Brief & Intro', items: ['Submit your quick brief', 'Initial chemistry call', 'Business goal alignment'] },
      { icon: 'chart', title: 'Deep Audit', items: ['Competitor mapping', 'Current ad account review', 'Brand & UX teardown'] },
      { icon: 'target', title: 'Action & Proposal', items: ['Custom 90-day growth plan', 'Clear KPI forecasting', 'Transparent bespoke pricing'] },
    ]
  },
  {
    id: 'execution',
    icon: 'zap',
    label: '2. Execution Engine',
    sub: 'Building & Launching',
    nodes: [
      { icon: 'sparkles', title: 'Creative Production', items: ['Copywriting & scripts', 'Design & video editing', 'High-converting landing pages'] },
      { icon: 'globe', title: 'Campaign Setup', items: ['Pixel & tracking integration', 'Audience segmentation', 'A/B creative variant splits'] },
      { icon: 'server', title: 'Go-Live & Validation', items: ['Pilot campaign launch', 'Initial data gathering', 'Rapid iteration cycles'] },
    ]
  },
  {
    id: 'scaling',
    icon: 'trend',
    label: '3. Scale & Report',
    sub: 'Month-to-Month Growth',
    nodes: [
      { icon: 'trend', title: 'Budget Scaling', items: ['Winning ad isolation', 'Incremental budget bumps', 'Absolute ROAS optimization'] },
      { icon: 'monitor', title: 'Live Dashboard', items: ['24/7 transparent client access', 'Custom data visualization', 'Real-time performance tracking'] },
      { icon: 'bot', title: 'Strategy Reviews', items: ['Weekly async updates', 'Monthly deep-dives', 'Next-quarter forecasting'] },
    ]
  },
];

/* ─── Expandable Node ────────────────────────────────────────────── */
function Node({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      {/* Connector line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 2, height: 20, background: '#CBD5E1' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', border: '2px solid #94A3B8', background: open ? '#0F172A' : '#FFF' }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: open ? '#0F172A' : '#FFF',
          border: `1.5px solid ${open ? '#0F172A' : '#E2E8F0'}`,
          borderRadius: 8, padding: '12px 14px',
          cursor: 'pointer',
          boxShadow: open ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Head */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: open ? '#FFF' : '#475569', display: 'flex' }}>
            <SvgIcon name={data.icon} size={17} />
          </span>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: open ? '#FFF' : '#0F172A' }}>{data.title}</span>
          <span style={{ color: open ? '#94A3B8' : '#CBD5E1', display: 'flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <SvgIcon name="chevron" size={14} />
          </span>
        </div>

        {/* Expanded items */}
        {open && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#CBD5E1' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#64748B', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Showcase() {
  useSEO({
    title: 'The Creative Engine — How Bask Works',
    description: 'Inside the BASK Creative Engine: a plain-English breakdown of the tools and systems we use for web design, marketing, and AI automation.',
    path: '/showcase'
  });

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: 80 }}>

      <div style={{
        background: '#0F172A',
        backgroundImage: 'url(/showcase-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center', padding: '52px 24px 36px',
        position: 'relative',
      }}>
        {/* Dark scrim so text stays sharp */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.72)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>The BASK Creative Engine</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#FFF', margin: '0 0 12px' }}>
            How we grow brands.
          </h1>
          <p style={{ fontSize: 15, color: '#64748B', maxWidth: 580, margin: '0 auto 28px', lineHeight: 1.6 }}>
            No confusing jargon. Just the exact systems, tools, and platforms we use to build your digital presence, run your ads, and scale your revenue. Click any step below to see what's under the hood.
          </p>
          <Link to="/contact" style={{ display: 'inline-block', background: '#FFF', color: '#0F172A', fontWeight: 800, fontSize: 13, padding: '10px 24px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.02em' }}>
            Start your project →
          </Link>
        </div>
      </div>

      {/* ── Tree ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>

        {/* BASK Root Node */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: '#0F172A', color: '#FFF',
            border: '2px solid #0F172A',
            outline: '6px solid rgba(15,23,42,0.08)',
            borderRadius: 100, padding: '16px 36px',
            fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          }}>
            <svg viewBox="0 0 32 32" width={26} height={26}>
              <circle cx="16" cy="16" r="16" fill="#FFF"/>
              <text x="16" y="21" fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="#000" textAnchor="middle">B</text>
            </svg>
            BASK Creative Engine
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#FFF" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
        </div>

        {/* Bezier SVG Branches */}
        <div style={{ position: 'relative', height: 72 }}>
          <svg viewBox="0 0 1140 72" preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <marker id="bw-dot" markerWidth="8" markerHeight="8" refX="4" refY="4">
                <circle cx="4" cy="4" r="3.5" fill="#0F172A"/>
              </marker>
            </defs>
            <path d="M 570 0 C 570 36, 190 36, 190 72" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#bw-dot)" style={{animation:'dashPulse 2s linear infinite'}}/>
            <path d="M 570 0 C 570 36, 570 36, 570 72" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#bw-dot)" style={{animation:'dashPulse 2s linear infinite'}}/>
            <path d="M 570 0 C 570 36, 950 36, 950 72" fill="none" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#bw-dot)" style={{animation:'dashPulse 2s linear infinite'}}/>
          </svg>
        </div>

        {/* ── Heading: How We Operate ── */}
        <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 12 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>1. How We Operate</h2>
          <p style={{ color: '#64748B', fontWeight: 600 }}>The methodology from first call to scale.</p>
        </div>

        {/* Process Tree Columns */}
        <div className="bask-roadmap-grid" style={{ padding: 0, margin: '0 0 80px', gap: 28 }}>
          {PROCESS_COLS.map(col => (
            <div key={col.id} className="bask-roadmap-col">
              <div style={{
                width: '100%', padding: '13px 16px',
                background: '#0F172A', borderRadius: 8, color: '#FFF',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}>
                <span style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 6, padding: '6px', display: 'flex' }}>
                  <SvgIcon name={col.icon} size={17} />
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{col.label}</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.sub}</div>
                </div>
              </div>

              {col.nodes.map((node, i) => <Node key={i} data={node} />)}
            </div>
          ))}
        </div>


        {/* ── Heading: What's Under The Hood ── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>2. What's Under The Hood</h2>
          <p style={{ color: '#64748B', fontWeight: 600 }}>The exact technology & platforms we use to execute.</p>
        </div>

        {/* Tech Stack Tree Columns */}
        <div className="bask-roadmap-grid" style={{ padding: 0, margin: 0, gap: 28 }}>
          {COLS.map(col => (
            <div key={col.id} className="bask-roadmap-col">

              {/* Column Header */}
              <div style={{
                width: '100%', padding: '13px 16px',
                background: '#0F172A', borderRadius: 8, color: '#FFF',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}>
                <span style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 6, padding: '6px', display: 'flex' }}>
                  <SvgIcon name={col.icon} size={17} />
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{col.label}</div>
                  <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.sub}</div>
                </div>
              </div>

              {/* Nodes */}
              {col.nodes.map((node, i) => (
                <Node key={i} data={node} />
              ))}

              {/* Footer CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 2, height: 20, background: '#CBD5E1' }} />
              </div>
              <Link to="/contact" style={{
                display: 'block', textAlign: 'center', color: '#0F172A', fontWeight: 700, fontSize: 13,
                textDecoration: 'none', border: '1.5px dashed #CBD5E1', borderRadius: 8, padding: '10px',
                background: '#FFF',
              }}>
                Start a Project →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
