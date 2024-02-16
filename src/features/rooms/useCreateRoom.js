import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  const { mutate: createRoom, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateRoom,
    onSuccess: () => {
      toast.success("New Room successfully created");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createRoom, isCreating };
}
