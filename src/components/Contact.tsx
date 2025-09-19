import React from 'react';
import { MapPin, Phone, Clock, Mail, Car, Train } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            Nous Trouver
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Situé au cœur de la Croix-Rousse, Le Petit Coin vous attend pour partager 
            un moment convivial autour de notre cuisine authentique.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Informations de contact */}
          <div className="bg-white/90 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-['Pacifico']">
              Coordonnées
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D2691E] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-1">Adresse</h4>
                  <p className="text-gray-600">
                    12 Rue des Fantasques<br/>
                    69001 Lyon - Croix-Rousse<br/>
                    France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#808000] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-1">Téléphone</h4>
                  <p className="text-gray-600">
                    <a href="tel:+33478123456" className="hover:text-[#D2691E] transition-colors">
                      04 78 12 34 56
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Réservations de 10h à 22h
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D2691E] rounded-full flex items-center justify-center flex-shrink-0">
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

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#808000] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#8B4513] mb-2">Horaires d'ouverture</h4>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p><span className="font-medium">Lundi - Samedi</span></p>
                    <p>11h30 - 14h30 • 18h30 - 22h30</p>
                    <p className="mt-2"><span className="font-medium">Dimanche</span></p>
                    <p>11h30 - 15h00</p>
                    <p className="text-[#D2691E] font-medium mt-2">Fermé le mardi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan et accès */}
          <div className="bg-white/90 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-['Pacifico']">
              Comment venir ?
            </h3>
            
            {/* Placeholder pour la carte */}
            <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>Plan interactif</p>
                <p className="text-sm">12 Rue des Fantasques, Lyon 1er</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Train className="text-[#D2691E] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-[#8B4513]">Transports en commun</h4>
                  <p className="text-gray-600 text-sm">
                    Métro C - Arrêt Croix-Rousse (5 min à pied)<br/>
                    Bus C13, C18 - Arrêt Bellevue
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Car className="text-[#808000] mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-[#8B4513]">En voiture</h4>
                  <p className="text-gray-600 text-sm">
                    Parking Place de la Croix-Rousse (200m)<br/>
                    Zones de stationnement payant à proximité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section newsletter et réseaux sociaux */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 font-['Pacifico']">Restez informés</h3>
            <p className="text-sm mb-4 opacity-90">
              Recevez nos actualités, plats du jour et événements spéciaux !
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-white text-[#D2691E] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                S'abonner
              </button>
            </div>
          </div>

          <div className="bg-white/90 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
              Suivez-nous
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez nos créations culinaires quotidiennes et l'ambiance du bistro
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-[#D2691E] rounded-full flex items-center justify-center text-white hover:bg-[#B8551A] transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-[#808000] rounded-full flex items-center justify-center text-white hover:bg-[#6B6B00] transition-colors">
                @
              </a>
              <a href="#" className="w-10 h-10 bg-[#D2691E] rounded-full flex items-center justify-center text-white hover:bg-[#B8551A] transition-colors">
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;