import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";

export function useCheckin() {
  const queryClient = useQueryClient();
  const moveBack = useMoveBack();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); // marked all currently active queries as “stale” so that they will be refetched the next time they are used.
      moveBack();
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });
  return { checkin, isCheckingIn };
}
