import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Reservation from '../components/Reservation';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

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

    const friday = nextWeekdayISO(5); // Use Friday to ensure dinner times available
    const sunday = nextWeekdayISO(0);   // Sunday (lunch only)

    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: friday } });

    // wait for time options to populate and include a dinner time (e.g., 19:00)
    const timeSelect = await screen.findByLabelText(/heure|time/i) as HTMLSelectElement;
    await waitFor(() => {
      const options = Array.from(timeSelect.options).map((o) => o.value);
      expect(options).toContain('19:00');
    });

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

  test('second booking cannot choose the same time; it is removed from options', async () => {
    const { unmount } = render(
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

    // booking completes immediately in test mode; ensure success appears
    await screen.findByText(/confirmée|confirmed/i);

    // Unmount current instance, then render a new one (mock state persists across instances)
    unmount();

    render(
      <I18nextProvider i18n={i18n}>
        <Reservation />
      </I18nextProvider>
    );

    // Set same date again and check that previously booked time is no longer available
    const dateInput2 = await screen.findByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput2, { target: { value: wednesday } });
    const timeSelect2 = await screen.findByLabelText(/heure|time/i) as HTMLSelectElement;

    // previously booked '11:30' should no longer be in options
    const options2 = Array.from(timeSelect2.options).map((o) => o.value);
    expect(options2).not.toContain('11:30');

    // the select value should be empty (cannot choose the fully booked slot)
    expect(timeSelect2.value).toBe('');
  });
});