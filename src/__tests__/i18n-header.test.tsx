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
    const frenchMenuLink = await screen.findByRole('link', { name: /Notre Carte/i });
    expect(frenchMenuLink).toBeInTheDocument();

    // Click EN button in header
    const enButton = screen.getAllByRole('button', { name: 'EN' })[0];
    fireEvent.click(enButton);

    // After switching language, the label should be "Menu"
    const englishMenuLink = await screen.findByRole('link', { name: /^Menu$/i });
    expect(englishMenuLink).toBeInTheDocument();
  });
});