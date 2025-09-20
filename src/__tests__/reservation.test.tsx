import { getAvailableTimes, getBlockedServices } from '../services/reservationMock';

// Helper to find next Saturday ISO date
function nextWeekdayISO(target: number): string {
  const today = new Date();
  for (let i = 1; i <= 21; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === target) {
      return d.toISOString().split('T')[0];
    }
  }
  // fallback: today
  return today.toISOString().split('T')[0];
}

describe('Reservation service rules (mocked)', () => {
  test('Saturday dinner is blocked: no dinner times returned', () => {
    const saturdayISO = nextWeekdayISO(6); // 6 = Saturday
    const blocked = getBlockedServices(saturdayISO);
    expect(blocked).toContain('dinner');

    const slots = getAvailableTimes(saturdayISO);
    const hasDinner = slots.some((v) => v.startsWith('18') || v.startsWith('19') || v.startsWith('20') || v.startsWith('21') || v.startsWith('22'));
    expect(hasDinner).toBe(false);
  });
});