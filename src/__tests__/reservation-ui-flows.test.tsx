import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Reservation from '../components/Reservation';
import { vi } from 'vitest';

function nextWeekdayISO(target: number): string {
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === target) {
      return d.toISOString().split('T')[0];
    }
  }
  return today.toISOString().split('T')[0];
}

describe('Reservation UI flows', () => {
  test('resets selected time when switching to a date where it is unavailable', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Reservation />
      </I18nextProvider>
    );

    const saturday = nextWeekdayISO(6); // Saturday (both lunch and dinner)
    const sunday = nextWeekdayISO(0);   // Sunday (lunch only)

    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: saturday } });

    // pick a dinner time that exists on Saturday (e.g., 19:00)
    const timeSelect = await screen.findByLabelText(/heure|time/i) as HTMLSelectElement;
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    expect(timeSelect.value).toBe('19:00');

    // switch to Sunday (no dinner times)
    fireEvent.change(dateInput, { target: { value: sunday } });

    // parent effect should reset the time if not available anymore
    await waitFor(() => {
      expect((screen.getByLabelText(/heure|time/i) as HTMLSelectElement).value).toBe('');
    });
  });

  test('shows closed day error and disables time on Tuesday', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Reservation />
      </I18nextProvider>
    );

    const tuesday = nextWeekdayISO(2); // Tuesday closed
    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: tuesday } });

    const timeSelect = screen.getByLabelText(/heure|time/i) as HTMLSelectElement;
    expect(timeSelect.disabled).toBe(true);

    // error alert should be visible
    await screen.findByRole('alert');
  });

  test('second booking of the same slot shows slot_full error', async () => {
    vi.useFakeTimers();
    render(
      <I18nextProvider i18n={i18n}>
        <Reservation />
      </I18nextProvider>
    );

    // choose a normal weekday (e.g., Wednesday) not closed and not pre-blocked
    const wednesday = nextWeekdayISO(3);
    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: wednesday } });

    const timeSelect = await screen.findByLabelText(/heure|time/i) as HTMLSelectElement;
    fireEvent.change(timeSelect, { target: { value: '11:30' } });

    // fill minimal fields
    fireEvent.change(screen.getByPlaceholderText(/Votre nom|Your first/i), { target: { value: 'Jean Dupont' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email/i), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/06|33/i), { target: { value: '0600000000' } });

    // submit first time -> success screen
    fireEvent.click(screen.getByRole('button', { name: /confirmer|réserver|confirm/i }));

    // should show success title
    await screen.findByText(/confirmée|confirmed/i);

    // advance the 3s timer to reset back to form
    vi.runAllTimers();

    // Fill again with same slot
    fireEvent.change(dateInput, { target: { value: wednesday } });
    fireEvent.change(screen.getByLabelText(/heure|time/i), { target: { value: '11:30' } });
    fireEvent.change(screen.getByPlaceholderText(/Votre nom|Your first/i), { target: { value: 'Jean Dupont' } });
    fireEvent.change(screen.getByPlaceholderText(/you@email/i), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/06|33/i), { target: { value: '0600000000' } });

    fireEvent.click(screen.getByRole('button', { name: /confirmer|réserver|confirm/i }));

    // Should display slot full error
    await screen.findByRole('alert');
    expect(screen.getByText(/créneau.*complet|fully booked/i)).toBeTruthy();

    vi.useRealTimers();
  });
});