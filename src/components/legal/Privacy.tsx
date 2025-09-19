import React from 'react';
import Seo from '../SEO';
import { useTranslation } from 'react-i18next';

const Privacy: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const isEN = lang === 'en';

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <Seo
        title={`Le Petit Coin — ${isEN ? 'Privacy Policy' : 'Politique de confidentialité'}`}
        description={
          isEN
            ? 'How we process and protect your personal data (reservations).'
            : 'Comment nous traitons et protégeons vos données personnelles (réservations).'
        }
        path="/privacy"
      />
      <h1 className="text-3xl font-bold text-[#8B4513] font-['Pacifico'] mb-4">
        {isEN ? 'Privacy Policy' : 'Politique de confidentialité'}
      </h1>
      <div className="prose prose-slate max-w-none">
        {isEN ? (
          <>
            <h2>Data controller</h2>
            <p>
              Le Petit Coin — 12 Rue des Fantasques, 69001 Lyon, France<br />
              Email: contact@lepetitcoin-lyon.fr
            </p>
            <h2>Data collected</h2>
            <p>
              When you submit a reservation: date, time, number of guests, name, email, phone, and your message.
            </p>
            <h2>Purposes and legal bases</h2>
            <ul>
              <li>Manage your reservation (contract performance)</li>
              <li>Contact you regarding your booking (legitimate interest)</li>
            </ul>
            <h2>Retention</h2>
            <p>Reservation data is kept for up to 12 months, then deleted or anonymized.</p>
            <h2>Recipients</h2>
            <p>Only the restaurant’s staff and the hosting provider may process data (for technical reasons).</p>
            <h2>Your rights (GDPR)</h2>
            <p>
              Access, rectification, deletion, restriction, and objection. To exercise your rights, contact: contact@lepetitcoin-lyon.fr
            </p>
            <h2>Cookies</h2>
            <p>
              We do not use tracking cookies at this time. If we add analytics or marketing cookies, we will update this policy and provide a consent banner where required.
            </p>
            <h2>Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your data.
            </p>
          </>
        ) : (
          <>
            <h2>Responsable de traitement</h2>
            <p>
              Le Petit Coin — 12 Rue des Fantasques, 69001 Lyon, France<br />
              Email : contact@lepetitcoin-lyon.fr
            </p>
            <h2>Données collectées</h2>
            <p>
              Lors d’une réservation : date, heure, nombre de personnes, nom, email, téléphone, message.
            </p>
            <h2>Finalités et bases légales</h2>
            <ul>
              <li>Gérer votre réservation (exécution du contrat)</li>
              <li>Vous contacter à propos de votre réservation (intérêt légitime)</li>
            </ul>
            <h2>Durées de conservation</h2>
            <p>Les données de réservation sont conservées jusqu’à 12 mois puis supprimées ou anonymisées.</p>
            <h2>Destinataires</h2>
            <p>Seul le personnel du restaurant et l’hébergeur peuvent traiter ces données (raisons techniques).</p>
            <h2>Vos droits (RGPD)</h2>
            <p>
              Accès, rectification, suppression, limitation, opposition. Pour exercer vos droits : contact@lepetitcoin-lyon.fr
            </p>
            <h2>Cookies</h2>
            <p>
              Nous n’utilisons pas de cookies de suivi pour l’instant. Si des cookies d’analytics/marketing sont ajoutés, cette politique sera mise à jour et une bannière de consentement sera affichée si nécessaire.
            </p>
            <h2>Sécurité</h2>
            <p>
              Mesures techniques et organisationnelles raisonnables pour protéger vos données.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Privacy;