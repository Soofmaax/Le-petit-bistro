import React from 'react';
import Seo from '../SEO';
import { useTranslation } from 'react-i18next';

const Legal: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const isEN = lang === 'en';

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <Seo
        title={`Le Petit Coin — ${isEN ? 'Legal notice' : 'Mentions légales'}`}
        description={
          isEN
            ? 'Legal notice for Le Petit Coin website.'
            : 'Mentions légales du site Le Petit Coin.'
        }
        path="/legal"
      />
      <h1 className="text-3xl font-bold text-[#8B4513] font-['Pacifico'] mb-4">
        {isEN ? 'Legal notice' : 'Mentions légales'}
      </h1>
      <div className="prose prose-slate max-w-none">
        {isEN ? (
          <>
            <h2>Publisher</h2>
            <p>
              Le Petit Coin — Neighborhood bistro in Lyon<br />
              12 Rue des Fantasques, 69001 Lyon, France<br />
              Email: contact@lepetitcoin-lyon.fr — Phone: +33 4 78 12 34 56
            </p>
            <h2>Publication Director</h2>
            <p>Soofmax (Portfolio website)</p>
            <h2>Hosting provider</h2>
            <p>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
              https://vercel.com — support@vercel.com
            </p>
            <h2>Intellectual property</h2>
            <p>
              All texts, images and content on this website are protected. Any reproduction requires prior authorization.
            </p>
            <h2>Liability</h2>
            <p>
              The publisher cannot be held liable for external links or third‑party content. Information is provided for illustrative purposes.
            </p>
          </>
        ) : (
          <>
            <h2>Éditeur</h2>
            <p>
              Le Petit Coin — Bistro de quartier à Lyon<br />
              12 Rue des Fantasques, 69001 Lyon, France<br />
              Email : contact@lepetitcoin-lyon.fr — Tél. : 04 78 12 34 56
            </p>
            <h2>Directeur de publication</h2>
            <p>Soofmax (site portfolio)</p>
            <h2>Hébergeur</h2>
            <p>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
              https://vercel.com — support@vercel.com
            </p>
            <h2>Propriété intellectuelle</h2>
            <p>
              Les textes, images et contenus de ce site sont protégés. Toute reproduction nécessite une autorisation préalable.
            </p>
            <h2>Responsabilité</h2>
            <p>
              L’éditeur ne saurait être tenu responsable des liens externes ou des contenus tiers. Les informations sont données à titre indicatif.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Legal;