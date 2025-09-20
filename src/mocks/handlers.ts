import { http, HttpResponse } from 'msw';

type ReservationInput = {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

const isTuesday = (d: Date) => d.getDay() === 2; // 0=Sun ... 2=Tue
const isSunday = (d: Date) => d.getDay() === 0;

// compute next occurrences fully booked (example: next Wed and Fri)
function getFullyBookedDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  const addDays = (n: number) => {
    const dt = new Date(today);
    dt.setDate(dt.getDate() + n);
    return dt;
  };
  for (let i = 1; i <= 14; i++) {
    const d = addDays(i);
    const wd = d.getDay();
    if (wd === 3 || wd === 5) { // Wed or Fri
      dates.push(d.toISOString().split('T')[0]);
    }
  }
  return dates.slice(0, 2); // pick 2 dates within next two weeks
}

const fullyBooked = getFullyBookedDates();

// simple opening hours check (optional)
function isWithinOpeningHours(date: Date, time: string): boolean {
  const [h, m] = time.split(':').map(Number);
  const mins = h * 60 + m;
  if (isSunday(date)) {
    // 11:30 - 15:00
    return mins >= 11 * 60 + 30 && mins <= 15 * 60;
  }
  if (isTuesday(date)) return false; // closed
  // 11:30-14:30 or 18:30-22:30
  const lunch = mins >= 11 * 60 + 30 && mins <= 14 * 60 + 30;
  const diner = mins >= 18 * 60 + 30 && mins <= 22 * 60 + 30;
  return lunch || diner;
}

export const handlers = [
  // Mock POST /api/reservations
  http.post('/api/reservations', async ({ request }) => {
    const body = (await request.json()) as ReservationInput;

    if (!body.date || !body.time || !body.name || !body.email || !body.phone || !body.guests) {
      return HttpResponse.json(
        { message: 'Invalid payload' },
        { status: 400 }
      );
    }

    const dateObj = new Date(body.date + 'T00:00:00');
    if (Number.isNaN(dateObj.getTime())) {
      return HttpResponse.json({ message: 'Invalid date' }, { status: 400 });
    }

    // Closed day (Tuesday)
    if (isTuesday(dateObj)) {
      return HttpResponse.json(
        { message: 'Ce jour est fermé (mardi).' },
        { status: 409 }
      );
    }

    // Fully booked dates example
    if (fullyBooked.includes(body.date)) {
      return HttpResponse.json(
        { message: 'Désolé, cette date est complète.' },
        { status: 409 }
      );
    }

    // Opening hours check
    if (!isWithinOpeningHours(dateObj, body.time)) {
      return HttpResponse.json(
        { message: 'Heure indisponible. Merci de choisir un créneau d’ouverture.' },
        { status: 409 }
      );
    }

    // Simulate latency
    await new Promise((r) => setTimeout(r, 600));

    const id = Math.random().toString(36).slice(2);
    return HttpResponse.json(
      {
        id,
        ...body,
        status: 'confirmed'
      },
      { status: 201 }
    );
  })
];