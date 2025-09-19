import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, CheckCircle } from 'lucide-react';

const Reservation: React.FC = () => {
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
              Réservation confirmée !
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Merci {formData.name} ! Votre réservation pour {formData.guests} personne(s) 
              le {formData.date} à {formData.time} a bien été prise en compte.
            </p>
            <p className="text-gray-600">
              Nous vous appellerons au {formData.phone} pour confirmer les détails.
            </p>
            <div className="mt-6 p-4 bg-[#F5E6D3] rounded-lg">
              <p className="text-[#8B4513] font-semibold">
                Nous avons hâte de vous accueillir au Petit Coin !
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
            Réserver une Table
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Réservez dès maintenant votre table pour vivre un moment convivial dans notre bistro. 
            Nous vous garantissons un accueil chaleureux !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire de réservation */}
          <div className="bg-white/90 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-['Pacifico']">
              Vos informations
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date
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
                    Heure
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  >
                    <option value="">Choisir l'heure</option>
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
                  Nombre de personnes
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
                      {num} personne{num > 1 ? 's' : ''}
                    </option>
                  ))}
                  <option value="10+">Plus de 10 personnes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder="Votre nom et prénom"
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
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#D2691E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] transition-all"
                  placeholder="Allergies, occasion spéciale, demandes particulières..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D2691E] hover:bg-[#B8551A] text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Confirmer ma réservation
              </button>
            </form>
          </div>

          {/* Informations pratiques */}
          <div className="space-y-6">
            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
                Informations pratiques
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">Horaires d'ouverture</p>
                    <p className="text-sm">Lun-Sam: 11h30-14h30 • 18h30-22h30</p>
                    <p className="text-sm">Dimanche: 11h30-15h00</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">Réservation téléphonique</p>
                    <p className="text-sm">04 78 XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#D2691E]" />
                  <div>
                    <p className="font-semibold">Groupes</p>
                    <p className="text-sm">Pour plus de 10 personnes, nous contacter directement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 font-['Pacifico']">Bon à savoir</h3>
              <ul className="text-sm space-y-2">
                <li>• Nous acceptons les réservations jusqu'à 21h30</li>
                <li>• Places en terrasse selon disponibilité</li>
                <li>• Menus enfants disponibles</li>
                <li>• Chaises hautes sur demande</li>
                <li>• Paiement CB accepté dès 10€</li>
              </ul>
            </div>

            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <img 
                src="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Ambiance du bistro"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 text-sm text-center italic">
                "Une ambiance chaleureuse vous attend au Petit Coin"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;