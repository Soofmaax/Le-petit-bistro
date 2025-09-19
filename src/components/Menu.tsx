import React, { useMemo, useState } from 'react';
import { Wine, Coffee, Utensils, ChefHat } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import menuFr from '../data/menu.fr.json';
import menuEn from '../data/menu.en.json';
import type { MenuData } from '../types/menu';

const iconsMap = {
  Wine: <Wine size={20} />,
  Coffee: <Coffee size={20} />,
  Utensils: <Utensils size={20} />,
  ChefHat: <ChefHat size={20} />
} as const;

// We keep stable canonical keys in data files.
// Titles are localized in the JSONs; route doesn't depend on category.
const useLocalizedMenu = (lng: string): MenuData => {
  const lang = (lng || 'fr').toLowerCase();
  if (lang.startsWith('en')) return menuEn as MenuData;
  return menuFr as MenuData;
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } }
};

const Menu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const menuData = useLocalizedMenu(i18n.language);
  const categories = useMemo(() => Object.keys(menuData), [menuData]);
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'entrees');

  const current = menuData[activeCategory];

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B4513] dark:text-[#F5E6D3] mb-3 sm:mb-4 font-['Pacifico']">
            {t('menu.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto px-2">
            {t('menu.intro')}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {categories.map((category) => {
            const categoryData = menuData[category];
            return (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#D2691E] text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-[#8B4513] dark:text-[#F5E6D3] hover:bg-[#F5E6D3] dark:hover:bg-slate-700 border border-[#D2691E]/20'
                }`}
              >
                <span className="hidden sm:inline">{iconsMap[categoryData.icon]}</span>
                <span className="text-sm sm:text-base">{categoryData.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-4 sm:p-8 shadow-lg overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B4513] dark:text-[#F5E6D3] mb-6 sm:mb-8 text-center font-['Pacifico']">
            {current.title}
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + (i18n.language || 'fr')}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-4 sm:gap-6 md:grid-cols-2"
            >
              {current.items.map((item, index) => (
                <motion.div
                  variants={itemVariants}
                  key={`${item.name}-${index}`}
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(245,230,211,0.5)' }}
                  className="border-b border-[#D2691E]/20 pb-3 sm:pb-4 p-3 sm:p-4 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1.5 sm:mb-2 gap-1.5">
                    <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] dark:text-[#F5E6D3] font-['Pacifico'] leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-base sm:text-lg font-bold text-[#D2691E] md:ml-4 md:flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chef's Special */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-4 sm:p-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 font-['Pacifico']">{t('menu.chef_special')}</h3>
          <p className="text-base sm:text-lg">{t('menu.chef_special_sub')}</p>
          <p className="text-xs sm:text-sm mt-2 opacity-90">{t('menu.chef_special_note')}</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;