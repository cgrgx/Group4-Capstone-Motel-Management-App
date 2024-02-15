import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setAdmin as setAdminAPI } from "../../services/apiAuth";

export function useSetAdmin() {
  const queryClient = useQueryClient();

  const { mutate: setAdmin, isLoading: isUpdating } = useMutation({
    mutationFn: setAdminAPI,
    onSuccess: () => {
      toast.success(" User successfully updated to admin");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { setAdmin, isUpdating };
}
