import { render, screen, fireEvent } from '@testing-library/react';
import ReservationForm, { ReservationFormValues } from '../components/reservation/ReservationForm';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

function renderForm(overrides?: Partial<React.ComponentProps<typeof ReservationForm>>) {
  const defaultValues: ReservationFormValues = {
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const props: React.ComponentProps<typeof ReservationForm> = {
    times: ['11:30', '12:00'],
    blockedBadges: [],
    defaultValues,
    minDate: new Date().toISOString().split('T')[0],
    isClosed: false,
    error: '',
    onSubmit: vi.fn(),
    onDateChange: vi.fn(),
    ...overrides
  };

  const utils = render(
    <I18nextProvider i18n={i18n}>
      <ReservationForm {...props} />
    </I18nextProvider>
  );
  return { ...utils, props };
}

describe('ReservationForm validation (zod + RHF)', () => {
  test('does not submit when required fields are missing', async () => {
    const { props } = renderForm();
    const submitBtn = screen.getByRole('button', { name: /réserver|confirm/i });
    fireEvent.click(submitBtn);
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  test('rejects invalid email and does not submit', async () => {
    const today = new Date().toISOString().split('T')[0];
    const { props } = renderForm({
      defaultValues: {
        date: today,
        time: '11:30',
        guests: '2',
        name: 'John Doe',
        email: 'not-an-email',
        phone: '0600000000',
        message: ''
      }
    });
    const submitBtn = screen.getByRole('button', { name: /réserver|confirm/i });
    fireEvent.click(submitBtn);
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  test('submits with minimal valid values', async () => {
    const today = new Date().toISOString().split('T')[0];
    const { props } = renderForm({
      defaultValues: {
        date: today,
        time: '11:30',
        guests: '2',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0600000000',
        message: ''
      }
    });

    const submitBtn = screen.getByRole('button', { name: /réserver|confirm/i });
    fireEvent.click(submitBtn);

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    const mock = props.onSubmit as unknown as Mock;
    const arg = mock.mock.calls[0][0] as ReservationFormValues;
    expect(arg.date).toBe(today);
    expect(arg.time).toBe('11:30');
  });

  test('disables time selection when day is closed', () => {
    renderForm({ isClosed: true });
    const timeSelect = screen.getByLabelText(/heure|time/i) as HTMLSelectElement;
    expect(timeSelect.disabled).toBe(true);
  });
});