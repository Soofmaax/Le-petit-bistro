import React from 'react';

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
  version?: number;
};

const STORAGE_KEY = 'cookieConsent';
const SCRIPT_ID = 'plausible-analytics';

/**
 * Load or unload Plausible Analytics based on cookie consent (analytics).
 * - Script is served from /js/script.js (proxied to plausible.io via Netlify _redirects)
 * - Events are sent to /api/event (also proxied)
 * - CSP remains strict: script-src 'self', connect-src 'self'
 */
const Analytics: React.FC = () => {
  const loadIfConsented = React.useCallback(() => {
    if (typeof document === 'undefined') return;

    let consent: Consent | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) consent = JSON.parse(raw) as Consent;
    } catch {
      /* ignore */
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (consent?.analytics) {
      // load (if not present)
      if (!existing) {
        const s = document.createElement('script');
        s.defer = true;
        s.id = SCRIPT_ID;
        s.src = '/js/script.js';
        s.setAttribute('data-api', '/api/event');

        // domain: use explicit env if provided, else window.location.hostname
        const envDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
        const domain = envDomain && envDomain.trim().length > 0
          ? envDomain
          : (typeof window !== 'undefined' ? window.location.hostname : 'example.com');
        s.setAttribute('data-domain', domain);

        document.head.appendChild(s);
      }
    } else {
      // unload if present
      if (existing?.parentNode) {
        existing.parentNode.removeChild(existing);
      }
    }
  }, []);

  React.useEffect(() => {
    loadIfConsented();

    const handler = () => loadIfConsented();
    window.addEventListener('cookie:consent', handler as EventListener);
    return () => {
      window.removeEventListener('cookie:consent', handler as EventListener);
    };
  }, [loadIfConsented]);

  return null;
};

export default Analytics;