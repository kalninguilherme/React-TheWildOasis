import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (booking_id) =>
      updateBooking(booking_id, {
        status: 'checked-in',
        is_paid: true,
      }),
    // Data is returned from the mutation function
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isCheckingIn };
}
