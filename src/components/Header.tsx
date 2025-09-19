import React from 'react';
import { Phone, Clock } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'menu', label: 'Notre Carte' },
    { id: 'about', label: 'À Propos' },
    { id: 'reservation', label: 'Réserver' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl font-['Pacifico']">LC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#8B4513] font-['Pacifico']">Le Petit Coin</h1>
              <p className="text-sm text-[#808000]">Bistro de quartier</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#F5E6D3] ${
                  activeSection === item.id 
                    ? 'bg-[#D2691E] text-white shadow-md' 
                    : 'text-[#8B4513] hover:text-[#D2691E]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-[#8B4513]">
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              <span className="text-sm">04 78 XX XX XX</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span className="text-sm">11h30-14h30 • 18h30-22h30</span>
            </div>
          </div>
        </div>

        {/* Navigation Mobile */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-[#D2691E] text-white' 
                  : 'bg-[#F5E6D3] text-[#8B4513] hover:bg-[#D2691E] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;