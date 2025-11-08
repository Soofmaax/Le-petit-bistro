import { vi } from 'vitest';
import { readConsent, writeConsent, dispatchConsent } from '../components/CookieConsent';

describe('CookieConsent utils', () => {
  test('writeConsent and readConsent round-trip', () => {
    const c = {
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: 1
    };
    writeConsent(c);
    const r = readConsent();
    expect(r?.necessary).toBe(true);
    expect(r?.analytics).toBe(true);
    expect(r?.marketing).toBe(false);
  });

  test('dispatchConsent emits event', () => {
    const handler = vi.fn();
    window.addEventListener('cookie:consent', handler as EventListener);
    const c = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: 1
    };
    dispatchConsent(c);
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener('cookie:consent', handler as EventListener);
  });
});