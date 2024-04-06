import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewBooking as addNewBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useAddNewBooking() {
  const queryClient = useQueryClient();

  const { mutate: addNewBooking, isLoading: isAdding } = useMutation({
    mutationFn: (data) => {
      const { booking, selectedServices } = data;
      return addNewBookingApi(booking, selectedServices);
    },
    onSuccess: () => {
      toast.success("New Booking successfully added");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addNewBooking, isAdding };
}
