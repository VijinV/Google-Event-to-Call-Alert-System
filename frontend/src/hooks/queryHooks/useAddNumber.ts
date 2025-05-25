import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PhoneFormData } from "@/components/forms/schema";
import { client } from "@/lib/client";
import { toast } from "sonner";

const addNumber = (body: PhoneFormData) =>
  client.post("/user/update-phone-number", body);

export const useAddNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNumber,
    onSuccess: () => {
      toast("Number added successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
