import React, { useMemo, useState } from 'react';
import { Wine, Coffee, Utensils, ChefHat } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import data from '../data/menu.json';
import type { MenuData } from '../types/menu';

const iconsMap = {
  Wine: <Wine size={20} />,
  Coffee: <Coffee size={20} />,
  Utensils: <Utensils size={20} />,
  ChefHat: <ChefHat size={20} />
} as const;

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const menuData = data as MenuData;
  const categories = useMemo(() => Object.keys(menuData), [menuData]);
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'entrees');

  const current = menuData[activeCategory];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] dark:text-[#F5E6D3] mb-4 font-['Pacifico']">
            {t('menu.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('menu.intro')}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const categoryData = menuData[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-[#D2691E] text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-[#8B4513] dark:text-[#F5E6D3] hover:bg-[#F5E6D3] dark:hover:bg-slate-700 border border-[#D2691E]/20'
                }`}
              >
                <span>{iconsMap[categoryData.icon]}</span>
                <span>{categoryData.title}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-8 shadow-lg overflow-hidden">
          <h3 className="text-3xl font-bold text-[#8B4513] dark:text-[#F5E6D3] mb-8 text-center font-['Pacifico']">
            {current.title}
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {current.items.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="border-b border-[#D2691E]/20 pb-4 hover:bg-[#F5E6D3]/50 dark:hover:bg-slate-700/40 p-4 rounded-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-[#8B4513] dark:text-[#F5E6D3] font-['Pacifico']">
                      {item.name}
                    </h4>
                    <span className="text-lg font-bold text-[#D2691E] ml-4 flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chef's Special */}
        <div className="mt-8 bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2 font-['Pacifico']">{t('menu.chef_special')}</h3>
          <p className="text-lg">{t('menu.chef_special_sub')}</p>
          <p className="text-sm mt-2 opacity-90">{t('menu.chef_special_note')}</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;