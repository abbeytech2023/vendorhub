import { useState } from "react";
import { useUploadProfileImage } from "../hooks/useUploadProfilePicture";

export default function ProfileImageUploader({ user }) {
  const [file, setFile] = useState(null);
  const { mutate, isPending } = useUploadProfileImage();

  const handleUpload = () => {
    if (!file || !user?.id) return;

    mutate({
      file,
      userId: user.id,
    });

    setFile(null);
  };

  return (
    <div className="space-y-4">
      {/* CURRENT IMAGE */}
      <div className="flex items-center gap-4">
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="text-sm text-gray-500">Current profile picture</div>
      </div>

      {/* PREVIEW NEW IMAGE */}
      {file && (
        <div>
          <p className="text-xs text-gray-400 mb-2">Preview:</p>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>
      )}

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={isPending}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Update Profile Picture"}
      </button>
    </div>
  );
}
