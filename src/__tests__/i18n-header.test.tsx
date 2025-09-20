import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Header i18n language switch', () => {
  test('switches from FR to EN and updates nav labels', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Initially in FR, the Menu label should be "Notre Carte"
    const frenchMenuLinks = await screen.findAllByRole('link', { name: /Notre Carte/i });
    expect(frenchMenuLinks.length).toBeGreaterThan(0);

    // Click EN button in header
    const enButton = screen.getAllByRole('button', { name: 'EN' })[0];
    fireEvent.click(enButton);

    // After switching language, the label should be "Menu"
    const englishMenuLinks = await screen.findAllByRole('link', { name: /^Menu$/i });
    expect(englishMenuLinks.length).toBeGreaterThan(0);
  });
});