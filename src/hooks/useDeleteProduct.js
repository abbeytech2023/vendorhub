import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/ProductService";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      toast.success("Product deleted successfully");

      // Refetch products list
      queryClient.invalidateQueries(["products"]);
    },

    onError: (err) => {
      toast.error(err.message || "Failed to delete product");
    },
  });
}
