import React, { useState } from 'react';
import { Wine, Coffee, Utensils } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('entrees');

  const menuData = {
    entrees: {
      title: 'Entrées',
      icon: <Utensils size={24} />,
      items: [
        { name: 'Soupe du jour', description: 'Préparée avec les légumes frais du marché', price: '6€' },
        { name: 'Salade de chèvre chaud', description: 'Mesclun, noix, miel et toast grillé', price: '8€' },
        { name: 'Terrine maison', description: 'Aux herbes de Provence, cornichons et pain de campagne', price: '7€' },
        { name: 'Escargots de Bourgogne', description: '6 pièces au beurre persillé', price: '9€' }
      ]
    },
    plats: {
      title: 'Plats Principaux',
      icon: <ChefHat size={24} />,
      items: [
        { name: 'Bœuf bourguignon', description: 'Mijoté 24h, purée maison et légumes de saison', price: '18€' },
        { name: 'Coq au vin', description: 'Recette traditionnelle, champignons et lardons', price: '16€' },
        { name: 'Saumon grillé', description: 'Sauce hollandaise et risotto aux petits légumes', price: '17€' },
        { name: 'Pasta primavera', description: 'Pâtes fraîches, légumes de saison et parmesan', price: '12€' },
        { name: 'Cassoulet toulousain', description: 'Haricots, saucisse, confit de canard', price: '15€' },
        { name: 'Magret de canard', description: 'Sauce aux cerises et gratin dauphinois', price: '19€' }
      ]
    },
    desserts: {
      title: 'Desserts Maison',
      icon: <Coffee size={24} />,
      items: [
        { name: 'Tarte tatin', description: 'Pommes caramélisées et glace vanille', price: '7€' },
        { name: 'Mousse au chocolat', description: 'Chocolat noir 70% et chantilly maison', price: '6€' },
        { name: 'Crème brûlée', description: 'Vanille de Madagascar, caramélisée minute', price: '6€' },
        { name: 'Profiteroles', description: 'Glace vanille et sauce chocolat chaud', price: '8€' }
      ]
    },
    boissons: {
      title: 'Boissons',
      icon: <Wine size={24} />,
      items: [
        { name: 'Côtes du Rhône rouge', description: 'Verre / Bouteille', price: '5€ / 22€' },
        { name: 'Sancerre blanc', description: 'Verre / Bouteille', price: '6€ / 28€' },
        { name: 'Bière artisanale', description: 'Blonde ou ambrée, 33cl', price: '4€' },
        { name: 'Café espresso', description: 'Arabica torréfié maison', price: '2€' },
        { name: 'Chocolat chaud', description: 'Chocolat noir et chantilly', price: '4€' },
        { name: 'Thé de Ceylan', description: 'Sélection de thés fins', price: '3€' }
      ]
    }
  };

  const categories = Object.keys(menuData);

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4 font-['Pacifico']">
            Notre Carte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des recettes traditionnelles préparées avec des produits frais du marché. 
            Chaque plat est cuisiné avec amour dans notre cuisine ouverte.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const categoryData = menuData[category as keyof typeof menuData];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-[#D2691E] text-white shadow-lg'
                    : 'bg-white text-[#8B4513] hover:bg-[#F5E6D3] border border-[#D2691E]/20'
                }`}
              >
                {categoryData.icon}
                <span>{categoryData.title}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="bg-white/80 rounded-xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-[#8B4513] mb-8 text-center font-['Pacifico']">
            {menuData[activeCategory as keyof typeof menuData].title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {menuData[activeCategory as keyof typeof menuData].items.map((item, index) => (
              <div 
                key={index}
                className="border-b border-[#D2691E]/20 pb-4 hover:bg-[#F5E6D3]/50 p-4 rounded-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-[#8B4513] font-['Pacifico']">
                    {item.name}
                  </h4>
                  <span className="text-lg font-bold text-[#D2691E] ml-4 flex-shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chef's Special */}
        <div className="mt-8 bg-gradient-to-r from-[#D2691E] to-[#B8551A] text-white rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2 font-['Pacifico']">Plat du Chef</h3>
          <p className="text-lg">Demandez à votre serveur la spécialité du jour !</p>
          <p className="text-sm mt-2 opacity-90">Préparé selon l'inspiration et les arrivages du marché</p>
        </div>
      </div>
    </section>
  );
};

// Import ChefHat from lucide-react
import { ChefHat } from 'lucide-react';

export default Menu;