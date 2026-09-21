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

/**
 * useSEO — sets page title, description, canonical, and OG/Twitter tags per page.
 * @param {{ title: string, description: string, path?: string, image?: string }} opts
 */
export function useSEO({ title, description, path = '/', image }) {
  useEffect(() => {
    const fullTitle = `${title} | BASK Growth Agency Bangalore`;
    document.title = fullTitle;

    const ogImage = image || `${BASE_URL}/og-image.png`;

    // Standard
    setMeta('description', description);
    setCanonical(path);

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', `${BASE_URL}${path}`, 'property');
    setMeta('og:image', ogImage, 'property');

    // Twitter
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
  }, [title, description, path, image]);
}
