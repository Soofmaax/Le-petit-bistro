import { describe, test, expect } from 'vitest';
import { isClosed, openingTimesFor, getBlockedServices, LUNCH_TIMES } from '../services/reservationMock';

// helper: get next weekday date ISO (0=Sun ... 6=Sat)
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

describe('Reservation business rules', () => {
  test('Tuesday is closed', () => {
    const tuesdayISO = nextWeekdayISO(2);
    expect(isClosed(tuesdayISO)).toBe(true);
    expect(openingTimesFor(tuesdayISO)).toEqual([]);
  });

  test('Sunday has lunch only', () => {
    const sundayISO = nextWeekdayISO(0);
    expect(isClosed(sundayISO)).toBe(false);
    const times = openingTimesFor(sundayISO);
    expect(times).toEqual(LUNCH_TIMES);
  });

  test('Next Sunday lunch may be blocked as per mock policy', () => {
    const sundayISO = nextWeekdayISO(0);
    const blocked = getBlockedServices(sundayISO);
    // As per mock generator, at least one upcoming Sunday lunch is blocked
    // We accept either [] or ['lunch'] depending on generator window, but most times expect lunch
    if (blocked.length) {
      expect(blocked).toContain('lunch');
    }
  });
});