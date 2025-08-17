import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  // from Apps -- react-query
  const queryClient = useQueryClient();

  // use for EDIT
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);

      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
