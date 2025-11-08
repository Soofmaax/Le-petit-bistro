import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SEO from '../components/SEO';

describe('SEO helpers', () => {
  test('sets description, robots, canonical and OG tags', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    const path = '/menu';

    render(
      <MemoryRouter initialEntries={[path]}>
        <SEO title={title} description={description} path={path} />
      </MemoryRouter>
    );

    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc?.getAttribute('content')).toBe(description);

    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toMatch(/index/);
    expect(robots?.getAttribute('content')).toMatch(/follow/);

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute('href')).toContain(path);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogTitle?.getAttribute('content')).toBe(title);
    expect(ogDesc?.getAttribute('content')).toBe(description);
    expect(ogType?.getAttribute('content')).toBe('website');

    // hreflang links should be added (fr/en + x-default)
    const altLinks = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'));
    const langs = altLinks.map((l) => l.getAttribute('hreflang'));
    expect(langs).toEqual(expect.arrayContaining(['fr', 'en', 'x-default']));
  });
});