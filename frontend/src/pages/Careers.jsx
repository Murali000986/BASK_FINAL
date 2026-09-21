import { useEffect, useState } from 'react';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

export default function Careers() {
  const [positions, setPositions] = useState([]);

  useSEO({
    title: 'Careers — Join Bask',
    description: 'We are a multidisciplinary studio. We need talent who refuses to blend in. View open roles at our Bangalore office.',
    path: '/careers',
  });

  useEffect(() => {
    api.getCareers().then(setPositions).catch(() => {});
  }, []);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Careers</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 1000 }}>
          Join the studio.
        </h1>
        <p className="bask-hero-paragraph animate-fade-up delay-200 mt-24" style={{ marginTop: 24, maxWidth: 800 }}>
          We don't care about your corporate pedigree. We care about your craft, your curiosity, and your ability to execute. Open roles are based in our Bangalore HQ.
        </p>
      </div>

      <div className="container pb-xl">
        <h2 className="bask-headline-large mb-32" style={{ borderBottom: '2px solid var(--black)', paddingBottom: 24 }}>Open Roles</h2>
        
        {positions.length === 0 ? (
          <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)' }}>We are currently completely staffed. However, we are always on the lookout for exceptional talent. If you think you belong here, send your portfolio to <a href="mailto:careers@bask.studio" className="bask-link-underline">careers@bask.studio</a>.</p>
        ) : (
          <div className="bask-careers-list">
            {positions.map(p => (
              <div key={p.id} className="bask-career-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr 150px', gap: 24, padding: '32px 0', borderBottom: '1px solid var(--gray-200)', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{p.title}</h3>
                  <p className="bask-text-small text-muted">{p.type} · Bangalore</p>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{p.description}</p>
                <div style={{ textAlign: 'right' }}>
                  <a href={`mailto:careers@bask.studio?subject=${encodeURIComponent(p.title + ' Application')}`} className="bask-link-underline">Apply Now</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container pb-xl">
         <img 
          src="https://images.unsplash.com/photo-1600552766699-b1ffdd3496bc?auto=format&fit=crop&w=1400&q=80" 
          alt="Bask Studio Space" 
          style={{ width: '100%', height: '600px', objectFit: 'cover' }} 
        />
      </div>
    </div>
  );
}
