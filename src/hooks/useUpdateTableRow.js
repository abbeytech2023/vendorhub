import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRow } from "../services/ProductService";
import toast from "react-hot-toast";

export function useUpdateRow({ table, queryKey }) {
  const queryClient = useQueryClient();

  return useMutation({
    // 🔹 API call
    mutationFn: async ({ id, updates }) => {
      if (!id) throw new Error("ID is required");

      return await updateRow({
        table,
        id,
        updates,
      });
    },

    // 🔥 Optimistic update
    onMutate: async ({ id, updates }) => {
      // Optional: loading toast
      toast.loading("Updating...", { id: "update-row" });

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        if (Array.isArray(oldData)) {
          return oldData.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          );
        }

        if (oldData.id === id) {
          return { ...oldData, ...updates };
        }

        return oldData;
      });

      return { previousData };
    },

    // ❌ Error
    onError: (error, variables, context) => {
      console.error("Update failed:", error);

      // Rollback
      if (context?.previousData !== undefined) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      // ❌ Error toast
      toast.error(error.message || "Update failed", {
        id: "update-row",
      });
    },

    // ✅ Success
    onSuccess: () => {
      toast.success("Updated successfully 🎉", {
        id: "update-row",
      });
    },

    // 🔄 Final sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
