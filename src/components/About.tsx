import React from 'react';
import { Users, Award, Heart, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B4513] mb-3 sm:mb-4 font-['Pacifico']">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            {t('about.intro')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center mb-8 sm:mb-12">
          <div>
            <img 
              src="/images/about_interior.jpg"
              alt={t('about.image_alt')}
              className="rounded-xl shadow-lg w-full h-60 sm:h-80 object-cover"
              loading="lazy"
              width="1200"
              height="900"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#8B4513] mb-3 sm:mb-4 font-['Pacifico']">
              {t('about.family_title')}
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              {t('about.family_p1')}
            </p>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {t('about.family_p2')}
            </p>
            
            <div className="flex items-center space-x-2 text-[#D2691E]">
              <Heart size={20} />
              <span className="font-semibold">{t('about.since_badge')}</span>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B4513] mb-6 sm:mb-8 text-center font-['Pacifico']">
            {t('about.team_title')}
          </h3>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="text-center">
              <img 
                src="/images/team_antoine.jpg"
                alt={t('about.team.antoine_alt')}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover shadow-md"
                loading="lazy"
                width="300"
                height="300"
              />
              <h4 className="text-lg sm:text-xl font-semibold text-[#8B4513] font-['Pacifico']">{t('about.team.antoine_name')}</h4>
              <p className="text-[#D2691E] font-semibold text-sm sm:text-base">{t('about.team.antoine_role')}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                {t('about.team.antoine_bio')}
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/team_sophie.jpg"
                alt={t('about.team.sophie_alt')}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover shadow-md"
                loading="lazy"
                width="300"
                height="300"
              />
              <h4 className="text-lg sm:text-xl font-semibold text-[#8B4513] font-['Pacifico']">{t('about.team.sophie_name')}</h4>
              <p className="text-[#D2691E] font-semibold text-sm sm:text-base">{t('about.team.sophie_role')}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                {t('about.team.sophie_bio')}
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="/images/team_paul.jpg"
                alt={t('about.team.paul_alt')}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover shadow-md"
                loading="lazy"
                width="300"
                height="300"
              />
              <h4 className="text-lg sm:text-xl font-semibold text-[#8B4513] font-['Pacifico']">{t('about.team.paul_name')}</h4>
              <p className="text-[#D2691E] font-semibold text-sm sm:text-base">{t('about.team.paul_role')}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                {t('about.team.paul_bio')}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
          <div className="text-center p-5 sm:p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#D2691E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="text-white" size={22} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] mb-1.5 sm:mb-2">{t('about.values.conviviality_title')}</h4>
            <p className="text-gray-600 text-xs sm:text-sm">{t('about.values.conviviality_desc')}</p>
          </div>

          <div className="text-center p-5 sm:p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#808000] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="text-white" size={22} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] mb-1.5 sm:mb-2">{t('about.values.quality_title')}</h4>
            <p className="text-gray-600 text-xs sm:text-sm">{t('about.values.quality_desc')}</p>
          </div>

          <div className="text-center p-5 sm:p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#D2691E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="text-white" size={22} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] mb-1.5 sm:mb-2">{t('about.values.passion_title')}</h4>
            <p className="text-gray-600 text-xs sm:text-sm">{t('about.values.passion_desc')}</p>
          </div>

          <div className="text-center p-5 sm:p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#808000] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Clock className="text-white" size={22} />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] mb-1.5 sm:mb-2">{t('about.values.tradition_title')}</h4>
            <p className="text-gray-600 text-xs sm:text-sm">{t('about.values.tradition_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;