import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  // from Apps -- react-query
  const queryClient = useQueryClient();

  // use for EDIT
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn only pass one argument which is why use {}
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      // trigger the auto refresh when there're changes
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
