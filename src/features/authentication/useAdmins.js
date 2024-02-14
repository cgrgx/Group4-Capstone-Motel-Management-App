import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/apiAdmins";
import { useUser } from "./useUser";

export function useAdmin(userId) {
  const {
    isLoading,
    data: isAdmin,
    error,
  } = useQuery({
    queryKey: ["admin", userId],
    queryFn: () => getAdmins(userId),
  });

  return { isLoading, isAdmin, error };
}
