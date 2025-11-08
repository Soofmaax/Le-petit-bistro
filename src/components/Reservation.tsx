import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMotionPreference } from '../hooks/useMotionPreference';
import { createReservation, getAvailableTimes, isClosed, getBlockedServices } from '../services/reservationMock';
import ReservationForm, { ReservationFormValues } from './reservation/ReservationForm';
import ReservationSuccess from './reservation/ReservationSuccess';
import PracticalInfo from './reservation/PracticalInfo';

type LottieAnimationData = {
  v: string; fr: number; ip: number; op: number; w: number; h: number; nm: string; [key: string]: unknown;
};

const Reservation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const reduce = useMotionPreference();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successAnim, setSuccessAnim] = useState<LottieAnimationData | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [blocked, setBlocked] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<ReservationFormValues>({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const timeoutRef = useRef<number | null>(null);

  // Load a lightweight success Lottie animation (external asset)
  useEffect(() => {
    if (reduce) return;
    fetch('https://lottie.host/4e3f5f45-0e1f-4f44-9a8c-0e1f7a6b7b9a/2D1vR5a5zB.json')
      .then((r) => r.json())
      .then(setSuccessAnim)
      .catch(() => setSuccessAnim(null));
  }, [reduce]);

  // Confetti on submit
  useEffect(() => {
    if (!isSubmitted || reduce) return;
    const duration = 900;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.2 },
        startVelocity: 32,
        scalar: 0.85,
        colors: ['#D2691E', '#F5E6D3', '#8B4513']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [isSubmitted, reduce]);

  // Update available times when date changes
  useEffect(() => {
    const date = formValues.date;
    if (!date) {
      setTimes([]);
      setBlocked([]);
      return;
    }
    if (isClosed(date)) {
      setTimes([]);
      setBlocked([]);
      setError((i18n.language || 'fr').startsWith('en')
        ? 'The restaurant is closed on the selected day.'
        : 'Le restaurant est fermé le jour sélectionné.');
      return;
    }
    const avail = getAvailableTimes(date);
    setTimes(avail);
    setBlocked(getBlockedServices(date));
    if (formValues.time && !avail.includes(formValues.time)) {
      setFormValues((prev) => ({ ...prev, time: '' }));
    }
    setError('');
  }, [formValues.date, formValues.time, i18n.language]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const minDate = new Date().toISOString().split('T')[0];

  const onDateChange = (date: string) => {
    setFormValues((prev) => ({ ...prev, date }));
  };

  const onSubmit = async (values: ReservationFormValues) => {
    setError('');
    if (!values.date || !values.time) return;
    if (isClosed(values.date)) {
      setError((i18n.language || 'fr').startsWith('en')
        ? 'The restaurant is closed on the selected day.'
        : 'Le restaurant est fermé le jour sélectionné.');
      return;
    }
    try {
      await createReservation({
        date: values.date,
        time: values.time,
        guests: values.guests === '10+' ? 10 : parseInt(values.guests, 10),
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message
      });
      setFormValues(values);
      setIsSubmitted(true);
      timeoutRef.current = window.setTimeout(() => {
        setIsSubmitted(false);
        setFormValues({
          date: '',
          time: '',
          guests: '2',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setTimes([]);
        setBlocked([]);
        timeoutRef.current = null;
      }, 3000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'unknown';
      if (msg === 'slot_full') {
        setError((i18n.language || 'fr').startsWith('en')
          ? 'Selected time is fully booked. Please choose another slot.'
          : 'Ce créneau est complet. Merci de choisir un autre horaire.');
      } else if (msg === 'closed_day') {
        setError((i18n.language || 'fr').startsWith('en')
          ? 'The restaurant is closed on this day.'
          : 'Le restaurant est fermé ce jour-là.');
      } else {
        setError((i18n.language || 'fr').startsWith('en')
          ? 'An error occurred. Please try again.'
          : 'Une erreur est survenue. Merci de réessayer.');
      }
    }
  };

  if (isSubmitted) {
    return (
      <ReservationSuccess
        reduceMotion={reduce}
        successAnim={successAnim}
        values={{
          name: formValues.name,
          guests: formValues.guests,
          date: formValues.date,
          time: formValues.time,
          phone: formValues.phone
        }}
      />
    );
  }

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
            <ReservationForm
              times={times}
              blockedBadges={blocked}
              defaultValues={formValues}
              minDate={minDate}
              isClosed={!!formValues.date && isClosed(formValues.date)}
              error={error}
              onSubmit={onSubmit}
              onDateChange={onDateChange}
            />
          </div>

          {/* Informations pratiques + image */}
          <div>
            <PracticalInfo />
            <div className="bg-white/90 rounded-xl p-6 shadow-lg mt-6">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/reservation_ambience_800.avif 800w, /images/reservation_ambience_1200.avif 1200w"
                />
                <source
                  type="image/webp"
                  srcSet="/images/reservation_ambience_800.webp 800w, /images/reservation_ambience_1200.webp 1200w"
                />
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
              </picture>
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