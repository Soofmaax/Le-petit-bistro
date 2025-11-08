export type ReservationInput = {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export type ServiceType = 'lunch' | 'dinner';

// Opening rules
// Closed on Tuesday. Sunday lunch only (<= 15:00). Mon-Sat 11:30-14:30 and 18:30-22:30
export const LUNCH_TIMES = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
export const DINNER_TIMES = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

function getWeekday(dateStr: string): number {
  // Parse using UTC to avoid timezone drift
  const [y, m, d] = dateStr.split('-').map(Number);
  const utc = Date.UTC(y, (m ?? 1) - 1, d);
  return new Date(utc).getUTCDay(); // 0 Sun ... 6 Sat
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

// Mock fully booked slots generator:
// - Next 2 Saturdays: dinner blocked
// - Next 1 Sunday: lunch blocked
function initFullyBooked(): Record<string, Set<string>> {
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

  let saturdayCount = 0;
  let sundayMarked = false;

  for (let i = 1; i <= 14 && (saturdayCount < 2 || !sundayMarked); i++) {
    const d = addDays(i);
    const day = d.getDay(); // 0 Sun, 6 Sat
    const key = fmt(d);
    if (day === 6 && saturdayCount < 2) {
      map[key] = map[key] || new Set<string>();
      DINNER_TIMES.forEach((t) => map[key].add(t)); // Block dinner
      saturdayCount++;
    } else if (day === 0 && !sundayMarked) {
      map[key] = map[key] || new Set<string>();
      LUNCH_TIMES.forEach((t) => map[key].add(t)); // Block lunch
      sundayMarked = true;
    }
  }
  return map;
}

let fullyBooked: Record<string, Set<string>> = initFullyBooked();

// Exposed for test isolation
export function resetMockState() {
  fullyBooked = initFullyBooked();
}

export function getServiceBlock(dateStr: string): ServiceType | null {
  const booked = fullyBooked[dateStr];
  if (!booked) return null;
  const lunchBlocked = LUNCH_TIMES.every((t) => booked.has(t));
  const dinnerBlocked = DINNER_TIMES.every((t) => booked.has(t));
  if (lunchBlocked) return 'lunch';
  if (dinnerBlocked) return 'dinner';
  return null;
}

// Backward-compatible helper returning an array of blocked services
export function getBlockedServices(dateStr: string): ServiceType[] {
  const block = getServiceBlock(dateStr);
  return block ? [block] : [];
}

export function getAvailableTimes(dateStr: string): string[] {
  if (!dateStr) return [];
  if (isClosed(dateStr)) return [];
  const base = openingTimesFor(dateStr);
  const booked = fullyBooked[dateStr];
  if (!booked) return base;
  return base.filter((t) => !booked.has(t));
}

export async function createReservation(input: ReservationInput): Promise<{ id: string }> {
  // Simulate latency (no delay in test mode to avoid timer flakiness)
  const delay = import.meta.env.MODE === 'test' ? 0 : 600;
  await new Promise((r) => setTimeout(r, delay));

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