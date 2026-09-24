import { useState } from 'react';
import { supabase } from '../supabaseClient';

const SERVICES = [
  { id: 'web', title: 'Web Development', icon: 'language' },
  { id: 'marketing', title: 'Digital Marketing', icon: 'trending_up' },
  { id: 'seo', title: 'SEO', icon: 'search' },
  { id: 'uiux', title: 'UI / UX Design', icon: 'brush' },
  { id: 'social', title: 'Social Media', icon: 'people' },
  { id: 'app', title: 'Mobile Apps', icon: 'phone_iphone' }
];

const BUDGETS = [
  'Less than ₹50k',
  '₹50k - ₹1 Lakh',
  '₹1 Lakh - ₹5 Lakhs',
  '₹5 Lakhs+'
];

const SOURCES = [
  'Google Search',
  'LinkedIn',
  'Instagram / Meta Ads',
  'Referral',
  'Other'
];

export default function Onboarding({ isModal, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    budget: '',
    source: '',
    email: '',
    phone: '',
    contact: '' // name
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const updateData = (key, value) => {
    setFormData(d => ({ ...d, [key]: value }));
    setErrorMsg('');
  };

  const submitBrief = async () => {
    if (!formData.email) {
      setErrorMsg('Please provide your email address.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    const { error } = await supabase.from('proposals').insert({
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      source: formData.source,
    });

    setIsSubmitting(false);
    if (error) setErrorMsg('Something went wrong. Please try again.');
    else setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ minHeight: isModal ? 'auto' : '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isModal ? 'transparent' : '#FAFAFA' }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: '60px 40px', borderRadius: 24, boxShadow: isModal ? 'none' : '0 12px 40px rgba(0,0,0,0.06)', maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, background: '#16a34a', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <span className="material-icons" style={{ fontSize: 40 }}>check</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Brief Received!</h2>
          <p style={{ color: '#71717a', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>Thank you for reaching out to BASK. Our team will review your requirements and get back to you shortly.</p>
          {isModal ? (
            <button onClick={onClose} style={{ padding: '14px 28px', border: 'none', cursor: 'pointer', background: '#09090b', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 15 }}>Close</button>
          ) : (
            <a href="/" style={{ padding: '14px 28px', background: '#09090b', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15 }}>Return Home</a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: isModal ? 'auto' : 'calc(100vh - 64px)', background: isModal ? 'transparent' : '#FAFAFA', display: 'flex', alignItems: 'center', padding: isModal ? 0 : '40px 24px', width: '100%' }}>
      <div style={{ maxWidth: 700, width: '100%', margin: '0 auto', background: '#fff', borderRadius: 32, boxShadow: isModal ? 'none' : '0 20px 60px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        
        {/* Header / Progress */}
        <div style={{ padding: '32px 48px', borderBottom: '1px solid #f4f4f5', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
             <button onClick={prevStep} style={{ visibility: step > 1 ? 'visible' : 'hidden', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#71717a', cursor: 'pointer' }}>
               <span className="material-icons" style={{ fontSize: 18 }}>arrow_back</span> Back
             </button>
             <span style={{ fontSize: 12, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {step} of 4</span>
             {isModal ? (
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: '#a1a1aa' }}>✕</button> 
             ) : (
                <button style={{ visibility: 'hidden', background: 'none', border: 'none' }}>Dummy</button>
             )}
          </div>
          
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? '#09090b' : '#e4e4e7', transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '48px', minHeight: 400 }}>
          
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.03em' }}>What type of service are you looking for?</h2>
              <p style={{ color: '#71717a', marginBottom: 32, fontSize: 16 }}>Select the core area you want us to focus on.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {SERVICES.map(srv => {
                  const active = formData.service === srv.title;
                  return (
                    <button key={srv.id} onClick={() => { updateData('service', srv.title); setTimeout(nextStep, 300); }}
                      style={{ 
                        padding: 24, textAlign: 'left', borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s',
                        background: active ? '#fff' : '#fafafa', border: `2px solid ${active ? '#09090b' : '#e4e4e7'}`,
                        boxShadow: active ? '0 10px 30px rgba(0,0,0,0.08)' : 'none'
                      }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: active ? '#09090b' : '#fff', color: active ? '#fff' : '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: active ? 'none' : '1px solid #e4e4e7' }}>
                        <span className="material-icons">{srv.icon}</span>
                      </div>
                      <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: '#09090b' }}>{srv.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.03em' }}>What is your estimated budget?</h2>
              <p style={{ color: '#71717a', marginBottom: 32, fontSize: 16 }}>This helps us understand how to scope our recommendations.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BUDGETS.map(val => {
                  const active = formData.budget === val;
                  return (
                    <button key={val} onClick={() => { updateData('budget', val); setTimeout(nextStep, 300); }}
                      style={{ 
                        padding: '20px 24px', textAlign: 'left', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: active ? '#09090b' : '#fafafa', color: active ? '#fff' : '#09090b', border: `1px solid ${active ? '#09090b' : '#e4e4e7'}`
                      }}>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{val}</span>
                      {active && <span className="material-icons" style={{ color: '#fff' }}>check_circle</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.03em' }}>Where did you hear about us?</h2>
              <p style={{ color: '#71717a', marginBottom: 32, fontSize: 16 }}>We love knowing how our clients find their way to BASK.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SOURCES.map(val => {
                  const active = formData.source === val;
                  return (
                    <button key={val} onClick={() => { updateData('source', val); setTimeout(nextStep, 300); }}
                      style={{ 
                        padding: '20px 24px', textAlign: 'left', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: active ? '#FFE600' : '#fafafa', color: '#09090b', border: `1px solid ${active ? '#FFE600' : '#e4e4e7'}`
                      }}>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{val}</span>
                      {active && <span className="material-icons" style={{ color: '#09090b' }}>check_circle</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.03em' }}>Last step. How can we reach you?</h2>
              <p style={{ color: '#71717a', marginBottom: 32, fontSize: 16 }}>Drop your best contact details below to finalize the brief.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#09090b' }}>Name / Contact Person</label>
                  <input type="text" value={formData.contact} onChange={e => updateData('contact', e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, outline: 'none' }} placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#09090b' }}>Email Address *</label>
                  <input type="email" value={formData.email} onChange={e => updateData('email', e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, outline: 'none' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#09090b' }}>Mobile Number</label>
                  <input type="tel" value={formData.phone} onChange={e => updateData('phone', e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, fontSize: 15, outline: 'none' }} placeholder="+91 XXXXX XXXXX" />
                </div>
                {errorMsg && <p style={{ color: '#dc2626', fontSize: 14, fontWeight: 500 }}>⚠ {errorMsg}</p>}
                
                <button onClick={submitBrief} disabled={isSubmitting}
                  style={{ marginTop: 12, width: '100%', padding: '16px', background: '#FFE600', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit Brief'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
