import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct, uploadProductImage } from "../services/ProductService";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserProfileTable } from "./useUser";

export const useAddProduct = () => {
  const { data, isLoading: isPending, error } = useUserProfileTable();

  const whatsapp = data?.whatsapp;
  const { user } = useAuthContext();

  const id = user?.id;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      // 1. Upload image first
      const imageUrl = await uploadProductImage(formData.imageFile);

      // 2. Build full product object
      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        image: imageUrl,
        inStock: true,
        uid: id,
        whatsapp,
      };

      // 3. Insert into DB
      return await addProduct(newProduct);
    },

    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  return {
    addProduct: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
