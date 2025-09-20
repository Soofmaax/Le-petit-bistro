import React from 'react';
import Seo from '../SEO';
import { useTranslation } from 'react-i18next';

const Terms: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const isEN = lang === 'en';

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <Seo
        title={`Le Petit Coin — ${isEN ? 'Terms of Use' : "Conditions d'utilisation"}`}
        description={
          isEN
            ? 'Terms of Use of Le Petit Coin website.'
            : "Conditions d'utilisation du site Le Petit Coin."
        }
        path="/terms"
      />
      <h1 className="text-3xl font-bold text-[#8B4513] font-display mb-4">
        {isEN ? 'Terms of Use' : "Conditions d'utilisation"}
      </h1>
      <div className="prose prose-slate max-w-none">
        {isEN ? (
          <>
            <h2>Acceptance</h2>
            <p>By browsing this website, you agree to these terms and conditions.</p>
            <h2>Use of the site</h2>
            <p>Do not attempt to disrupt the site or access data unlawfully.</p>
            <h2>Content</h2>
            <p>Information is provided for guidance only and may be updated without notice.</p>
            <h2>Links</h2>
            <p>We are not responsible for external websites linked from this site.</p>
            <h2>Applicable law</h2>
            <p>These terms are governed by French law.</p>
          </>
        ) : (
          <>
            <h2>Acceptation</h2>
            <p>En naviguant sur ce site, vous acceptez les présentes conditions.</p>
            <h2>Utilisation du site</h2>
            <p>Il est interdit de perturber le site ou d’accéder illicitement aux données.</p>
            <h2>Contenus</h2>
            <p>Les informations sont fournies à titre indicatif et peuvent être modifiées sans préavis.</p>
            <h2>Liens</h2>
            <p>Nous ne sommes pas responsables des sites externes accessibles via des liens.</p>
            <h2>Loi applicable</h2>
            <p>Les présentes conditions sont régies par le droit français.</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Terms;