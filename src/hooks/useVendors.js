import { useQuery } from "@tanstack/react-query";
import { getVendors } from "../services/userService";

import { useEffect, useState } from "react";
import { getVendorById } from "../services/userService";

// export function useVendors(role) {
//   return useQuery({
//     queryKey: ["vendors"],
//     queryFn: getVendors(role),
//     staleTime: 1000 * 60 * 5, // 5 minutes cache
//   });
// }

export function useVendors(role) {
  return useQuery({
    queryKey: ["vendors", role],
    queryFn: () => getVendors(role),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!role, // Only run if role is provided
  });
}

export const useVendor = (id) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVendor = async () => {
      try {
        setLoading(true);
        const data = await getVendorById(id);
        setVendor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  return { vendor, loading, error };
};
