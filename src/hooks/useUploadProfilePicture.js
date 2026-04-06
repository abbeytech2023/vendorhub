import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage } from "../services/uploadProfilePicture";
import toast from "react-hot-toast";

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,

    onSuccess: (updatedUser) => {
      toast.success("Profile image updated!");

      // 🔥 Update cached user instantly
      queryClient.setQueryData(["user", updatedUser.id], updatedUser);

      // optional: refetch user list if needed
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err) => {
      toast.error(err.message || "Upload failed");
    },
  });
}
