import { useQuery } from "@tanstack/react-query";
import { getVendorRatings } from "../services/ratingService";

export function useVendorRatings() {
  const {
    data: ratings = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendor-ratings"],
    queryFn: getVendorRatings,
  });

  return {
    ratings,
    isLoading,
    error,
  };
}
