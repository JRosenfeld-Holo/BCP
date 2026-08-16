import { useEffect } from 'react';

export const SITE_URL = 'https://briancliette.com';
export const SITE_NAME = 'Brian Cliette';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type Meta = {
  title: string;
  description: string;
  /** Path only, e.g. "/services/ai-automation". Canonical is built from SITE_URL. */
  path: string;
};

function setTag(selector: string, attr: 'content' | 'href', value: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Keeps title, description, canonical and the OG/Twitter pair in step with the
 * current route. The app is a client-rendered SPA, so index.html ships the
 * homepage's tags and this rewrites them on navigation — which is what
 * JS-executing crawlers and link unfurlers read.
 */
export function useMeta({ title, description, path }: Meta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    setTag('meta[name="description"]', 'content', description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    });

    setTag('link[rel="canonical"]', 'href', url, () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    });

    const properties: [string, string][] = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', url],
    ];
    for (const [property, content] of properties) {
      setTag(`meta[property="${property}"]`, 'content', content, () => {
        const el = document.createElement('meta');
        el.setAttribute('property', property);
        return el;
      });
    }

    const names: [string, string][] = [
      ['twitter:title', title],
      ['twitter:description', description],
    ];
    for (const [name, content] of names) {
      setTag(`meta[name="${name}"]`, 'content', content, () => {
        const el = document.createElement('meta');
        el.setAttribute('name', name);
        return el;
      });
    }
  }, [title, description, path]);
}
