import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateGuest,
    onSuccess: () => {
      toast.success("New Guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createGuest, isCreating };
}
