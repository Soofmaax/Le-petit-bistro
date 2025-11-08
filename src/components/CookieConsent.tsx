import React from 'react';
import { useTranslation } from 'react-i18next';

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version?: number;
};

const STORAGE_KEY = 'cookieConsent';

function readConsent(): Consent | null {
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

function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore quota errors
  }
}

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  // Ne pas afficher la bannière en environnement test
  const isTest = typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE === 'test';

  const [open, setOpen] = React.useState(false);
  const [showPrefs, setShowPrefs] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    if (isTest) return;
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
      setShowPrefs(false);
      setAnalytics(false);
      setMarketing(false);
    }
    const handler = () => {
      setOpen(true);
      setShowPrefs(true);
      const current = readConsent();
      setAnalytics(!!current?.analytics);
      setMarketing(!!current?.marketing);
    };
    window.addEventListener('cookie:open', handler as EventListener);
    return () => {
      window.removeEventListener('cookie:open', handler as EventListener);
    };
  }, [isTest]);

  if (isTest) return null;
  if (!open) return null;

  const acceptAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: 1
    };
    writeConsent(consent);
    try {
      window.dispatchEvent(new CustomEvent('cookie:consent', { detail: consent }));
    } catch {}
    setOpen(false);
  };

  const rejectAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: 1
    };
    writeConsent(consent);
    try {
      window.dispatchEvent(new CustomEvent('cookie:consent', { detail: consent }));
    } catch {}
    setOpen(false);
  };

  const savePrefs = () => {
    const consent: Consent = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: 1
    };
    writeConsent(consent);
    try {
      window.dispatchEvent(new CustomEvent('cookie:consent', { detail: consent }));
    } catch {}
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-modal="true"
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 border border-[#D2691E]/30 rounded-xl shadow-lg p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <h2 id="cookie-title" className="text-lg font-semibold text-[#8B4513] dark:text-[#F5E6D3] mb-1">
              {t('cookie.title')}
            </h2>
            <p className="text-sm text-gray-700 dark:text-slate-300">
              {t('cookie.text')}
            </p>

            {showPrefs && (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-lg bg-[#F5E6D3]/50 dark:bg-slate-700/40">
                  <p className="text-sm font-semibold text-[#8B4513] dark:text-[#F5E6D3]">
                    {t('cookie.necessary_label')}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-slate-300">
                    {t('cookie.necessary_desc')}
                  </p>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-[#D2691E]/20">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#8B4513] dark:text-[#F5E6D3]">
                      {t('cookie.analytics_label')}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-slate-300">
                      {t('cookie.analytics_desc')}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-[#D2691E]/20">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#8B4513] dark:text-[#F5E6D3]">
                      {t('cookie.marketing_label')}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-slate-300">
                      {t('cookie.marketing_desc')}
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="sm:ml-4 flex sm:flex-col gap-2">
            {!showPrefs && (
              <button
                onClick={() => setShowPrefs(true)}
                className="px-3 py-2 rounded-md border border-[#D2691E]/30 text-[#8B4513] dark:text-[#F5E6D3] hover:bg-[#F5E6D3] dark:hover:bg-slate-700 text-sm"
              >
                {t('cookie.preferences')}
              </button>
            )}
            {showPrefs ? (
              <button
                onClick={savePrefs}
                className="px-4 py-2 rounded-md bg-[#D2691E] text-white hover:bg-[#B8551A] text-sm font-semibold"
              >
                {t('cookie.save')}
              </button>
            ) : (
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-md bg-[#D2691E] text-white hover:bg-[#B8551A] text-sm font-semibold"
              >
                {t('cookie.accept_all')}
              </button>
            )}
            <button
              onClick={rejectAll}
              className="px-3 py-2 rounded-md border border-[#D2691E]/30 text-[#8B4513] dark:text-[#F5E6D3] hover:bg-[#F5E6D3] dark:hover:bg-slate-700 text-sm"
            >
              {t('cookie.reject_all')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;