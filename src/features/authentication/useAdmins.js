import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/apiAdmins";
import { useUser } from "./useUser";

export function useAdmin() {
  const { user } = useUser();
  const userId = user?.id;
  const {
    isLoading,
    data: isAdmin,
    error,
  } = useQuery({
    queryKey: ["admin", userId],
    queryFn: () => getAdmins(userId),
    enabled: !!userId,
  });

  return { isLoading, isAdmin, error };
}
