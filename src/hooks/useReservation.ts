import { useCallback, useState } from 'react';
import { createReservationApi } from '../api/reservations';
import type { ReservationInputDTO, ReservationResponseDTO } from '../api/schemas';

export type ReservationStatus = 'idle' | 'submitting' | 'success' | 'error';

export type UseReservationState = {
  status: ReservationStatus;
  error?: string;
  last?: ReservationResponseDTO | null;
};

export function useReservation() {
  const [state, setState] = useState<UseReservationState>({ status: 'idle', last: null });

  const submit = useCallback(async (input: ReservationInputDTO) => {
    setState({ status: 'submitting', last: null });
    try {
      const res = await createReservationApi(input);
      setState({ status: 'success', last: res });
      return res;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      setState({ status: 'error', error: msg, last: null });
      throw e;
    }
  }, []);

  return { ...state, submit };
}