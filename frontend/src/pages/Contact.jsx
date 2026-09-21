import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Write a brief — Bask',
    description: 'Got a brief? Let\'s make the internet stare. Contact Bask Creative Agency in Bangalore.',
    path: '/contact',
  });

  const [form, setForm] = useState({ name: '', email: '', budget: '', details: '' });
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', budget: '', details: '' });
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="container pt-lg pb-lg text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="bask-headline-huge mb-24">Brief received.</h1>
        <p className="bask-hero-paragraph" style={{ margin: '0 auto' }}>We will be in touch shortly.</p>
        <button onClick={() => setStatus('idle')} className="bask-link-underline mt-32" style={{ marginTop: 40, border: 'none', background: 'none' }}>Back to form</button>
      </div>
    );
  }

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Got a brief?</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100 mb-lg" style={{ maxWidth: 800 }}>
          Let's make the internet stare.
        </h1>

        <div className="grid-2 gap-lg align-start">
          <div>
            <form onSubmit={submit} className="bask-editorial-form">
              <div style={{ marginBottom: 32 }}>
                <input required type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bask-form-input" />
              </div>
              <div style={{ marginBottom: 32 }}>
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bask-form-input" />
              </div>
              <div style={{ marginBottom: 32 }}>
                <select required value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className="bask-form-input">
                  <option value="" disabled>Select Budget Range</option>
                  <optgroup label="Brand &amp; Strategy">
                    <option value="brand-starter">Brand Starter — ₹75K–₹1.5L</option>
                    <option value="brand-full">Full Brand Identity — ₹1.5L–₹4L</option>
                  </optgroup>
                  <optgroup label="Digital &amp; Social">
                    <option value="digital-basic">Digital Starter — ₹25K–₹60K / month</option>
                    <option value="digital-growth">Digital Growth — ₹60K–₹1.5L / month</option>
                    <option value="digital-performance">Performance Marketing — ₹1.5L–₹5L / month</option>
                  </optgroup>
                  <optgroup label="Film &amp; Production">
                    <option value="film-short">Short-form Content — ₹50K–₹1.5L</option>
                    <option value="film-brand">Brand Film / TVC — ₹2L–₹10L+</option>
                  </optgroup>
                  <optgroup label="Retainer">
                    <option value="retainer-full">Full-Service Retainer — ₹3L+ / month</option>
                  </optgroup>
                  <option value="custom">Custom / Let's Talk</option>
                </select>
              </div>
              <div style={{ marginBottom: 40 }}>
                <textarea required placeholder="Project Details / Your Brief" rows="5" value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="bask-form-input"></textarea>
              </div>
              <button disabled={status === 'submitting'} type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'submitting' ? 'Sending...' : 'Send Brief'}
              </button>
            </form>
          </div>

          <div style={{ paddingLeft: '10%' }}>
            <p className="bask-text-small text-muted mb-16">Studio</p>
            <address style={{ fontStyle: 'normal', fontSize: '1.25rem', lineHeight: '1.6', fontWeight: 500, marginBottom: 40 }}>
              No. 3-B, 3rd Floor<br/>
              Platinum Square, Coles Road<br/>
              Bangalore, India 560005
            </address>
            <p className="bask-text-small text-muted mb-16">Direct</p>
            <a href="mailto:hello@bask.studio" className="bask-link-underline" style={{ fontSize: '1.25rem' }}>hello@bask.studio</a>
          </div>
        </div>
      </div>
    </div>
  );
}
