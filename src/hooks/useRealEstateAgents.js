import { useQuery } from "@tanstack/react-query";
import { getRealEstateAgents } from "../services/agentsService";

export function useRealEstateAgents() {
  const {
    data: agents,
    isPending,
    error,
  } = useQuery({
    queryKey: ["real-estate-agents"],
    queryFn: getRealEstateAgents,
  });

  return {
    agents,
    isPending,
    error,
  };
}
