import React from "react";

export default function LoadingButton({
  isLoading,
  text = "Login",
  loadingText,
  className = "",
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 w-full cursor-pointer px-4 py-2 rounded bg-green-600 text-white disabled:opacity-70 ${className}`}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {isLoading ? loadingText : text}
    </button>
  );
}
