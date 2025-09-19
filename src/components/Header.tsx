import React from 'react';
import { Phone, Clock, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/a-propos', label: t('nav.about') },
    { to: '/reservation', label: t('nav.reservation') },
    { to: '/contact', label: t('nav.contact') }
  ];

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle('dark');
    localStorage.setItem('theme', el.classList.contains('dark') ? 'dark' : 'light');
  };

  const changeLang = (lng: 'fr' | 'en') => {
    void i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    localStorage.setItem('lang', lng);
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    const savedLang = (localStorage.getItem('lang') as 'fr' | 'en' | null) ?? 'fr';
    void i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
  }, [i18n]);

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

            {/* Lang switcher */}
            <div className="ml-2 flex items-center rounded-md overflow-hidden border border-[#D2691E]/30">
              <button
                onClick={() => changeLang('fr')}
                className={`px-2 py-1 text-sm ${i18n.language === 'fr' ? 'bg-[#D2691E] text-white' : 'text-[#8B4513] dark:text-[#F5E6D3]'}`}
              >
                FR
              </button>
              <button
                onClick={() => changeLang('en')}
                className={`px-2 py-1 text-sm ${i18n.language === 'en' ? 'bg-[#D2691E] text-white' : 'text-[#8B4513] dark:text-[#F5E6D3]'}`}
              >
                EN
              </button>
            </div>

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

          {/* Lang switcher */}
          <div className="flex items-center rounded-md overflow-hidden border border-[#D2691E]/30">
            <button
              onClick={() => changeLang('fr')}
              className={`px-2 py-1 text-sm ${i18n.language === 'fr' ? 'bg-[#D2691E] text-white' : 'text-[#8B4513] dark:text-[#F5E6D3]'}`}
            >
              FR
            </button>
            <button
              onClick={() => changeLang('en')}
              className={`px-2 py-1 text-sm ${i18n.language === 'en' ? 'bg-[#D2691E] text-white' : 'text-[#8B4513] dark:text-[#F5E6D3]'}`}
            >
              EN
            </button>
          </div>

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