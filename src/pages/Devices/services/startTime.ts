import {useMutation, useQueryClient} from "@tanstack/react-query";
import catchAndNotifyErrors from "../../../shared/helpers/catchAndNotifyErrors";
import useDevicesAPIs from "../api";

export default function useStartTime(id: string) {
  const {startTime} = useDevicesAPIs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => startTime(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ["devices"]});
    },
    onError: catchAndNotifyErrors,
  });
}
