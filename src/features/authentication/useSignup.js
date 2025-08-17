import { useMutation } from "@tanstack/react-query";
import { Signup as SignupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: SignupApi,
    onSuccess: () => {
      toast.success(
        "New account successfully created!Please vertify the new account from user's email address!"
      );
    },
  });

  return { signup, isPending };
}
