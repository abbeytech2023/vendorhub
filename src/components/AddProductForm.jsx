import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "./LoadingButton";
import supabase from "../lib/supabaseClients";
import { descriptionSuggestions } from "../utility/descriptionSuggestions";

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [uploadError, setUploadError] = useState("");
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onSubmit = async (data) => {
    try {
      setUploadError("");
      let imageUrl = null;

      if (data.image[0]) {
        const file = data.image[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { publicUrl } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("products").insert([
        {
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      alert("Product added successfully!");
      reset();
      setSuggestions([]);
    } catch (error) {
      console.error(error);
      setUploadError(error.message);
    }
  };

  const handleAISuggestions = async () => {
    setSuggestionLoading(true);
    setSuggestions([]);

    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSuggestions(descriptionSuggestions);
    setSuggestionLoading(false);
  };

  const selectSuggestion = (text) => {
    setValue("description", text, { shouldValidate: true });
    setSuggestions([]); // close suggestion box after selection
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          {...register("name", { required: "Product name is required" })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description with AI Suggestions */}
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
            {suggestionLoading ? "Generating..." : "AI Suggestions"}
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="flex flex-col gap-2 mt-1 max-h-80 overflow-y-auto border rounded-md p-2 bg-gray-50">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectSuggestion(s)}
                className="text-left px-3 py-2 border rounded-md hover:bg-gray-100"
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

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Price is required", min: 0 })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Image */}
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
        {uploadError && (
          <p className="text-red-500 text-xs mt-1">{uploadError}</p>
        )}
      </div>

      {/* Submit Button */}
      <LoadingButton
        isLoading={isSubmitting}
        text="Add Product"
        loadingText="Adding..."
      />
    </form>
  );
}
