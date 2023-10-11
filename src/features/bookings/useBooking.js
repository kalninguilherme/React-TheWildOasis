import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
  const { booking_id } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', booking_id],
    queryFn: () => getBooking(booking_id),
    retry: false,
  });

  return { isLoading, error, booking };
}
