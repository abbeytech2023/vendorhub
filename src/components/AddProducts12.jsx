import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddProduct } from "../hooks/useAddProduct";
import { useUserProfileTable } from "../hooks/useUser";

export default function AddProductForm() {
  const { addProduct, isLoading } = useAddProduct();
  const { data: user } = useUserProfileTable();

  const storeName = user?.storeName;

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
      condition: "", // ✅ added
      imageFile: null,
      inStock: true,
      vendor: storeName,
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

  const handleImage = (file) => {
    if (!file) return;
    setValue("imageFile", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  };

  const selectSuggestion = (text) => {
    setValue("description", text, { shouldValidate: true });
    setSuggestions([]);
  };

  const inputStyle =
    "mt-1 w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500";

  const errorText = "text-red-400 text-xs mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
      >
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Create New Product
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Add product details to your store
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* NAME */}
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-300">Product Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              className={inputStyle}
              placeholder="e.g. iPhone 13 Pro"
            />
            {errors.name && <p className={errorText}>{errors.name.message}</p>}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <select
              {...register("category", { required: "Select category" })}
              className={inputStyle}
            >
              <option value="">Select</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Phones&Accessories">Phones & Accessories</option>
              <option value="Stationeries">Books & Stationery</option>
              <option value="Food">Food</option>
            </select>
            {errors.category && (
              <p className={errorText}>{errors.category.message}</p>
            )}
          </div>

          {/* CONDITION */}
          <div>
            <label className="text-sm text-gray-300">Condition</label>
            <select
              {...register("condition", {
                required: "Select product condition",
              })}
              className={inputStyle}
            >
              <option value="">Select condition</option>
              <option value="Brand-New">Brand New</option>
              <option value="Uk-Used">UK Used</option>
              <option value="Japa-Sales">Japa Sales</option>
            </select>

            {errors.condition && (
              <p className={errorText}>{errors.condition.message}</p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-300">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className={inputStyle}
              placeholder="₦0.00"
            />
            {errors.price && (
              <p className={errorText}>{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300">Description</label>

            <button
              type="button"
              onClick={handleGenerateDescription}
              className="text-xs bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700"
            >
              AI Suggest
            </button>
          </div>

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className={inputStyle}
            placeholder="Write product description..."
          />

          {errors.description && (
            <p className={errorText}>{errors.description.message}</p>
          )}

          {suggestions.length > 0 && (
            <div className="mt-3 space-y-2 bg-gray-800 border border-gray-700 p-3 rounded-xl">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left text-sm text-gray-200 hover:bg-gray-700 p-2 rounded-lg"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="text-sm text-gray-300">Product Image</label>

          <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-6 cursor-pointer hover:border-green-500">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            <p className="text-gray-400 text-sm">
              Click to upload product image
            </p>
          </label>

          {!watch("imageFile") && (
            <p className={errorText}>Product image is required</p>
          )}

          {preview && (
            <img
              src={preview}
              className="w-24 h-24 mt-3 rounded-xl object-cover border border-gray-700"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isLoading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-medium disabled:opacity-50 transition"
        >
          {isLoading ? "Creating..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
