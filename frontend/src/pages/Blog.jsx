import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogs().then(setPosts).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)' }}>Insights &amp; Strategy</span>
        <h1 style={{ marginTop: 8, marginBottom: 12 }}>BASK Blog</h1>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', maxWidth: 520 }}>Tactical growth content — no fluff, real frameworks from client engagements.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>Loading…</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray-400)' }}>No posts yet. Check back soon.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%', transition: 'transform .2s, box-shadow .2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                {post.coverImage && (
                  <div style={{ height: 180, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 20 }}>
                    <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--gray-400)', marginBottom: 8, display: 'block' }}>{post.category}</span>
                <h3 style={{ marginBottom: 10, color: 'var(--black)', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--gray-400)' }}>
                  <span>{post.author}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
