import React from 'react';
import { Phone, Clock, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Accueil' },
    { to: '/menu', label: 'Notre Carte' },
    { to: '/a-propos', label: 'À Propos' },
    { to: '/reservation', label: 'Réserver' },
    { to: '/contact', label: 'Contact' }
  ];

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle('dark');
    // Optionnel: persister le choix
    localStorage.setItem('theme', el.classList.contains('dark') ? 'dark' : 'light');
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <header className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl font-['Pacifico']">LC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#8B4513] dark:text-[#F5E6D3] font-['Pacifico']">Le Petit Coin</h1>
              <p className="text-sm text-[#808000]">Bistro de quartier</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#F5E6D3] dark:hover:bg-slate-800 ${
                    isActive
                      ? 'bg-[#D2691E] text-white shadow-md'
                      : 'text-[#8B4513] dark:text-[#F5E6D3] hover:text-[#D2691E]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={toggleDark}
              aria-label="Basculer le thème"
              className="ml-2 p-2 rounded-md hover:bg-[#F5E6D3] dark:hover:bg-slate-800 text-[#8B4513] dark:text-[#F5E6D3]"
            >
              <span className="sr-only">Basculer le thème</span>
              <Moon className="hidden dark:block" size={18} />
              <Sun className="dark:hidden" size={18} />
            </button>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-[#8B4513] dark:text-[#F5E6D3]">
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
        <nav className="md:hidden mt-4 flex flex-wrap gap-2 items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D2691E] text-white'
                    : 'bg-[#F5E6D3] text-[#8B4513] hover:bg-[#D2691E] hover:text-white dark:bg-slate-800 dark:text-[#F5E6D3]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={toggleDark}
            aria-label="Basculer le thème"
            className="p-2 rounded-md bg-[#F5E6D3] dark:bg-slate-800 text-[#8B4513] dark:text-[#F5E6D3]"
          >
            <Moon className="hidden dark:block" size={16} />
            <Sun className="dark:hidden" size={16} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;