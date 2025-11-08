export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version?: number;
};

const STORAGE_KEY = 'cookieConsent';

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (typeof parsed?.necessary === 'boolean') return parsed;
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore quota errors
  }
}

export function dispatchConsent(consent: Consent) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookie:consent', { detail: consent }));
  }
}