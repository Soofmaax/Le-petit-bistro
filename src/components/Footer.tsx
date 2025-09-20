import React from 'react';
import { Heart, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0];
  const termsLabel = lang === 'en' ? 'Terms of Use' : "Conditions d'utilisation";
  const cookiesLabel = lang === 'en' ? 'Cookies' : 'Cookies';

  return (
    <footer className="bg-[#8B4513] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#D2691E] rounded-full flex items-center justify-center">
                <span className="text-white font-bold font-display">LC</span>
              </div>
              <h3 className="text-xl font-bold font-display">Le Petit Coin</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-1 mt-3 text-[#F5E6D3]">
              <span className="text-sm">{t('footer.made_with')}</span>
              <Heart className="text-red-400" size={16} />
              <span className="text-sm">{t('footer.since')}</span>
            </div>
          </div>

          {/* Contact rapide */}
          <div>
            <h4 className="font-semibold mb-3 text-[#F5E6D3]">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-[#D2691E]" />
                <span>12 Rue des Fantasques, Lyon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-[#D2691E]" />
                <a href="tel:+33478123456" className="hover:text-[#D2691E] transition-colors">
                  04 78 12 34 56
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-[#D2691E]" />
                <span>11h30-14h30 • 18h30-22h30</span>
              </div>
            </div>
          </div>

          {/* Horaires détaillés */}
          <div>
            <h4 className="font-semibold mb-3 text-[#F5E6D3]">{t('footer.hours')}</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>{t('footer.mon_sat')}</span>
                <span className="text-[#D2691E]">11h30-22h30</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.sunday')}</span>
                <span className="text-[#D2691E]">11h30-15h00</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.tuesday')}</span>
                <span className="text-red-400">{t('footer.closed')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="opacity-75 mb-2 md:mb-0">
              © 2024 Le Petit Coin - {t('footer.rights')}
            </p>
            <div className="flex space-x-4 opacity-75">
              <NavLink to="/legal" className="hover:text-[#D2691E] transition-colors">{t('footer.legal')}</NavLink>
              <NavLink to="/privacy" className="hover:text-[#D2691E] transition-colors">{t('footer.privacy')}</NavLink>
              <NavLink to="/terms" className="hover:text-[#D2691E] transition-colors">{termsLabel}</NavLink>
              <NavLink to="/cookies" className="hover:text-[#D2691E] transition-colors">{cookiesLabel}</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;