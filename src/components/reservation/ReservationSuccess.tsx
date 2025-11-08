import React from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';

type LottieAnimationData = {
  v: string; fr: number; ip: number; op: number; w: number; h: number; nm: string; [key: string]: unknown;
};

type Props = {
  reduceMotion: boolean;
  successAnim: LottieAnimationData | null;
  values: {
    name: string;
    guests: string;
    date: string;
    time: string;
    phone: string;
  };
};

const ReservationSuccess: React.FC<Props> = ({ reduceMotion, successAnim, values }) => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/90 rounded-xl p-8 shadow-lg">
          {!reduceMotion && successAnim ? (
            <Lottie animationData={successAnim} loop={false} style={{ width: 140, height: 140, margin: '0 auto' }} />
          ) : (
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 mx-auto mb-4" />
          )}
          <h2 className="text-3xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            {t('reservation.confirm_title')}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {t('reservation.confirm_text', {
              name: values.name,
              guests: values.guests,
              date: values.date,
              time: values.time
            })}
          </p>
          <p className="text-gray-600">
            {t('reservation.confirm_phone', { phone: values.phone })}
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
};

export default ReservationSuccess;