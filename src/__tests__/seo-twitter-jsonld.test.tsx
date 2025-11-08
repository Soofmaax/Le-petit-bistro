import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SEO from '../components/SEO';

describe('SEO twitter metas and JSON-LD', () => {
  test('sets twitter metas and injects JSON-LD scripts', () => {
    const title = 'Title T';
    const description = 'Desc D';
    const path = '/about';
    const twitterSite = '@petitbistro';
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Le Petit Coin",
      "servesCuisine": "French"
    };

    render(
      <MemoryRouter initialEntries={[path]}>
        <SEO title={title} description={description} path={path} twitterSite={twitterSite} jsonLd={jsonLd} />
      </MemoryRouter>
    );

    const tcard = document.querySelector('meta[name="twitter:card"]');
    const ttitle = document.querySelector('meta[name="twitter:title"]');
    const tdesc = document.querySelector('meta[name="twitter:description"]');
    const tsite = document.querySelector('meta[name="twitter:site"]');

    expect(tcard?.getAttribute('content')).toBe('summary_large_image');
    expect(ttitle?.getAttribute('content')).toBe(title);
    expect(tdesc?.getAttribute('content')).toBe(description);
    expect(tsite?.getAttribute('content')).toBe(twitterSite);

    const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"][data-json-ld="true"]'));
    expect(ld.length).toBeGreaterThanOrEqual(1);
    expect(ld[0].textContent).toContain('"Restaurant"');
  });
});