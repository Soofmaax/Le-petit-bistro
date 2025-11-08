import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Accessibility - Header', () => {
  test('has no detectable a11y violations', async () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});