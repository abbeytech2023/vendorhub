import { useState } from "react";
import { useUploadProfileImage } from "../hooks/useUploadProfilePicture";

export default function ProfileImageUploader({ user }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const { mutate, isPending } = useUploadProfileImage();

  const MAX_FILE_SIZE_KB = 400;

  const compressImage = (file, maxWidth = 600, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const scale = maxWidth / width;
          width = maxWidth;
          height = height * scale;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".jpg"),
              {
                type: "image/jpeg",
              },
            );

            resolve(compressedFile);
          },
          "image/jpeg",
          quality,
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (!selectedFile) return;

    const compressedFile = await compressImage(selectedFile);

    const compressedSizeKB = compressedFile.size / 1024;

    if (compressedSizeKB > MAX_FILE_SIZE_KB) {
      setError(
        `Compressed image is too large. Please choose an image smaller than ${MAX_FILE_SIZE_KB}KB.`,
      );
      setFile(null);
      return;
    }

    setFile(compressedFile);
  };

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
          <p className="text-xs text-gray-500 mt-1">
            Size: {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
      />

      <p className="text-xs text-gray-400">
        Maximum allowed image size: 500 KB
      </p>

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={isPending || !file}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Update Profile Picture"}
      </button>
    </div>
  );
}
