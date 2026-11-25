import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "../services/reviewService";
import toast from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      toast.success("Review submitted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.vendor_id],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
}

import { useQuery } from "@tanstack/react-query";
import { getVendorReviews } from "../services/reviewService";

export function useVendorReviews(user_id) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", user_id],
    queryFn: () => getVendorReviews(user_id),
    enabled: !!user_id,
  });

  return {
    reviews,
    isLoading,
    error,
  };
}
