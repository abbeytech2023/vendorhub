import { useState } from "react";
import { useAddProduct } from "../hooks/useAddProduct";
import { descriptionSuggestions } from "../utility/descriptionSuggestions";

export default function AddProductForm() {
  const { addProduct, isLoading } = useAddProduct();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    // quantity: "",
    imageFile: null,
    inStock: true,
  });

  const [preview, setPreview] = useState(null);

  const categories = [
    { value: "", label: "Select Category" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "phones", label: "Phones & Accessories" },
    { value: "food", label: "Food" },
    { value: "home", label: "Home & Living" },
    { value: "beauty", label: "Beauty" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);

    // addProduct(form);

    addProduct(form, {
      onSuccess: () => {
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          imageFile: null,
        });
      },
    });
  };

  const handleImage = (file) => {
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleGenerateDescription = () => {
    const text = descriptionSuggestions(form);
    setForm((prev) => ({ ...prev, description: text }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            ✨ Create New Product
          </h2>
          <p className="text-gray-300 text-sm">
            Add product details to your VendorHub store
          </p>
        </div>

        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <select
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {categories.map((cat) => (
              <option
                className="text-gray-900"
                key={cat.value}
                value={cat.value}
              >
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-white font-medium">Description</label>

            <button
              type="button"
              onClick={handleGenerateDescription}
              className="text-xs bg-purple-600 px-3 py-1 rounded-lg text-white hover:bg-purple-700 transition"
            >
              ✨ AI Suggest
            </button>
          </div>

          <textarea
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Product description..."
            rows="4"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <label className="text-white font-medium">📸 Product Image</label>

          <input
            type="file"
            accept="image/*"
            className="w-full text-white"
            onChange={(e) => handleImage(e.target.files[0])}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-xl border border-white/20 shadow-lg"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isLoading}
          className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Creating product..." : "🚀 Add Product"}
        </button>
      </form>
    </div>
  );
}
