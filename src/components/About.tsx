import React from 'react';
import { Users, Award, Heart, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const About: React.FC = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  // Parallax banner
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 250], [0, 30]);
  const scale = useTransform(scrollY, [0, 250], [1, 1.04]);

  const fadeUp = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.1 : 0.35, ease: 'easeOut' } }
  };

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4">
      {/* Banner with parallax */}
      <div className="relative h-40 sm:h-56 mb-8 sm:mb-12 rounded-xl overflow-hidden">
        <motion.div style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/about_interior_1200.jpg)" }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl text-white font-['Pacifico'] drop-shadow">Le Petit Coin</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B4513] mb-3 sm:mb-4 font-['Pacifico']">
            {t('about.title')}
          </h2>
          {reduce ? (
            <div className="h-1 bg-[#D2691E] mx-auto rounded-full mb-3" style={{ width: 120 }} />
          ) : (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-1 bg-[#D2691E] mx-auto rounded-full mb-3"
            />
          )}
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            {t('about.intro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center mb-8 sm:mb-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img 
              src="/images/about_interior_1200.jpg"
              srcSet="/images/about_interior_800.jpg 800w, /images/about_interior_1200.jpg 1200w"
              alt={t('about.image_alt')}
              className="rounded-xl shadow-lg w-full h-60 sm:h-80 object-cover"
              loading="lazy"
              width="1200"
              height="900"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
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
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="bg-white/80 rounded-xl p-6 sm:p-8 shadow-lg mb-8 sm:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#8B4513] mb-6 sm:mb-8 text-center font-['Pacifico']">
            {t('about.team_title')}
          </h3>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[ 'antoine', 'sophie', 'paul' ].map((key) => (
              <motion.div
                key={key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <img 
                  src={`/images/team_${key}_600.jpg`}
                  srcSet={`/images/team_${key}_300.jpg 300w, /images/team_${key}_600.jpg 600w`}
                  alt={t(`about.team.${key}_alt`)}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 object-cover shadow-md"
                  loading="lazy"
                  width="300"
                  height="300"
                />
                <h4 className="text-lg sm:text-xl font-semibold text-[#8B4513] font-['Pacifico']">{t(`about.team.${key}_name`)}</h4>
                <p className="text-[#D2691E] font-semibold text-sm sm:text-base">{t(`about.team.${key}_role`)}</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">
                  {t(`about.team.${key}_bio`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
          {[
            { iconBg: 'bg-[#D2691E]', icon: <Users className="text-white" size={22} />, title: t('about.values.conviviality_title'), desc: t('about.values.conviviality_desc') },
            { iconBg: 'bg-[#808000]', icon: <Award className="text-white" size={22} />, title: t('about.values.quality_title'), desc: t('about.values.quality_desc') },
            { iconBg: 'bg-[#D2691E]', icon: <Heart className="text-white" size={22} />, title: t('about.values.passion_title'), desc: t('about.values.passion_desc') },
            { iconBg: 'bg-[#808000]', icon: <Clock className="text-white" size={22} />, title: t('about.values.tradition_title'), desc: t('about.values.tradition_desc') }
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.05 * i }}
              className="text-center p-5 sm:p-6 bg-white/80 rounded-lg shadow-md"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                {card.icon}
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-[#8B4513] mb-1.5 sm:mb-2">{card.title}</h4>
              <p className="text-gray-600 text-xs sm:text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;