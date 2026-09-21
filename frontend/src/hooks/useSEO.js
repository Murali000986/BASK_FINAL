import { useEffect } from 'react';

const BASE_URL = 'https://www.baskgrowth.xyz';

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', `${BASE_URL}${path}`);
}

function injectSchema(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeSchema(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * useSEO — sets page title, description, canonical, OG/Twitter, and optional JSON-LD.
 * @param {{ title: string, description: string, path?: string, image?: string, schema?: object }} opts
 */
export function useSEO({ title, description, path = '/', image, schema }) {
  useEffect(() => {
    const fullTitle = `${title} | BASK Growth Agency Bangalore`;
    document.title = fullTitle;

    const ogImage = image || `${BASE_URL}/og-image.png`;

    setMeta('description', description);
    setCanonical(path);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', `${BASE_URL}${path}`, 'property');
    setMeta('og:image', ogImage, 'property');

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    if (schema) {
      injectSchema('page-schema', schema);
    } else {
      removeSchema('page-schema');
    }

    return () => removeSchema('page-schema');
  }, [title, description, path, image, schema]);
}
