import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddProduct } from "../hooks/useAddProduct";

export default function AddProductForm() {
  const { addProduct, isLoading } = useAddProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      imageFile: null,
      inStock: true,
    },
  });

  const [preview, setPreview] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const formData = watch();

  const onSubmit = (data) => {
    addProduct(data, {
      onSuccess: () => {
        reset();
        setPreview(null);
        setSuggestions([]);
      },
    });
  };

  const handleImage = (file) => {
    if (!file) return;
    setValue("imageFile", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerateDescription = () => {
    const base = `${formData.name || "This product"} in the ${
      formData.category || "item"
    } category`;

    setSuggestions([
      `${base}. Crafted with premium materials for durability.`,
      `${base}. A reliable and affordable everyday choice.`,
      `${base}. Designed for performance and long-term use.`,
    ]);
  };

  const selectSuggestion = (text) => {
    setValue("description", text, { shouldValidate: true });
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
      >
        {/* HEADER */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">
            ✨ Create New Product
          </h2>
          <p className="text-gray-400 text-sm">
            Fill in product details to list it in your store
          </p>
        </div>

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* NAME */}
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-300">Product Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              placeholder="e.g. iPhone 13 Pro"
              className={`mt-1 w-full p-3 rounded-xl bg-white/10 text-white border ${
                errors.name ? "border-red-400" : "border-white/20"
              } focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <select
              {...register("category", { required: "Select a category" })}
              className={`mt-1 w-full p-3 rounded-xl bg-white/10 text-white border ${
                errors.category ? "border-red-400" : "border-white/20"
              } focus:ring-2 focus:ring-green-500 outline-none`}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="phones">Phones</option>
              <option value="food">Food</option>
            </select>
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-300">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              placeholder="₦ 0.00"
              className={`mt-1 w-full p-3 rounded-xl bg-white/10 text-white border ${
                errors.price ? "border-red-400" : "border-white/20"
              } focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {errors.price && (
              <p className="text-red-400 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300">Description</label>
            <button
              type="button"
              onClick={handleGenerateDescription}
              className="text-xs bg-green-600 px-3 py-1 rounded-lg text-white hover:bg-green-700 transition"
            >
              ✨ AI Suggest
            </button>
          </div>

          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
            })}
            rows="4"
            placeholder="Write a short description..."
            className={`w-full p-3 rounded-xl bg-white/10 text-white border ${
              errors.description ? "border-red-400" : "border-white/20"
            } focus:ring-2 focus:ring-green-500 outline-none`}
          />

          {errors.description && (
            <p className="text-red-400 text-xs">{errors.description.message}</p>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto">
              <p className="text-xs text-gray-400">Suggestions:</p>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left text-sm text-white hover:bg-white/10 p-2 rounded-lg transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Product Image</label>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-green-500 transition cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-gray-400"
            >
              Click to upload or drag image
            </label>
          </div>

          {!watch("imageFile") && (
            <p className="text-red-400 text-xs">Product image is required</p>
          )}

          {preview && (
            <img
              src={preview}
              className="w-24 h-24 object-cover rounded-xl border border-white/20 mt-2"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold text-sm sm:text-base hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
        >
          {isLoading ? "Creating product..." : "🚀 Add Product"}
        </button>
      </form>
    </div>
  );
}
