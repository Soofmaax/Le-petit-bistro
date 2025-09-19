import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && (
        <>
          <Hero
            onViewMenu={() => setActiveSection('menu')}
            onReserve={() => setActiveSection('reservation')}
          />
          <div className="px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#8B4513] text-center mb-8 font-['Pacifico']">
                Un aperçu de nos spécialités
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/80 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Plats du terroir</h3>
                  <p className="text-gray-700 mb-4">Bœuf bourguignon, coq au vin, cassoulet... Des recettes authentiques préparées avec amour.</p>
                  <span className="text-[#D2691E] font-semibold">À partir de 12€</span>
                </div>
                <div className="bg-white/80 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Vins de la région</h3>
                  <p className="text-gray-700 mb-4">Une sélection de vins locaux pour accompagner parfaitement vos repas.</p>
                  <span className="text-[#D2691E] font-semibold">À partir de 4€ le verre</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeSection === 'menu' && <Menu />}
      {activeSection === 'about' && <About />}
      {activeSection === 'reservation' && <Reservation />}
      {activeSection === 'contact' && <Contact />}
      
      <Footer />
    </div>
  );
}

export default App;