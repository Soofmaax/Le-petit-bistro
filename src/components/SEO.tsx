import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: object | object[];
};

const Seo: React.FC<SeoProps> = ({ title, description, path, ogImage, jsonLd }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const url = `${origin}${path ?? location.pathname}`;

  useEffect(() => {
    const t = title ?? 'Le Petit Coin — ' + (lang === 'en' ? 'Neighborhood bistro' : 'Bistro de quartier');
    const d =
      description ??
      (lang === 'en'
        ? 'Traditional French cuisine in a warm, authentic neighborhood bistro in Lyon.'
        : 'Cuisine française traditionnelle dans un bistro de quartier chaleureux et authentique à Lyon.');

    document.title = t;

    const setMeta = (name: string, content: string) => {
      let m = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', name);
        document.head.appendChild(m);
      }
      m.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let m = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('property', property);
        document.head.appendChild(m);
      }
      m.setAttribute('content', content);
    };

    // Basic metas
    setMeta('description', d);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    // Hreflang alternates (simple: current path for both languages)
    const existingAlts = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'));
    existingAlts.forEach((el) => el.parentNode?.removeChild(el));
    const langs = ['fr', 'en'];
    langs.forEach((l) => {
      const alt = document.createElement('link');
      alt.setAttribute('rel', 'alternate');
      alt.setAttribute('hreflang', l);
      alt.setAttribute('href', url); // same path for both, given current routing
      document.head.appendChild(alt);
    });
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', origin);
    document.head.appendChild(xDefault);

    // Open Graph / Twitter (basic)
    setProperty('og:title', t);
    setProperty('og:description', d);
    setProperty('og:type', 'website');
    setProperty('og:url', url);
    if (ogImage) setProperty('og:image', `${origin}${ogImage}`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t);
    setMeta('twitter:description', d);
    if (ogImage) setMeta('twitter:image', `${origin}${ogImage}`);

    // JSON-LD
    // Remove previous JSON-LD
    Array.from(document.querySelectorAll('script[data-json-ld="true"]')).forEach((n) => n.remove());
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((obj) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-json-ld', 'true');
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
      });
    }

    // Cleanup when unmounting or changing route
    return () => {
      // keep canonical/meta; only JSON-LD cleanup happens on next run
    };
  }, [title, description, path, ogImage, jsonLd, url, lang]);

  return null;
};

export const buildHomeJsonLd = (origin: string) => {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Le Petit Coin',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Rue des Fantasques',
      addressLocality: 'Lyon',
      addressCountry: 'FR'
    },
    telephone: '+33 4 78 12 34 56',
    servesCuisine: ['French'],
    priceRange: '€€',
    url: origin,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:30', closes: '22:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:30', closes: '15:00' }
    ]
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Le Petit Coin',
    url: origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return [restaurant, website];
};

export default Seo;