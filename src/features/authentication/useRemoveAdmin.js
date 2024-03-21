import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeAdmin as removeAdminAPI } from "../../services/apiAuth";
import { getUsers } from "../../services/apiUsers";

export function useRemoveAdmin() {
  const queryClient = useQueryClient();
  const { mutate: removeAdmin, isLoading: isUpdating } = useMutation({
    mutationFn: removeAdminAPI,
    onSuccess: async (userId) => {
      await getUsers(); // Refresh user data after removeting admin
      toast.success("User successfully removed from admin role");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { removeAdmin, isUpdating };
}
