import { http, HttpResponse } from 'msw';
import { isClosed, openingTimesFor, getBlockedServices } from '../services/reservationMock';

type ReservationInput = {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
};

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
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

    // Closed day
    if (isClosed(body.date)) {
      return HttpResponse.json(
        { message: 'Ce jour est fermé (mardi).' },
        { status: 409 }
      );
    }

    // Opening hours check based on configured times
    const allowed = openingTimesFor(body.date);
    if (!allowed.includes(body.time)) {
      return HttpResponse.json(
        { message: "Heure indisponible. Merci de choisir un créneau d’ouverture." },
        { status: 409 }
      );
    }

    // Service blocks (weekend policy)
    const blocked = getBlockedServices(body.date);
    if (blocked.length) {
      const minutes = toMinutes(body.time);
      const wd = new Date(body.date + 'T00:00:00').getDay(); // 0 Sunday
      const isSunday = wd === 0;
      const inLunch = minutes <= (isSunday ? 15 * 60 : 14 * 60 + 30);
      const inDinner = !isSunday && minutes >= 18 * 60 + 30;
      if ((inLunch && blocked.includes('lunch')) || (inDinner && blocked.includes('dinner'))) {
        return HttpResponse.json(
          { message: 'Ce service est complet.' },
          { status: 409 }
        );
      }
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