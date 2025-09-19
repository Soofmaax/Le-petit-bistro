import React from 'react';
import { MapPin, Phone, Clock, Mail, Car, Train } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B4513] mb-3 sm:mb-4 font-['Pacifico']">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            {t('contact.intro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Informations de contact */}
          <motion.div
            className="bg-white/90 rounded-xl p-6 sm:p-8 shadow-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#8B4513] mb-4 sm:mb-6 font-['Pacifico']">
              {t('contact.coords')}
            </h3>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D2691E] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-1">{t('contact.address')}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    12 Rue des Fantasques<br/>
                    69001 Lyon - Croix-Rousse<br/>
                    France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#808000] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-1">{t('contact.phone')}</h4>
                  <p className="text-gray-600">
                    <a href="tel:+33478123456" className="hover:text-[#D2691E] transition-colors">
                      04 78 12 34 56
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {t('contact.booking_hours')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D2691E] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-1">Email</h4>
                  <p className="text-gray-600">
                    <a href="mailto:contact@lepetitcoin-lyon.fr" className="hover:text-[#D2691E] transition-colors">
                      contact@lepetitcoin-lyon.fr
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#808000] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-2">{t('contact.opening_hours')}</h4>
                  <div className="text-gray-600 text-xs sm:text-sm space-y-1">
                    <p><span className="font-medium">{t('contact.monsat')}</span></p>
                    <p>11h30 - 14h30 • 18h30 - 22h30</p>
                    <p className="mt-2"><span className="font-medium">{t('contact.sunday')}</span></p>
                    <p>11h30 - 15h00</p>
                    <p className="text-[#D2691E] font-medium mt-2">{t('contact.tuesday_closed')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Plan et accès */}
          <motion.div
            className="bg-white/90 rounded-xl p-6 sm:p-8 shadow-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#8B4513] mb-4 sm:mb-6 font-['Pacifico']">
              {t('contact.how_to_come')}
            </h3>
            
            {/* Placeholder pour la carte */}
            <div className="bg-gray-200 rounded-lg h-56 sm:h-64 mb-4 sm:mb-6 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={40} className="mx-auto mb-2" />
                <p className="text-sm sm:text-base">{t('contact.map')}</p>
                <p className="text-xs sm:text-sm">12 Rue des Fantasques, Lyon 1er</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Train className="text-[#D2691E] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-[#8B4513]">{t('contact.public_transport')}</h4>
                  <p className="text-gray-600 text-sm">
                    Métro C - Arrêt Croix-Rousse (5 min à pied)<br/>
                    Bus C13, C18 - Arrêt Bellevue
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Car className="text-[#808000] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-[#8B4513]">{t('contact.by_car')}</h4>
                  <p className="text-gray-600 text-sm">
                    Parking Place de la Croix-Rousse (200m)<br/>
                    Zones de stationnement payant à proximité
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section newsletter et réseaux sociaux */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            className="bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-5 sm:p-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-['Pacifico']">{t('contact.stay_informed')}</h3>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
              {t('contact.newsletter_text')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('contact.your_email') as string}
                className="flex-1 px-3 sm:px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-white text-[#D2691E] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('contact.subscribe')}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/90 rounded-xl p-5 sm:p-6 shadow-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#8B4513] mb-3 sm:mb-4 font-['Pacifico']">
              {t('contact.follow_us')}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              {t('contact.follow_us_text')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D2691E] rounded-full flex items-center justify-center text-white hover:bg-[#B8551A] transition-colors">
                f
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-[#808000] rounded-full flex items-center justify-center text-white hover:bg-[#6B6B00] transition-colors">
                @
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D2691E] rounded-full flex items-center justify-center text-white hover:bg-[#B8551A] transition-colors">
                in
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;