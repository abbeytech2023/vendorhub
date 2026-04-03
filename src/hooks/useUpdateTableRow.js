import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRow } from "../services/ProductService";

export function useUpdateRow(table, queryKey) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateRow({ table, ...payload }),

    // 🔥 Optimistic update
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const previousData = queryClient.getQueryData([queryKey]);

      queryClient.setQueryData([queryKey], (old) =>
        old?.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );

      return { previousData };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData([queryKey], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
