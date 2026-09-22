import { useState, useEffect } from 'react';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

export default function CaseStudies() {
  const [cases, setCases] = useState([]);

  useSEO({
    title: 'Work — Bask Creative',
    description: 'Recent obsessions. View the case studies, branding campaigns, and performance marketing executions by Bask.',
    path: '/case-studies',
  });

  useEffect(() => {
    // For pure front-end aesthetic we will map the static values if API is empty
    api.getCaseStudies().then(data => {
      setCases(data.length ? data : [
        { id: '1', title: 'Puravankara', client: 'Puravankara', industry: 'Real Estate', image: '1564013799-91ece03e4bbc', metric: '11 works' },
        { id: '2', title: 'Salvadores', client: 'Salvadores', industry: 'F&B / Restaurant', image: '1517248135467-4c7edcad34c4', metric: '3 works' },
        { id: '3', title: 'The Presidential Tower', client: 'The Presidential Tower', industry: 'Real Estate', image: '1600585154340-be6161a56a0c', metric: '4 works' },
      ]);
    }).catch(() => {});
  }, []);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Work</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 900 }}>
          Recent obsessions.
        </h1>
      </div>

      <div className="container pb-xl">
        <div className="bask-work-list">
          {cases.map((w, idx) => (
            <div key={w.id} className="bask-work-item">
              <div className="bask-work-meta">
                <span className="bask-work-id">0{idx + 1}</span>
                <div>
                  <h3 className="bask-work-title">{w.client}</h3>
                  <p className="bask-text-small text-muted">{w.industry} · {w.metric || 'Scale phase'}</p>
                </div>
              </div>
              <div className="bask-work-visual img-shimmer-wrapper">
                <img src={`https://images.unsplash.com/photo-${w.image}?auto=format&fit=crop&w=1400&q=80`} alt={w.client} className="img-animated-card" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
