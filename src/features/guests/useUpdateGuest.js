import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateGuest } from "../../services/apiGuests";

export function useUpdateGuest() {
  const queryClient = useQueryClient();

  const { mutate: updateGuest, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newGuestData, id }) => createUpdateGuest(newGuestData, id),
    onSuccess: () => {
      toast.success("Guest successfully updated");
      queryClient.invalidateQueries({ queryKey: ["Guests"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateGuest, isUpdating };
}
