import { useQuery } from "@tanstack/react-query";
import { getVendors } from "../services/userService";

export function useVendors() {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
