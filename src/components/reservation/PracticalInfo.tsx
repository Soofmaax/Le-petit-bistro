import React from 'react';
import { Clock, Phone, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PracticalInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
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
    </div>
  );
};

export default PracticalInfo;