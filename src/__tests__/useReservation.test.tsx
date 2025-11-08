import React from 'react';
import { render, screen } from '@testing-library/react';
import { useReservation } from '../hooks/useReservation';
import type { ReservationInputDTO } from '../api/schemas';
import { resetMockState } from '../services/reservationMock';

function nextWeekdayISO(targetDay: number) {
  const today = new Date();
  const diff = (targetDay + 7 - today.getDay()) % 7 || 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function TestComp({ input }: { input: ReservationInputDTO }) {
  const { status, error, last, submit } = useReservation();

  React.useEffect(() => {
    submit(input).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="error">{error || ''}</span>
      <span data-testid="id">{last?.id || ''}</span>
    </div>
  );
}

describe('useReservation hook', () => {
  test('successful reservation sets status=success and id', async () => {
    resetMockState();
    const input: ReservationInputDTO = {
      date: nextWeekdayISO(3), // next Wednesday
      time: '11:30',
      guests: 2,
      name: 'Alice',
      email: 'alice@example.com',
      phone: '0600000000',
      message: ''
    };
    render(<TestComp input={input} />);
    // wait for status success
    await screen.findByText('success', { selector: '[data-testid="status"]' });
    const id = screen.getByTestId('id').textContent;
    expect(id).toContain(input.date);
  });

  test('closed day returns error', async () => {
    resetMockState();
    const input: ReservationInputDTO = {
      date: nextWeekdayISO(2), // next Tuesday (closed)
      time: '11:30',
      guests: 2,
      name: 'Bob',
      email: 'bob@example.com',
      phone: '0600000000',
      message: ''
    };
    render(<TestComp input={input} />);
    await screen.findByText('error', { selector: '[data-testid="status"]' });
    const err = screen.getByTestId('error').textContent;
    expect(err).toBe('closed_day');
  });

  test('booking same slot twice returns slot_full', async () => {
    resetMockState();
    const date = nextWeekdayISO(3); // Wednesday
    const input: ReservationInputDTO = {
      date,
      time: '11:30',
      guests: 2,
      name: 'Carol',
      email: 'carol@example.com',
      phone: '0600000000',
      message: ''
    };
    // First render: success
    render(<TestComp input={input} />);
    await screen.findByText('success', { selector: '[data-testid="status"]' });

    // Second render: slot_full
    render(<TestComp input={input} />);
    await screen.findByText('error', { selector: '[data-testid="status"]' });
    const errs = screen.getAllByTestId('error');
    const lastErr = errs[errs.length - 1].textContent;
    expect(lastErr).toBe('slot_full');
  });
});