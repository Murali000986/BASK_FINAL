import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const GOALS = ['Increase Sales', 'Reduce CAC', 'Scale Organic Traffic', 'Improve LTV', 'Launch New Channel', 'Analytics & Attribution'];

export default function Contact() {
  useSEO({
    title: 'Contact BASK — Get a Free Growth Proposal from Our Bangalore Agency',
    description: 'Get a free strategy proposal from BASK Growth Agency, Bangalore. We respond in 24–48 hours. Performance marketing, SEO, CRO for brands across India.',
    path: '/contact',
  });

  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '',
    size: '1-10', budget: '', goal: 'Increase Sales',
    timeline: '1-3 months', description: '',
    consent1: false, consent2: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function validate() {
    const e = {};
    if (!form.company.trim()) e.company = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.contact.trim()) e.contact = 'Required';
    if (!form.consent1) e.consent1 = 'Please agree to be contacted';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setSubmitError('');
    try {
      await api.submitProposal(form);
      setSubmitted(true);
    } catch {
      setSubmitError('Submission failed — please check your connection and try again, or email us directly at hello@baskagency.com.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div className="contact-layout">
        {/* ── Main Form ── */}
        <div>
          {/* Hero */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', marginBottom: 48 }}>
            <div>
              <h1 style={{ marginBottom: 16 }}>Contact & Get a Proposal</h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                Share a few details about your project and we'll prepare a tailored growth proposal.
                Prefer a quick chat? Book a discovery call directly below.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn--primary">Request Proposal</button>
                <button className="btn btn--outline">Book Discovery Call</button>
              </div>
            </div>
            <div style={{ width: 220, height: 180, background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0 }}>
              <img src="https://images.unsplash.com/photo-1497366811353-685698d249f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
            <div className="card">
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 4 }}>Average Client ROI</p>
              <p style={{ fontSize: '2rem', fontWeight: 800 }}>4.8x</p>
              <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Measured across last 24 clients (median)</p>
            </div>
            <div className="card">
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 4 }}>Trusted by</p>
              {['Aster Media', 'Bolt Commerce'].map(b => (
                <p key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 4 }}>
                  <span style={{ width: 28, height: 28, background: 'var(--gray-200)', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{b[0]}</span>
                  {b}
                </p>
              ))}
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="success-msg">
              <p className="icon">✅</p>
              <h2 style={{ marginBottom: 8 }}>Proposal Request Received!</h2>
              <p>We'll review your brief and reach out within 24–48 business hours.</p>
              <Link to="/" className="btn btn--outline" style={{ marginTop: 20 }}>Back to Home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: 8 }}>Project Details</h2>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28 }}>
                Fill the short form below and we'll follow up with a custom proposal. Required fields are marked with *
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label>Company Name <span className="required">*</span></label>
                  <input type="text" placeholder="e.g., Nova Retail" value={form.company} onChange={e => set('company', e.target.value)} />
                  {errors.company && <p className="error-text">{errors.company}</p>}
                </div>
                <div className="form-group">
                  <label>Contact Person <span className="required">*</span></label>
                  <input type="text" placeholder="e.g., Miranda Hayes" value={form.contact} onChange={e => set('contact', e.target.value)} />
                  {errors.contact && <p className="error-text">{errors.contact}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Business Email <span className="required">*</span></label>
                  <input type="email" placeholder="hello@novaretail.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 (415) 555-0198" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Company Size</label>
                <div className="radio-group">
                  {['1-10', '11-50', '51-200', '201+'].map(s => (
                    <label key={s}>
                      <input type="radio" name="size" value={s} checked={form.size === s} onChange={() => set('size', s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Monthly Marketing Budget (INR)</label>
                <input type="text" placeholder="e.g., ₹5,00,000 or Custom Amount" value={form.budget} onChange={e => set('budget', e.target.value)} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Primary Goal</label>
                  <select value={form.goal} onChange={e => set('goal', e.target.value)}>
                    {GOALS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Estimated Timeline</label>
                  <div className="radio-group">
                    {['1-3 months', '3-6 months', '6+ months'].map(t => (
                      <label key={t}>
                        <input type="radio" name="timeline" value={t} checked={form.timeline === t} onChange={() => set('timeline', t)} />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Brief Project Description</label>
                <textarea
                  placeholder="Describe the project, key challenges, and any metrics you'd like to improve."
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="checkbox-group">
                  <input type="checkbox" id="consent1" checked={form.consent1} onChange={e => set('consent1', e.target.checked)} />
                  <label htmlFor="consent1">I agree to be contacted by BASK Agency regarding this inquiry.</label>
                </div>
                {errors.consent1 && <p className="error-text">{errors.consent1}</p>}
              </div>
              <div className="form-group">
                <div className="checkbox-group">
                  <input type="checkbox" id="consent2" checked={form.consent2} onChange={e => set('consent2', e.target.checked)} />
                  <label htmlFor="consent2">I have read the <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a> and <a href="#" style={{ textDecoration: 'underline' }}>Terms of Service</a>.</label>
                </div>
              </div>

              {submitError && (
                <div style={{ background: '#fff1f1', border: '1px solid #fca5a5', borderRadius: 8, padding: '14px 16px', marginBottom: 16, color: '#dc2626', fontSize: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0 }}>⚠️</span>
                  <span>{submitError}</span>
                  <button onClick={() => setSubmitError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: 16, flexShrink: 0, opacity: .6 }}>✕</button>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
                  {loading ? 'Submitting…' : 'Submit & Get Proposal'}
                </button>
                <button type="button" className="btn btn--outline btn--lg">Schedule Discovery Call</button>
              </div>
              <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 12 }}>Typical response time: 24–48 business hours</p>
            </form>
          )}

          {/* Other ways */}
          <div style={{ marginTop: 56 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div>
                <h3 style={{ marginBottom: 20 }}>Other Ways to Reach Us</h3>
                <ul className="info-list">
                  <li><span className="material-icons">email</span><a href="mailto:hello@baskgrowth.xyz">hello@baskgrowth.xyz</a></li>
                  <li><span className="material-icons">phone</span>+91 98765 43210</li>
                  <li><span className="material-icons">location_on</span>Bengaluru, Karnataka, India — 560001<br />Office hours: Mon–Fri 9:00am – 7:00pm IST</li>
                </ul>
                <div style={{ marginTop: 20 }}>
                  <a href="#" style={{ fontSize: 13, marginRight: 16, color: 'var(--gray-500)' }}>Privacy Policy</a>
                  <a href="#" style={{ fontSize: 13, color: 'var(--gray-500)' }}>Terms of Service</a>
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: 16 }}>Our Office Location</h3>
                <div style={{ height: 200, background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e9d4 100%)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1497366811353-685698d249f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Office map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ marginTop: 56 }}>
            <h2 style={{ marginBottom: 28 }}>What Clients Say</h2>
            <div className="testimonials-grid">
              {[
                { avatar: 'ER', name: 'Elias Romero, VP Marketing', company: 'Pulse Retail', quote: 'GrowthPartner increased our qualified leads by 210% within 4 months — their team aligned strategy and creative flawlessly.' },
                { avatar: 'AR', name: 'Aisha Rahman, Head of Growth', company: 'Beacon Tech', quote: 'Their proposal was precise and ROI-focused — we scaled media spend with confidence.' },
                { avatar: 'MT', name: 'Maya Tran, Head of Product', company: 'Orbit Foods', quote: 'Excellent cross-functional collaboration and transparent reporting — delivered on every metric.' },
              ].map(t => (
                <div key={t.name} className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div className="testimonial-card__avatar">
                      <img src={`https://i.pravatar.cc/100?u=${t.name}`} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>{t.company}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--gray-700)', lineHeight: 1.7 }}>"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="contact-sidebar">
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>After You Submit</h3>
            {[
              'We review your brief and schedule a discovery call.',
              'We send a tailored proposal within 48 hours after the call.',
              "We'll provide an estimated timeline and kickoff plan.",
            ].map((t, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 10 }}>
                <strong style={{ color: 'var(--black)' }}>{i + 1}.</strong> {t}
              </p>
            ))}
            <div className="card" style={{ background: 'var(--gray-50)', marginTop: 16, padding: 12 }}>
              <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Typical response time</p>
              <p style={{ fontWeight: 700 }}>24–48 business hours</p>
            </div>

            <h4 style={{ marginTop: 20, marginBottom: 12 }}>Engagement Options</h4>
            <table className="pricing-table">
              <tbody>
                <tr><td>Growth Pilot</td><td>Custom Fixed Fee</td></tr>
                <tr><td>Scaling Partner</td><td>Custom Retainer</td></tr>
                <tr><td>Enterprise</td><td>Revenue Share</td></tr>
              </tbody>
            </table>

            <div className="card" style={{ background: 'var(--gray-50)', marginTop: 16, padding: 12 }}>
              <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 4 }}>Recent Result</p>
              <p style={{ fontSize: 13, fontWeight: 600 }}>Retail client scaled paid ROI to 5.2x within 6 months</p>
            </div>

            <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>Schedule Discovery</button>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginTop: 10 }}>
              Or email <a href="mailto:hello@growthpartner.agency" style={{ color: 'var(--black)' }}>hello@growthpartner.agency</a>
            </p>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h4 style={{ marginBottom: 12 }}>What we'll ask on the call</h4>
            {['Current acquisition channels and metrics', 'Top business priorities for next 6–12 months', 'Budget flexibility and decision timeline'].map(t => (
              <p key={t} style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 6 }}>— {t}</p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
