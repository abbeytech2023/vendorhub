import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "./LoadingButton";
import supabase from "../lib/supabaseClients";
import { descriptionSuggestions } from "../utility/descriptionSuggestions";
import { useAddProduct } from "../hooks/useAddProduct";
import { addProduct } from "../services/ProductService";

export default function AddProductForm() {
  const { createProduct } = useAddProduct();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [uploadError, setUploadError] = useState("");
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // 🖼️ IMAGE PREVIEW STATE
  const [preview, setPreview] = useState(null);

  // watch image input
  const imageFile = watch("image");

  // generate preview safely
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  // SUBMIT HANDLER
  const onSubmit = async (name, price, description, file) => {
    console.log({ name, price, description, image: file });
  };

  // 🤖 AI SUGGESTIONS
  const handleAISuggestions = async () => {
    setSuggestionLoading(true);
    setSuggestions([]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setSuggestions(descriptionSuggestions);
    setSuggestionLoading(false);
  };

  // select suggestion
  const selectSuggestion = (text) => {
    setValue("description", text, { shouldValidate: true });
    setSuggestions([]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      {/* PRODUCT NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          {...register("name", {
            required: "Product name is required",
          })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* DESCRIPTION + AI */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>

        <div className="flex gap-2 mb-2">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />

          <button
            type="button"
            onClick={handleAISuggestions}
            disabled={suggestionLoading}
            className="bg-green-500 text-white px-3 py-1 rounded-md disabled:opacity-70"
          >
            {suggestionLoading ? "Generating..." : "AI"}
          </button>
        </div>

        {/* suggestions list */}
        {suggestions.length > 0 && (
          <div className="flex flex-col gap-2 border rounded-md p-2 bg-gray-50 max-h-60 overflow-y-auto">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectSuggestion(s)}
                className="text-left px-2 py-2 hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: 0,
          })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* IMAGE UPLOAD + PREVIEW */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="mt-1 block w-full text-sm"
        />

        {/* PREVIEW */}
        {preview && (
          <div className="mt-3 border rounded-md p-2 bg-gray-50">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        {/* ERROR */}
        {uploadError && (
          <p className="text-red-500 text-xs mt-1">{uploadError}</p>
        )}
      </div>

      {/* SUBMIT */}
      <LoadingButton
        isLoading={isSubmitting}
        text="Add Product"
        loadingText="Adding..."
      />
    </form>
  );
}
