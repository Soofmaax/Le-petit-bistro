import { render } from '@testing-library/react';
import Analytics from '../components/Analytics';

function setConsent(analytics: boolean) {
  const consent = {
    necessary: true,
    analytics,
    marketing: false,
    timestamp: new Date().toISOString(),
    version: 1
  };
  localStorage.setItem('cookieConsent', JSON.stringify(consent));
}

describe('Analytics loader (Plausible)', () => {
  beforeEach(() => {
    // cleanup any existing script
    const el = document.getElementById('plausible-analytics');
    if (el && el.parentNode) el.parentNode.removeChild(el);
    localStorage.removeItem('cookieConsent');
  });

  test('does not inject script when no consent', () => {
    render(<Analytics />);
    const injected = document.querySelector('script#plausible-analytics');
    expect(injected).toBeNull();
  });

  test('injects script when analytics consent is true', () => {
    setConsent(true);
    render(<Analytics />);
    const injected = document.querySelector('script#plausible-analytics') as HTMLScriptElement | null;
    expect(injected).not.toBeNull();
    if (injected) {
      expect(injected.src).toContain('/js/script.js');
      expect(injected.getAttribute('data-api')).toBe('/api/event');
      expect(injected.getAttribute('data-domain')).toBe(window.location.hostname);
    }
  });

  test('removes script when consent is changed to false', () => {
    setConsent(true);
    render(<Analytics />);
    expect(document.querySelector('script#plausible-analytics')).not.toBeNull();

    // simulate user changing their preference
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: 1
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('cookie:consent', { detail: consent }));

    const injected = document.querySelector('script#plausible-analytics');
    expect(injected).toBeNull();
  });
});