# API Guide

This template ships with a minimal API abstraction under `src/api/` to prepare for future backend integration while keeping the app functional in mock-only mode.

## Overview

- `src/api/client.ts` — Lightweight fetch client with timeout and optional base URL (`VITE_API_BASE_URL`).
- `src/api/schemas.ts` — Zod schemas and DTO types for request/response payloads.
- `src/api/reservations.ts` — Adapter that calls a backend if configured, or falls back to local mock services.

## Configuration

Environment variables (see `.env.example`):
- `VITE_API_BASE_URL` — Optional; when set, `ApiClient` targets this base URL for all requests.
- `VITE_PLAUSIBLE_DOMAIN` — Analytics domain (unrelated to API).

Example `.env`:
```
VITE_API_BASE_URL=https://api.example.com
VITE_PLAUSIBLE_DOMAIN=le-petit-bistro.example
```

## Endpoints (Reservation)

### POST /reservations

Create a reservation and receive an ID.

Request body (ReservationInputDTO):
```json
{
  "date": "2025-12-24",
  "time": "19:00",
  "guests": 4,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+33 6 00 00 00 00",
  "message": "Allergy: peanuts"
}
```

Validation (Zod):
- `date`: `YYYY-MM-DD`
- `time`: `HH:mm`
- `guests`: integer `1..10`
- `name`: non-empty string
- `email`: valid email
- `phone`: min length 6
- `message`: optional string

Response (ReservationResponseDTO):
```json
{ "id": "2025-12-24_1900" }
```

## Usage

```ts
import { createReservationApi } from '@/api/reservations';
import type { ReservationInputDTO } from '@/api/schemas';

const input: ReservationInputDTO = {
  date: '2025-12-24',
  time: '19:00',
  guests: 4,
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+33 6 00 00 00 00',
  message: 'Window seat please'
};

const res = await createReservationApi(input);
// res.id -> '2025-12-24_1900'
```

Notes:
- If `VITE_API_BASE_URL` is unset, `createReservationApi` falls back to local mock `src/services/reservationMock.ts` to keep the app functional without a backend.
- When a backend is provided, the same Zod schemas are used to validate payloads and responses.

## Error Handling

`ApiClient` throws:
- `Error('timeout')` when request exceeds configured timeout.
- `Error('http_XXX')` for non-OK responses (e.g., `http_500`).

`createReservationApi` may throw domain errors from mock:
- `'closed_day'` when the restaurant is closed.
- `'slot_full'` when the selected slot is fully booked.

## Future Enhancements

- Add OpenAPI spec and generate Zod schemas/types (e.g., `openapi-zod-client`).
- Add retry/backoff for transient failures.
- Add authentication headers when a backend requires auth.