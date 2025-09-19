import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Reservation: React.FC = () => {
  const { t } = useTranslation();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
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
    }, 3000);
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
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
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

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            {t('reservation.title')}
          </h2>
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
                    className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  >
                    <option value="">{t('reservation.choose_time')}</option>
                    <option value="11:30">11h30</option>
                    <option value="12:00">12h00</option>
                    <option value="12:30">12h30</option>
                    <option value="13:00">13h00</option>
                    <option value="13:30">13h30</option>
                    <option value="14:00">14h00</option>
                    <option value="18:30">18h30</option>
                    <option value="19:00">19h00</option>
                    <option value="19:30">19h30</option>
                    <option value="20:00">20h00</option>
                    <option value="20:30">20h30</option>
                    <option value="21:00">21h00</option>
                    <option value="21:30">21h30</option>
                    <option value="22:00">22h00</option>
                  </select>
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
                src="/images/reservation_ambience.jpg"
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