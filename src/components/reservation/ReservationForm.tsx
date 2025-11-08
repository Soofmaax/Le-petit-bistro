import React from 'react';
import { Calendar, Clock, Users, Phone, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

const schema = z.object({
  date: z.string().min(1, 'required'),
  time: z.string().min(1, 'required'),
  guests: z.union([z.string().regex(/^(?:[1-9]|10\+)$/), z.string().regex(/^(10)$/)]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional()
});

export type ReservationFormValues = z.infer<typeof schema>;

type Props = {
  times: string[];
  blockedBadges: string[]; // 'lunch' | 'dinner'
  defaultValues: ReservationFormValues;
  minDate: string;
  isClosed: boolean;
  error: string;
  onSubmit: (values: ReservationFormValues) => void | Promise<void>;
  onDateChange: (date: string) => void;
};

const ReservationForm: React.FC<Props> = ({
  times,
  blockedBadges,
  defaultValues,
  minDate,
  isClosed,
  error,
  onSubmit,
  onDateChange
}) => {
  const { t, i18n } = useTranslation();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReservationFormValues>({
    resolver: zodResolver(schema),
    defaultValues
  });

  // keep external state in sync when date changes
  const dateWatch = watch('date');
  React.useEffect(() => {
    if (dateWatch) onDateChange(dateWatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateWatch]);

  const submit = (values: ReservationFormValues) => onSubmit(values);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#8B4513] mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            {t('reservation.date')}
          </label>
          <input
            type="date"
            {...register('date')}
            min={minDate}
            className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
          />
          {errors.date && <p className="text-sm text-red-600 mt-1">{t('reservation.choose_time')}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#8B4513] mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            {t('reservation.time')}
          </label>
          <select
            {...register('time')}
            disabled={!dateWatch || isClosed}
            className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">{t('reservation.choose_time')}</option>
            {times.map((tme) => (
              <option key={tme} value={tme}>
                {tme}
              </option>
            ))}
          </select>
          {dateWatch && blockedBadges.length > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F5E6D3] px-3 py-1 text-sm text-[#8B4513]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D2691E]" />
              {blockedBadges.includes('lunch') && (
                <span>{(i18n.language || 'fr').startsWith('en') ? 'Lunch service full' : 'Service déjeuner complet'}</span>
              )}
              {blockedBadges.includes('dinner') && (
                <span>{(i18n.language || 'fr').startsWith('en') ? 'Dinner service full' : 'Service dîner complet'}</span>
              )}
            </div>
          )}
          {dateWatch && times.length === 0 && !isClosed && (
            <p className="text-sm text-[#B8551A] mt-1">
              {(i18n.language || 'fr').startsWith('en') ? 'Some days may be fully booked.' : 'Certains jours peuvent être complets.'}
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
          {...register('guests')}
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
          {...register('name')}
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
          {...register('email')}
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
          {...register('phone')}
          className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
          placeholder={t('reservation.phone_ph') as string}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#8B4513] mb-2">
          {t('reservation.message_optional')}
        </label>
        <textarea
          {...register('message')}
          rows={3}
          className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
          placeholder={t('reservation.message_ph') as string}
        ></textarea>
      </div>

      {!!error && (
        <div className="p-3 rounded-lg bg-[#F5E6D3] text-[#8B4513] flex items-start gap-2" role="alert" aria-live="assertive">
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
  );
};

export default ReservationForm;