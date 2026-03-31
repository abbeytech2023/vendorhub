import { useQuery } from "@tanstack/react-query";
import { getProductsByUser } from "../services/ProductService";

export function useUserProducts() {
  return useQuery({
    queryKey: ["user-products"],
    queryFn: getProductsByUser,
  });
}
