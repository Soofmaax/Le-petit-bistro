export const buildHomeJsonLd = (origin: string, lang: string = 'fr') => {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${origin}#restaurant`,
    name: 'Le Petit Coin',
    description:
      lang === 'en'
        ? 'Traditional French cuisine in a warm, authentic neighborhood bistro in Lyon.'
        : 'Cuisine française traditionnelle dans un bistro de quartier chaleureux et authentique à Lyon.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Rue des Fantasques',
      addressLocality: 'Lyon',
      postalCode: '69001',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR'
    },
    telephone: '+33 4 78 12 34 56',
    servesCuisine: ['French'],
    priceRange: '€€',
    url: origin,
    image: [`${origin}/images/hero_1600.jpg`],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:30',
        closes: '22:30'
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:30', closes: '15:00' }
    ],
    acceptsReservations: true,
    hasMenu: `${origin}/menu`
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}#website`,
    name: 'Le Petit Coin',
    url: origin,
    inLanguage: [lang]
  };

  return [restaurant, website];
};

export const buildOgImage = (title: string) => {
  const encoded = encodeURIComponent(title);
  return `https://og-image.vercel.app/${encoded}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg`;
};