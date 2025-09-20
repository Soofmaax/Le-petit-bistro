export type ReservationInput = {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

// Opening rules
// Closed on Tuesday. Sunday lunch only (<= 15:00). Mon-Sat 11:30-14:30 and 18:30-22:30
const LUNCH_TIMES = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
const DINNER_TIMES = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

function getWeekday(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d).getDay(); // 0 Sun ... 6 Sat
}

export function isClosed(dateStr: string): boolean {
  const wd = getWeekday(dateStr);
  return wd === 2; // Tuesday closed
}

export function openingTimesFor(dateStr: string): string[] {
  const wd = getWeekday(dateStr);
  if (wd === 2) return []; // closed
  if (wd === 0) return LUNCH_TIMES; // Sunday lunch only
  return [...LUNCH_TIMES, ...DINNER_TIMES];
}

// Mock fully booked slots: some upcoming days/times unavailable
// Example: next Friday 19:30 full, next Wednesday dinner full
const fullyBooked: Record<string, Set<string>> = (() => {
  const map: Record<string, Set<string>> = {};
  const today = new Date();
  function addDays(n: number) {
    const d = new Date(today);
    d.setDate(today.getDate() + n);
    return d;
  }
  function fmt(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  // Next Wednesday: dinner fully booked
  for (let i = 1; i <= 14; i++) {
    const d = addDays(i);
    if (d.getDay() === 3) {
      const key = fmt(d);
      map[key] = new Set(DINNER_TIMES);
      break;
    }
  }
  // Next Friday: 19:30 booked
  for (let i = 1; i <= 14; i++) {
    const d = addDays(i);
    if (d.getDay() === 5) {
      const key = fmt(d);
      map[key] = map[key] || new Set();
      map[key].add('19:30');
      break;
    }
  }
  return map;
})();

export function getAvailableTimes(dateStr: string): string[] {
  if (!dateStr) return [];
  if (isClosed(dateStr)) return [];
  const base = openingTimesFor(dateStr);
  const booked = fullyBooked[dateStr];
  if (!booked) return base;
  return base.filter((t) => !booked.has(t));
}

export async function createReservation(input: ReservationInput): Promise<{ id: string }> {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 600));

  if (isClosed(input.date)) {
    throw new Error('closed_day');
  }
  const booked = fullyBooked[input.date];
  if (booked && booked.has(input.time)) {
    throw new Error('slot_full');
  }

  // Mark slot as booked (simple capacity 1 for demo)
  if (!fullyBooked[input.date]) {
    fullyBooked[input.date] = new Set();
  }
  fullyBooked[input.date].add(input.time);

  // Return fake id
  return { id: `${input.date}_${input.time.replace(':', '')}` };
}