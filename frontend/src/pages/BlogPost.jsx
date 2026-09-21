import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.getBlog(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useSEO({
    title: post ? post.title : 'Journal',
    description: post ? (post.excerpt || post.summary || post.title) : 'Thoughts and essays from Bask Creative.',
    path: `/blog/${slug}`,
    image: post?.coverImage || post?.image,
    schema: post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.summary || post.title,
      "image": post.coverImage || post.image,
      "author": {
        "@type": "Person",
        "name": post.author || "Bask Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bask Creative Agency",
        "logo": "https://www.baskgrowth.xyz/logo.png"
      },
      "datePublished": post.publishedAt || post.date,
      "mainEntityOfPage": `https://www.baskgrowth.xyz/blog/${slug}`
    } : null
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--gray-400)' }}>Loading…</div>;
  if (notFound) return (
    <div style={{ textAlign: 'center', padding: '120px 0' }}>
      <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
      <h2 style={{ marginBottom: 12 }}>Post not found</h2>
      <Link to="/blog" className="btn btn--outline">Back to Blog</Link>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 760 }}>
      <Link to="/blog" style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 32 }}>
        <span className="material-icons" style={{ fontSize: 16 }}>arrow_back</span> Back to Blog
      </Link>

      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gray-400)', marginBottom: 12, display: 'block' }}>{post.category}</span>
      <h1 style={{ marginBottom: 16, lineHeight: 1.3 }}>{post.title}</h1>
      <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--gray-400)', marginBottom: 32, flexWrap: 'wrap' }}>
        <span>By {post.author}</span>
        <span>·</span>
        <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>

      {post.coverImage && (
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 40, height: 340 }}>
          <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--gray-700)' }}>
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} style={{ marginTop: 36, marginBottom: 12 }}>{line.slice(3)}</h2>;
          if (line.startsWith('# ')) return <h1 key={i} style={{ marginTop: 40, marginBottom: 16 }}>{line.slice(2)}</h1>;
          if (line.startsWith('- ')) return <li key={i} style={{ marginBottom: 6, paddingLeft: 4 }}>{line.slice(2)}</li>;
          if (line.trim() === '') return <div key={i} style={{ height: 12 }} />;
          return <p key={i} style={{ marginBottom: 16 }}>{line}</p>;
        })}
      </div>
    </div>
  );
}
