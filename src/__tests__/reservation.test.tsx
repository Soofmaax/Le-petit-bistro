import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Helper to find next Saturday ISO date
function nextWeekdayISO(target: number): string {
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === target) {
      return d.toISOString().split('T')[0];
    }
  }
  // fallback today
  return today.toISOString().split('T')[0];
}

describe('Reservation flow (mocked)', () => {
  test('Saturday dinner blocked: time select has no dinner slots', async () => {
    // Stabilise environment: FR language and reduced motion
    localStorage.setItem('lang', 'fr');
    localStorage.setItem('motion', 'reduce');
    document.documentElement.dataset.reduceMotion = 'true';
    document.documentElement.lang = 'fr';

    render(
      <MemoryRouter initialEntries={['/reservation']}>
        <App />
      </MemoryRouter>
    );

    const dateInput = await screen.findByLabelText(/date/i);
    const saturdayISO = nextWeekdayISO(6); // 6 = Saturday
    fireEvent.change(dateInput, { target: { value: saturdayISO } });

    // Open the time select
    const timeSelect = await screen.findByRole('combobox', { name: /heure|time/i });

    // Wait a tick for options to populate
    await waitFor(() => {
      const options = timeSelect.querySelectorAll('option');
      expect(options.length).toBeGreaterThan(1);
    });

    // Extract options
    const options = Array.from(timeSelect.querySelectorAll('option')).map((o) => o.value);
    // Dinner slots typically include 18:30, 19:00, 19:30 ...
    expect(options.some((v) => v.startsWith('18') || v.startsWith('19') || v.startsWith('20') || v.startsWith('21') || v.startsWith('22'))).toBeFalsy();
  });
});