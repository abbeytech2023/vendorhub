import { useQuery } from "@tanstack/react-query";
import { getProductsByUser } from "../services/ProductService";

export function useUserProducts() {
  return useQuery({
    queryKey: ["user-products"],
    queryFn: getProductsByUser,
  });
}

import { getProductById } from "../services/ProductService";

export const useProductById = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // only runs if id exists
  });
};
