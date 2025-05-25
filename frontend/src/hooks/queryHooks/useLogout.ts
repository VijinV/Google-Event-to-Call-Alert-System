import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logout: clientLogout } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: () => {
      console.log("logout");
      clientLogout();
      return Promise.resolve("sucess");
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
