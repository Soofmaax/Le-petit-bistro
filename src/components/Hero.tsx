import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Heart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1920&amp;h=1080&amp;fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-['Pacifico'] leading-tight">
            {t('site.tagline')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            {t('site.hero_sub')}
            <span className="block mt-2 text-[#F5E6D3]">{t('hero.like_home')}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => navigate('/menu')}
              className="bg-[#D2691E] hover:bg-[#B8551A] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {t('site.cta_menu')}
            </button>
            <button
              onClick={() => navigate('/reservation')}
              className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border border-white/50 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              {t('site.cta_reserve')}
            </button>
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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;