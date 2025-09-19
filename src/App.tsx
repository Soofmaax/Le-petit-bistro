import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.main>
);

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F5E6D3] dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Hero />
                <div className="px-4 py-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#8B4513] dark:text-[#F5E6D3] text-center mb-8 font-['Pacifico']">
                      Un aperçu de nos spécialités
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                      <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-[#8B4513] dark:text-[#F5E6D3] mb-3">Plats du terroir</h3>
                        <p className="text-gray-700 dark:text-slate-300 mb-4">Bœuf bourguignon, coq au vin, cassoulet... Des recettes authentiques préparées avec amour.</p>
                        <span className="text-[#D2691E] font-semibold">À partir de 12€</span>
                      </div>
                      <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-[#8B4513] dark:text-[#F5E6D3] mb-3">Vins de la région</h3>
                        <p className="text-gray-700 dark:text-slate-300 mb-4">Une sélection de vins locaux pour accompagner parfaitement vos repas.</p>
                        <span className="text-[#D2691E] font-semibold">À partir de 4€ le verre</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Page>
            }
          />
          <Route
            path="/menu"
            element={
              <Page>
                <Menu />
              </Page>
            }
          />
          <Route
            path="/a-propos"
            element={
              <Page>
                <About />
              </Page>
            }
          />
          <Route
            path="/reservation"
            element={
              <Page>
                <Reservation />
              </Page>
            }
          />
          <Route
            path="/contact"
            element={
              <Page>
                <Contact />
              </Page>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;