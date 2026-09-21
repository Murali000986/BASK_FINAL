import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useSEO({
    title: 'Journal — Bask Creative',
    description: 'Thoughts, essays, and methodologies on brand building and digital execution from the Bask team.',
    path: '/blog',
  });

  useEffect(() => {
    api.getBlogs().then(setPosts).catch(() => {});
  }, []);

  return (
    <div className="bask-page">
      <div className="container pt-lg pb-lg">
        <p className="bask-text-small text-muted fw-600 mb-8 animate-fade-up">Journal</p>
        <h1 className="bask-hero-heading animate-fade-up delay-100" style={{ maxWidth: 1000 }}>
          Notes on execution.
        </h1>
      </div>

      <div className="container pb-xl">
        <div style={{ borderTop: '2px solid var(--black)', paddingTop: 16 }}>
          {posts.length === 0 ? (
            <p style={{ fontSize: '1.25rem', color: 'var(--gray-600)', marginTop: 24 }}>New essays coming soon.</p>
          ) : (
             <div className="bask-blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '64px', marginTop: 48 }}>
              {posts.map(p => (
                <div key={p.id}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', marginBottom: 24, background: 'var(--gray-100)' }} />}
                  <p className="bask-text-small text-muted mb-8">{p.category} · {new Date(p.date).toLocaleDateString()}</p>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>{p.title}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 24 }}>{p.summary || p.excerpt}</p>
                  <Link to={`/blog/${p.slug}`} className="bask-link-underline">Read essay</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
