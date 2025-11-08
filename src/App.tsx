import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Analytics from './components/Analytics';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useMotionPreference } from './hooks/useMotionPreference';
import Seo from './components/SEO';
import { buildHomeJsonLd, buildOgImage } from './components/seoUtils';
import Legal from './components/legal/Legal';
import Privacy from './components/legal/Privacy';
import Terms from './components/legal/Terms';
import Cookies from './components/legal/Cookies';
import CookieConsent from './components/CookieConsent';

const Page: React.FC<{ children: React.ReactNode; reduce?: boolean }> = ({ children, reduce }) => (
  <motion.main
    initial={reduce ? false : { opacity: 0, y: 12 }}
    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
    transition={{ duration: reduce ? 0.1 : 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.main>
);

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const reduce = useMotionPreference();
  const lang = (i18n.language || 'fr').split('-')[0];
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';

  const fadeUp = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.1 : 0.35, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-slate-900 dark:text-slate-100">
      <Analytics />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${lang === 'en' ? 'Neighborhood bistro' : 'Bistro de quartier'}`}
                    description={
                      lang === 'en'
                        ? 'Traditional French cuisine in a warm, authentic neighborhood bistro in Lyon.'
                        : 'Cuisine française traditionnelle dans un bistro de quartier chaleureux et authentique à Lyon.'
                    }
                    path="/"
                    ogImage={buildOgImage('Le Petit Coin — ' + (lang === 'en' ? 'Neighborhood bistro' : 'Bistro de quartier'))}
                    jsonLd={buildHomeJsonLd(origin, lang)}
                  />
                  <Hero />
                  <div className="px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold text-[#8B4513] dark:text-[#F5E6D3] text-center mb-8 font-['Pacifico']">
                        {t('home.preview_title')}
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <motion.div
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.3 }}
                          className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-6 shadow-md"
                        >
                          <h3 className="text-xl font-semibold text-[#8B4513] dark:text-[#F5E6D3] mb-3">{t('home.dishes_title')}</h3>
                          <p className="text-gray-700 dark:text-slate-300 mb-4">{t('home.dishes_desc')}</p>
                          <span className="text-[#D2691E] font-semibold">{t('home.from_price', { price: '12€' })}</span>
                        </motion.div>
                        <motion.div
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.3 }}
                          className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-6 shadow-md"
                        >
                          <h3 className="text-xl font-semibold text-[#8B4513] dark:text-[#F5E6D3] mb-3">{t('home.wine_title')}</h3>
                          <p className="text-gray-700 dark:text-slate-300 mb-4">{t('home.wine_desc')}</p>
                          <span className="text-[#D2691E] font-semibold">{t('home.from_price_glass', { price: '4€' })}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Page>
              }
            />
            <Route
              path="/menu"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${t('nav.menu')}`}
                    description={lang === 'en' ? 'Explore our seasonal menu.' : 'Découvrez notre carte de saison.'}
                    path="/menu"
                    ogImage={buildOgImage('Menu — Le Petit Coin')}
                  />
                  <Menu />
                </Page>
              }
            />
            <Route
              path="/a-propos"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${t('nav.about')}`}
                    description={lang === 'en' ? 'Our story and values.' : 'Notre histoire et nos valeurs.'}
                    path="/a-propos"
                    ogImage={buildOgImage('About — Le Petit Coin')}
                  />
                  <About />
                </Page>
              }
            />
            <Route
              path="/about"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${t('nav.about')}`}
                    description={lang === 'en' ? 'Our story and values.' : 'Notre histoire et nos valeurs.'}
                    path="/about"
                    ogImage={buildOgImage('About — Le Petit Coin')}
                  />
                  <About />
                </Page>
              }
            />
            <Route
              path="/reservation"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${t('nav.reservation')}`}
                    description={lang === 'en' ? 'Book a table online.' : 'Réservez une table en ligne.'}
                    path="/reservation"
                    ogImage={buildOgImage('Reservation — Le Petit Coin')}
                  />
                  <Reservation />
                </Page>
              }
            />
            <Route
              path="/contact"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${t('nav.contact')}`}
                    description={lang === 'en' ? 'Contact and practical info.' : 'Contact et informations pratiques.'}
                    path="/contact"
                    ogImage={buildOgImage('Contact — Le Petit Coin')}
                  />
                  <Contact />
                </Page>
              }
            />
            <Route
              path="/legal"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${lang === 'en' ? 'Legal notice' : 'Mentions légales'}`}
                    description={lang === 'en' ? 'Legal notice of the website.' : 'Mentions légales du site.'}
                    path="/legal"
                  />
                  <Legal />
                </Page>
              }
            />
            <Route
              path="/privacy"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}`}
                    description={
                      lang === 'en'
                        ? 'How we process and protect your personal data.'
                        : 'Comment nous traitons et protégeons vos données personnelles.'
                    }
                    path="/privacy"
                  />
                  <Privacy />
                </Page>
              }
            />
            <Route
              path="/terms"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${lang === 'en' ? 'Terms of Use' : "Conditions d'utilisation"}`}
                    description={
                      lang === 'en'
                        ? 'Terms of Use of the website.'
                        : "Conditions d'utilisation du site."
                    }
                    path="/terms"
                  />
                  <Terms />
                </Page>
              }
            />
            <Route
              path="/cookies"
              element={
                <Page reduce={reduce}>
                  <Seo
                    title={`Le Petit Coin — ${lang === 'en' ? 'Cookie Policy' : 'Politique de cookies'}`}
                    description={
                      lang === 'en'
                        ? 'Cookie information used on this website.'
                        : 'Informations sur les cookies utilisés sur ce site.'
                    }
                    path="/cookies"
                  />
                  <Cookies />
                </Page>
              }
            />
          </Routes>
        </motion.div>

        {/* Cover transition */}
        {!reduce && (
          <motion.div
            key={`cover-${location.pathname}`}
            className="fixed inset-0 bg-[#D2691E] z-40 pointer-events-none"
            initial={{ x: '100%' }}
            animate={{ x: '100%' }}
            exit={{ x: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default App;