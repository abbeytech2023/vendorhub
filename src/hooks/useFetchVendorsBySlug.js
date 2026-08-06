import { useQuery } from "@tanstack/react-query";
import { fetchVendorsBySlug } from "../services/userService";

export function useFetchVendorBySlug(slug) {
  const {
    data: vendor,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vendor", slug],
    queryFn: () => fetchVendorsBySlug(slug),
    enabled: !!slug,
  });

  return {
    vendor,
    isLoading,
    error,
    isError,
    refetch,
  };
}
