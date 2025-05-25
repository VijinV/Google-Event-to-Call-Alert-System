import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

const fetchMe = () => client.get("/auth/me").then((res) => res.data);

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    throwOnError: true,
  });
};
