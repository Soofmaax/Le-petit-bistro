import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  jsonLd?: object | object[];
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  twitterSite?: string; // optional @handle
};

const hreflangMap: Record<string, { fr: string; en: string }> = {
  '/': { fr: '/', en: '/' },
  '/menu': { fr: '/menu', en: '/menu' },
  '/reservation': { fr: '/reservation', en: '/reservation' },
  '/contact': { fr: '/contact', en: '/contact' },
  '/a-propos': { fr: '/a-propos', en: '/about' },
  '/about': { fr: '/a-propos', en: '/about' },
  '/legal': { fr: '/legal', en: '/legal' },
  '/privacy': { fr: '/privacy', en: '/privacy' },
  '/terms': { fr: '/terms', en: '/terms' },
  '/cookies': { fr: '/cookies', en: '/cookies' }
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  ogImage,
  jsonLd,
  keywords = [],
  noIndex = false,
  noFollow = false,
  canonicalUrl,
  twitterSite
}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lang = useMemo(() => (i18n.language || 'fr').split('-')[0], [i18n.language]);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const currentPath = path ?? location.pathname;

  const defaults = useMemo(
    () => ({
      siteName: 'Le Petit Coin',
      defaultTitle: `Le Petit Coin — ${lang === 'en' ? 'Neighborhood bistro' : 'Bistro de quartier'}`,
      defaultDescription:
        lang === 'en'
          ? 'Traditional French cuisine in a warm, authentic neighborhood bistro in Lyon.'
          : 'Cuisine française traditionnelle dans un bistro de quartier chaleureux et authentique à Lyon.'
    }),
    [lang]
  );

  const final = useMemo(() => {
    const t = title ?? defaults.defaultTitle;
    const d = description ?? defaults.defaultDescription;
    const urlPath = currentPath;
    const url = `${origin}${urlPath}`;
    const canonical = canonicalUrl ?? url;
    const ogUrl = ogImage ? `${origin}${ogImage}` : undefined;
    return { t, d, url, canonical, ogUrl, urlPath };
  }, [title, description, currentPath, origin, canonicalUrl, ogImage, defaults]);

  useEffect(() => {
    // Title
    document.title = final.t;

    // Meta name helper
    const setMeta = (name: string, content: string) => {
      let m = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', name);
        document.head.appendChild(m);
      }
      m.setAttribute('content', content);
    };

    // Meta property helper
    const setProp = (property: string, content: string) => {
      let m = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('property', property);
        document.head.appendChild(m);
      }
      m.setAttribute('content', content);
    };

    // Link rel helper
    const setLink = (rel: string, href: string, extra?: Record<string, string>) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      if (extra) {
        Object.entries(extra).forEach(([k, v]) => link!.setAttribute(k, v));
      }
    };

    // Base metas
    setMeta('description', final.d);
    if (keywords.length) setMeta('keywords', keywords.join(', '));

    // Robots
    const robots: string[] = [];
    if (noIndex) robots.push('noindex'); else robots.push('index');
    if (noFollow) robots.push('nofollow'); else robots.push('follow');
    setMeta('robots', robots.join(', '));

    // Canonical
    setLink('canonical', final.canonical);

    // Hreflang cleanup
    Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).forEach((el) => el.remove());

    // Hreflang mapping
    const map = hreflangMap[final.urlPath] ?? { fr: final.urlPath, en: final.urlPath };
    const frHref = `${origin}${map.fr}`;
    const enHref = `${origin}${map.en}`;
    const addAlt = (hreflang: string, href: string) => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'alternate');
      l.setAttribute('hreflang', hreflang);
      l.setAttribute('href', href);
      document.head.appendChild(l);
    };
    addAlt('fr', frHref);
    addAlt('en', enHref);

    // x-default cleanup then add
    Array.from(document.querySelectorAll('link[rel="alternate"][hreflang="x-default"]')).forEach((el) => el.remove());
    addAlt('x-default', origin);

    // Open Graph
    setProp('og:site_name', 'Le Petit Coin');
    setProp('og:title', final.t);
    setProp('og:description', final.d);
    setProp('og:type', 'website');
    setProp('og:url', final.url);
    setProp('og:locale', lang === 'en' ? 'en_US' : 'fr_FR');
    if (final.ogUrl) {
      setProp('og:image', final.ogUrl);
      // Standard OG dimensions
      setProp('og:image:width', '1200');
      setProp('og:image:height', '630');
      setProp('og:image:alt', final.t);
    }

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', final.t);
    setMeta('twitter:description', final.d);
    if (twitterSite) setMeta('twitter:site', twitterSite);
    if (final.ogUrl) {
      setMeta('twitter:image', final.ogUrl);
      setMeta('twitter:image:alt', final.t);
    }

    // JSON-LD cleanup and add
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
  }, [final, lang, keywords, noIndex, noFollow, jsonLd, origin, twitterSite]);

  return null;
};

// Build JSON-LD for the home page (Restaurant + Website)
export const buildHomeJsonLd = (origin: string, lang: string = 'fr') => {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${origin}#restaurant`,
    name: 'Le Petit Coin',
    description:
      lang === 'en'
        ? 'Traditional French cuisine in a warm, authentic neighborhood bistro in Lyon.'
        : 'Cuisine française traditionnelle dans un bistro de quartier chaleureux et authentique à Lyon.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Rue des Fantasques',
      addressLocality: 'Lyon',
      postalCode: '69001',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR'
    },
    telephone: '+33 4 78 12 34 56',
    servesCuisine: ['French'],
    priceRange: '€€',
    url: origin,
    image: [`${origin}/images/hero_1600.jpg`],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:30',
        closes: '22:30'
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:30', closes: '15:00' }
    ],
    acceptsReservations: true,
    hasMenu: `${origin}/menu`
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}#website`,
    name: 'Le Petit Coin',
    url: origin,
    inLanguage: [lang]
  };

  return [restaurant, website];
};

// Build dynamic OG image URL using Vercel og-image (simple template)
export const buildOgImage = (title: string) => {
  const encoded = encodeURIComponent(title);
  // Public, widely used OG generator
  return `https://og-image.vercel.app/${encoded}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg`;
};

export default Seo;