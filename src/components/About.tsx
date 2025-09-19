import React from 'react';
import { Users, Award, Heart, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            Notre Histoire
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Depuis 1985, Le Petit Coin vous accueille dans une ambiance chaleureuse et authentique, 
            au cœur du quartier de la Croix-Rousse à Lyon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img 
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Intérieur du bistro Le Petit Coin"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
              Une passion familiale
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Fondé par Marie et Jean-Claude Dubois, Le Petit Coin perpétue une tradition culinaire 
              transmise de génération en génération. Aujourd'hui, c'est leur fils Antoine qui vous 
              accueille avec la même passion pour la cuisine authentique et les produits du terroir.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Notre cuisine est ouverte sur la salle, permettant à nos clients de voir notre chef 
              travailler avec amour chaque plat. Nous privilégions les circuits courts et travaillons 
              avec les producteurs locaux pour vous offrir des produits frais de qualité.
            </p>
            
            <div className="flex items-center space-x-2 text-[#D2691E]">
              <Heart size={20} />
              <span className="font-semibold">Cuisine faite avec amour depuis 1985</span>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white/80 rounded-xl p-8 shadow-lg mb-12">
          <h3 className="text-3xl font-bold text-[#8B4513] mb-8 text-center font-['Pacifico']">
            Notre Équipe
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                alt="Antoine Dubois - Chef"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h4 className="text-xl font-semibold text-[#8B4513] font-['Pacifico']">Antoine Dubois</h4>
              <p className="text-[#D2691E] font-semibold">Chef & Propriétaire</p>
              <p className="text-gray-600 text-sm mt-2">
                Passionné de cuisine traditionnelle française depuis l'enfance
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/3992204/pexels-photo-3992204.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                alt="Sophie Martin - Serveuse"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h4 className="text-xl font-semibold text-[#8B4513] font-['Pacifico']">Sophie Martin</h4>
              <p className="text-[#D2691E] font-semibold">Manager de salle</p>
              <p className="text-gray-600 text-sm mt-2">
                Souriante et attentive, elle veille à votre bien-être
              </p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/4253313/pexels-photo-4253313.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                alt="Paul Rémy - Sous-chef"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md"
              />
              <h4 className="text-xl font-semibold text-[#8B4513] font-['Pacifico']">Paul Rémy</h4>
              <p className="text-[#D2691E] font-semibold">Sous-chef</p>
              <p className="text-gray-600 text-sm mt-2">
                Expert des sauces et spécialiste des desserts maison
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-[#D2691E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-[#8B4513] mb-2">Convivialité</h4>
            <p className="text-gray-600 text-sm">Une ambiance familiale où chacun se sent chez soi</p>
          </div>

          <div className="text-center p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-[#808000] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-[#8B4513] mb-2">Qualité</h4>
            <p className="text-gray-600 text-sm">Des produits frais et locaux pour des saveurs authentiques</p>
          </div>

          <div className="text-center p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-[#D2691E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-[#8B4513] mb-2">Passion</h4>
            <p className="text-gray-600 text-sm">Chaque plat est préparé avec amour et savoir-faire</p>
          </div>

          <div className="text-center p-6 bg-white/80 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-[#808000] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-[#8B4513] mb-2">Tradition</h4>
            <p className="text-gray-600 text-sm">Des recettes transmises depuis quatre générations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;