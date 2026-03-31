import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";
import { getUserProfile } from "../services/userService";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  console.log(user);

  return {
    isPending,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}

export function useUserProfileTable() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
}
