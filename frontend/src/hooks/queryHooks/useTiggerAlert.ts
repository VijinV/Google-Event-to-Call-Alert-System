import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const tiggerAlter = () => client.post("/reminder/trigger-reminder");

export const useTriggerAlert = () =>
  useMutation({
    mutationFn: tiggerAlter,
    onSuccess: () => {
      toast("Event reminder triggered successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });
