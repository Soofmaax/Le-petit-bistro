import { ApiClient } from './client';
import { ReservationInputSchema, ReservationResponseSchema, type ReservationInputDTO, type ReservationResponseDTO } from './schemas';
import { createReservation as mockCreate } from '../services/reservationMock';

/**
 * Reservation API abstraction.
 * - In production: point ApiClient to actual backend (VITE_API_BASE_URL)
 * - In development or when baseUrl is empty: fall back to local mock
 */
export async function createReservationApi(input: ReservationInputDTO, client = new ApiClient()): Promise<ReservationResponseDTO> {
  const parsed = ReservationInputSchema.parse(input);
  if (!import.meta.env.VITE_API_BASE_URL) {
    // No backend configured, use local mock
    const res = await mockCreate(parsed);
    return ReservationResponseSchema.parse(res);
  }
  return client.post('/reservations', parsed, ReservationResponseSchema);
}