import React from 'react';
import Seo from '../SEO';
import { useTranslation } from 'react-i18next';

const Cookies: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const isEN = lang === 'en';

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <Seo
        title={`Le Petit Coin — ${isEN ? 'Cookie Policy' : 'Politique de cookies'}`}
        description={
          isEN
            ? 'Information about cookies used (if any) on this website.'
            : 'Informations sur les cookies utilisés (le cas échéant) sur ce site.'
        }
        path="/cookies"
      />
      <h1 className="text-3xl font-bold text-[#8B4513] font-['Pacifico'] mb-4">
        {isEN ? 'Cookie Policy' : 'Politique de cookies'}
      </h1>
      <div className="prose prose-slate max-w-none">
        {isEN ? (
          <>
            <p>
              We currently do not use analytics or marketing cookies. Only strictly necessary cookies may be used for basic site operation.
            </p>
            <p>
              If analytics or marketing cookies are added in the future, this page will be updated and a consent banner will be shown where required.
            </p>
          </>
        ) : (
          <>
            <p>
              Nous n’utilisons actuellement pas de cookies d’analytics ou marketing. Seuls des cookies strictement nécessaires peuvent être utilisés pour le fonctionnement de base du site.
            </p>
            <p>
              Si des cookies d’analytics/marketing sont ajoutés ultérieurement, cette page sera mise à jour et une bannière de consentement sera affichée si nécessaire.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Cookies;