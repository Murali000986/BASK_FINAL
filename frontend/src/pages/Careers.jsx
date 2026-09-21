import { useState, useEffect } from 'react';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

function ApplyForm({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.coverLetter.trim()) e.coverLetter = 'Cover letter is required';
    else if (form.coverLetter.trim().length < 50) e.coverLetter = 'Please write at least 50 characters';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api.applyToJob({ careerId: job.id, ...form });
      setSubmitted(true);
    } catch (err) {
      // Show server-side field errors if available
      if (err.data?.errors) setErrors(err.data.errors);
      else setApiError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card" style={{ width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <span className="material-icons" style={{ fontSize: 48, color: '#10b981', marginBottom: 16 }}>check_circle</span>
            <h3 style={{ marginBottom: 8 }}>Application Submitted!</h3>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 20 }}>We'll review your application and get back to you within 5–7 business days.</p>
            <button className="btn btn--outline" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>Apply for {job.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>{job.department} · {job.type} · {job.location}</p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray-400)', lineHeight: 1 }}>✕</button>
            </div>

            {apiError && (
              <div style={{ background: '#fff1f1', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#dc2626', fontSize: 14, display: 'flex', alignItems: 'center' }}>
                <span className="material-icons" style={{ fontSize: 20, marginRight: 8 }}>error_outline</span> {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input type="text" placeholder="e.g., Priya Sharma" value={form.name} onChange={e => set('name', e.target.value)} style={errors.name ? { borderColor: '#ef4444' } : {}} />
                {errors.name && <p className="error-text">⚠ {errors.name}</p>}
              </div>
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input type="email" placeholder="priya@example.com" value={form.email} onChange={e => set('email', e.target.value)} style={errors.email ? { borderColor: '#ef4444' } : {}} />
                {errors.email && <p className="error-text">⚠ {errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Cover Letter <span className="required">*</span></label>
                <textarea
                  rows={5}
                  placeholder="Tell us why you're the right fit for this role. Share relevant experience, achievements, and what excites you about BASK."
                  value={form.coverLetter}
                  onChange={e => set('coverLetter', e.target.value)}
                  style={errors.coverLetter ? { borderColor: '#ef4444' } : {}}
                />
                {errors.coverLetter && <p className="error-text">⚠ {errors.coverLetter}</p>}
                <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>{form.coverLetter.length} characters (min. 50)</p>
              </div>
              <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Careers() {
  useSEO({
    title: 'Careers at BASK — Join Bangalore\'s Top Growth Marketing Agency',
    description: 'Join BASK Growth Agency in Bengaluru. Open roles in performance marketing, SEO, paid media, data analytics, and creative strategy. Remote-friendly positions.',
    path: '/careers',
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getCareers().then(setJobs).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ maxWidth: 640, marginBottom: 64 }}>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)', marginBottom: 8, display: 'block' }}>Join the Team</span>
        <h1 style={{ marginBottom: 16 }}>Careers at BASK</h1>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.8 }}>
          We're a team of growth obsessives who move fast, think strategically, and deliver measurable results. If that sounds like you — we'd love to talk.
        </p>
      </div>

      {/* Values */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 64 }}>
        {[
          { icon: 'rocket_launch', title: 'Move Fast', desc: 'Bias for action over perfection' },
          { icon: 'bar_chart', title: 'Data First', desc: 'Every decision backed by metrics' },
          { icon: 'public', title: 'Remote Friendly', desc: 'Work from anywhere, anytime' },
          { icon: 'trending_up', title: 'Real Impact', desc: 'Measurable results, not vanity work' },
        ].map(v => (
          <div key={v.title} className="card" style={{ textAlign: 'center' }}>
            <span className="material-icons" style={{ fontSize: 36, marginBottom: 16, color: '#09090b' }}>{v.icon}</span>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>{v.title}</p>
            <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <h2 style={{ marginBottom: 32 }}>Open Positions</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>Loading roles…</div>
      ) : jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <span className="material-icons" style={{ fontSize: 48, color: 'var(--gray-300)', marginBottom: 16 }}>search_off</span>
          <h3 style={{ marginBottom: 8 }}>No open roles right now</h3>
          <p style={{ fontSize: 14, color: 'var(--gray-400)' }}>We're always interested in exceptional talent. Send your CV to <a href="mailto:careers@baskagency.com">careers@baskagency.com</a></p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {jobs.map(job => (
            <div key={job.id} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: 4 }}>{job.department}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: 4 }}>{job.type}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: 4 }}>{job.location}</span>
                </div>
                <h3 style={{ marginBottom: 8, fontSize: '1.15rem' }}>{job.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: job.requirements?.length ? 12 : 0 }}>{job.description}</p>
                {job.requirements?.length > 0 && (
                  <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.8 }}>
                    {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
              </div>
              <button className="btn btn--primary" onClick={() => setSelected(job)} style={{ whiteSpace: 'nowrap' }}>Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {selected && <ApplyForm job={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
