import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Heart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPreference } from '../hooks/useMotionPreference';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reduce = useMotionPreference();

  // Parallax background
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 40]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  // Magnetic buttons
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [reservePos, setReservePos] = useState({ x: 0, y: 0 });

  const handleMagnet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setPos: (p: { x: number; y: number }) => void
  ) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) / 18,
      y: (e.clientY - r.top - r.height / 2) / 18
    });
  };

  const resetMagnet = (setPos: (p: { x: number; y: number }) => void) => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Background Image with parallax */}
      <motion.div
        style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        aria-hidden
        animate={{}}
        transition={{ duration: 0 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display leading-tight">
            {t('site.tagline')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            {t('site.hero_sub')}
            <span className="block mt-2 text-[#F5E6D3]">{t('hero.like_home')}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.button
              onMouseMove={(e) => handleMagnet(e, setMenuPos)}
              onMouseLeave={() => resetMagnet(setMenuPos)}
              animate={reduce ? { x: 0, y: 0 } : { x: menuPos.x, y: menuPos.y }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              onClick={() => navigate('/menu')}
              className="bg-[#D2691E] hover:bg-[#B8551A] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              {t('site.cta_menu')}
            </motion.button>
            <motion.button
              onMouseMove={(e) => handleMagnet(e, setReservePos)}
              onMouseLeave={() => resetMagnet(setReservePos)}
              animate={reduce ? { x: 0, y: 0 } : { x: reservePos.x, y: reservePos.y }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              onClick={() => navigate('/reservation')}
              className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border border-white/50 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              {t('site.cta_reserve')}
            </motion.button>
          </div>

          <div className="flex items-center space-x-6 text-[#F5E6D3]">
            <div className="flex items-center space-x-2">
              <ChefHat size={20} />
              <span>{t('hero.made_with_love')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart size={20} />
              <span>{t('hero.fresh_products')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={20} />
              <span>{t('hero.since')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${reduce ? '' : 'animate-bounce'}`}>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className={`w-1 h-3 bg-white/70 rounded-full mt-2 ${reduce ? '' : 'animate-pulse'}`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;