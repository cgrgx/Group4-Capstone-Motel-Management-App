import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      updateBookingApi(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking successfully updated");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBooking, isUpdating };
}
