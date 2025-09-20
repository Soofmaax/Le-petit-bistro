import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Users, Phone, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useMotionPreference } from '../hooks/useMotionPreference';
import { createReservation, getAvailableTimes, isClosed } from '../services/reservationMock';

const Reservation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const reduce = useMotionPreference();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successAnim, setSuccessAnim] = useState<any | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  // Load a lightweight success Lottie animation (external asset)
  useEffect(() => {
    if (reduce) return; // skip fetching animation if reduced motion
    fetch('https://lottie.host/4e3f5f45-0e1f-4f44-9a8c-0e1f7a6b7b9a/2D1vR5a5zB.json')
      .then((r) => r.json())
      .then(setSuccessAnim)
      .catch(() => setSuccessAnim(null));
  }, [reduce]);

  useEffect(() => {
    if (!isSubmitted || reduce) return;
    // Subtle, brand-colored confetti with emoji hearts and squares
    const duration = 900;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.2 },
        startVelocity: 32,
        scalar: 0.85,
        colors: ['#D2691E', '#F5E6D3', '#8B4513'],
        emojis: ['❤️', '🟫'] as any
      } as any);
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [isSubmitted, reduce]);

  // Update available times when date changes
  useEffect(() => {
    if (!formData.date) {
      setTimes([]);
      return;
    }
    if (isClosed(formData.date)) {
      setTimes([]);
      setError(
        (i18n.language || 'fr').startsWith('en')
          ? 'The restaurant is closed on the selected day.'
          : 'Le restaurant est fermé le jour sélectionné.'
      );
      return;
    }
    const avail = getAvailableTimes(formData.date);
    setTimes(avail);
    // If currently selected time is no longer available, reset it
    if (formData.time && !avail.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: '' }));
    }
    setError('');
  }, [formData.date, formData.time, i18n.language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // client-side guard
    if (!formData.date || !formData.time) return;
    if (isClosed(formData.date)) {
      setError(
        (i18n.language || 'fr').startsWith('en')
          ? 'The restaurant is closed on the selected day.'
          : 'Le restaurant est fermé le jour sélectionné.'
      );
      return;
    }
    try {
      await createReservation({
        date: formData.date,
        time: formData.time,
        guests: formData.guests === '10+' ? 10 : parseInt(formData.guests, 10),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          date: '',
          time: '',
          guests: '2',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setTimes([]);
      }, 3000);
    } catch (err: any) {
      if (err?.message === 'slot_full') {
        setError(
          (i18n.language || 'fr').startsWith('en')
            ? 'Selected time is fully booked. Please choose another slot.'
            : 'Ce créneau est complet. Merci de choisir un autre horaire.'
        );
      } else if (err?.message === 'closed_day') {
        setError(
          (i18n.language || 'fr').startsWith('en')
            ? 'The restaurant is closed on this day.'
            : 'Le restaurant est fermé ce jour-là.'
        );
      } else {
        setError(
          (i18n.language || 'fr').startsWith('en')
            ? 'An error occurred. Please try again.'
            : 'Une erreur est survenue. Merci de réessayer.'
        );
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/90 rounded-xl p-8 shadow-lg">
            {!reduce && successAnim ? (
              <Lottie animationData={successAnim} loop={false} style={{ width: 140, height: 140, margin: '0 auto' }} />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
              {t('reservation.confirm_title')}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {t('reservation.confirm_text', {
                name: formData.name,
                guests: formData.guests,
                date: formData.date,
                time: formData.time
              })}
            </p>
            <p className="text-gray-600">
              {t('reservation.confirm_phone', { phone: formData.phone })}
            </p>
            <div className="mt-6 p-4 bg-[#F5E6D3] rounded-lg">
              <p className="text-[#8B4513] font-semibold">
                {t('reservation.confirm_ending')}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const underline = useMemo(
    () =>
      reduce ? (
        <div className="h-1 bg-[#D2691E] mx-auto rounded-full mb-3" style={{ width: 140 }} />
      ) : (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 140, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-1 bg-[#D2691E] mx-auto rounded-full mb-3"
        />
      ),
    [reduce]
  );

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            {t('reservation.title')}
          </h2>
          {underline}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('reservation.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire de réservation */}
          <div className="bg-white/90 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-['Pacifico']">
              {t('reservation.your_info')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {t('reservation.date')}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {t('reservation.time')}
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.date || isClosed(formData.date)}
                    className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">{t('reservation.choose_time')}</option>
                    {times.map((tme) => (
                      <option key={tme} value={tme}>
                        {tme}
                      </option>
                    ))}
                  </select>
                  {formData.date && !times.length && !isClosed(formData.date) && (
                    <p className="text-sm text-[#B8551A] mt-1">
                      {(i18n.language || 'fr').startsWith('en')
                        ? 'Some days may be fully booked.'
                        : 'Certains jours peuvent être complets.'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  {t('reservation.guests')}
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num.toString()}>
                      {t('reservation.person', { count: num })}
                    </option>
                  ))}
                  <option value="10+">{t('reservation.more_than_ten')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  {t('reservation.full_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder={t('reservation.full_name_ph') as string}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  {t('reservation.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder={t('reservation.phone_ph') as string}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  {t('reservation.message_optional')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder={t('reservation.message_ph') as string}
                ></textarea>
              </div>

              {!!error && (
                <div className="p-3 rounded-lg bg-[#F5E6D3] text-[#8B4513] flex items-start gap-2">
                  <AlertTriangle size={18} className="mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#D2691E] hover:bg-[#B8551A] text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t('reservation.submit')}
              </button>
            </form>
          </div>

          {/* Informations pratiques */}
          <div className="space-y-6">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
                {t('reservation.practical_info')}
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">{t('reservation.opening_hours')}</p>
                    <p className="text-sm">{t('reservation.hours_mon_sat')}</p>
                    <p className="text-sm">{t('reservation.hours_sun')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">{t('reservation.phone_booking')}</p>
                    <p className="text-sm">04 78 XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">{t('reservation.groups')}</p>
                    <p className="text-sm">{t('reservation.groups_text')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 font-['Pacifico']">{t('reservation.good_to_know')}</h3>
              <ul className="text-sm space-y-2">
                <li>• {t('reservation.tip_last_booking')}</li>
                <li>• {t('reservation.tip_terrace')}</li>
                <li>• {t('reservation.tip_kids')}</li>
                <li>• {t('reservation.tip_high_chairs')}</li>
                <li>• {t('reservation.tip_card_payment')}</li>
              </ul>
            </div>

            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <img 
                src="/images/reservation_ambience_1200.jpg"
                srcSet="/images/reservation_ambience_800.jpg 800w, /images/reservation_ambience_1200.jpg 1200w"
                alt={t('reservation.ambience_alt')}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                loading="lazy"
                width="1200"
                height="800"
                sizes="(max-width: 640px) 100vw, 600px"
              />
              <p className="text-gray-600 text-sm text-center italic">
                {t('reservation.ambience_quote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;