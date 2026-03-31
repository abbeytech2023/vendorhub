// hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/ProductService";

export const useAllProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
