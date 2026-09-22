import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useSEO } from '../hooks/useSEO';

const STATIC_POSTS = [
  {
    id: 's1',
    slug: 'why-brand-strategy-comes-before-design',
    title: 'Why Brand Strategy Always Comes Before Design',
    category: 'Brand Strategy',
    date: '2026-09-10',
    excerpt: 'Most startups rush to logos. The ones that win start with positioning. Here\'s the framework we use before a single pixel is placed.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's2',
    slug: 'ooh-advertising-still-works-in-2026',
    title: 'OOH Advertising is Not Dead — It\'s Just Getting Smarter',
    category: 'Advertising',
    date: '2026-09-01',
    excerpt: 'Everyone is online. That\'s exactly why a bold billboard in Bangalore cuts through. Our take on why Out-of-Home is making a premium comeback.',
    image: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's3',
    slug: 'how-we-approach-real-estate-advertising',
    title: 'How We Approach Real Estate Advertising Differently',
    category: 'Case Study',
    date: '2026-08-20',
    excerpt: 'Luxury real estate ads are drowning in sameness. Towers that "touch the sky." Views that "breathe." We decided to make Puravankara feel human instead.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's4',
    slug: 'the-bangalore-agency-advantage',
    title: 'The Bangalore Agency Advantage: Why We Build Differently Here',
    category: 'Culture',
    date: '2026-08-05',
    excerpt: 'Bangalore sits at the intersection of tech culture and creative ambition. We explain why this city breeds agencies that think differently from Mumbai or Delhi.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's5',
    slug: 'digital-vs-traditional-the-false-war',
    title: 'Digital vs. Traditional: The False War Killing Your Brand',
    category: 'Digital',
    date: '2026-07-18',
    excerpt: 'Agencies that preach "digital-first" and agencies that live on print are both wrong. The brands that win use both intelligently. Here\'s how.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's6',
    slug: 'what-makes-a-good-brand-film',
    title: 'What Actually Makes a Brand Film Worth Watching',
    category: 'Film & Production',
    date: '2026-07-02',
    excerpt: 'Most brand films are skipped in three seconds. The ones that stick share a common DNA: they don\'t sell, they show. A production director\'s breakdown.',
    image: 'https://images.unsplash.com/photo-1616469829167-0bd76a80c913?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(STATIC_POSTS);

  useSEO({
    title: 'Journal — Bask Creative',
    description: 'Thoughts, essays, and methodologies on brand building and digital execution from the Bask team.',
    path: '/blog',
  });

  useEffect(() => {
    api.getBlogs().then(live => {
      if (live && live.length > 0) setPosts([...live, ...STATIC_POSTS]);
    }).catch(() => {});
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
          <div className="bask-blog-grid">
            {posts.map(p => (
              <div key={p.id} className="bask-blog-card">
                {p.image && (
                  <div className="bask-blog-img-wrap img-shimmer-wrapper">
                    <img src={p.image} alt={p.title} className="img-animated-card" />
                  </div>
                )}
                <p className="bask-text-small text-muted mb-8" style={{ marginTop: 20 }}>
                  {p.category} · {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>{p.title}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 20 }}>{p.excerpt || p.summary}</p>
                <Link to={`/blog/${p.slug}`} className="bask-link-underline">Read essay →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
