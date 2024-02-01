import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export function useRooms() {
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  console.log("rooms", rooms);

  return { isLoading, rooms, error };
}
