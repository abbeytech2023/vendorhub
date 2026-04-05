import { useEffect, useState } from "react";
import { useUpdateRow } from "../hooks/useUpdateTableRow";

export default function EditProductModal({ product, onClose }) {
  const { mutate, isPending, error } = useUpdateRow({
    table: "products",
    queryKey: ["products"],
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
  });

  // 🔹 Fill form when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        inStock: product.inStock ?? true,
      });
    }
  }, [product]);

  // 🔹 Lock scroll when modal opens
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        id: product.id,
        updates: {
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          description: formData.description,
          inStock: formData.inStock,
        },
      },
      {
        onSuccess: () => {
          onClose(); // close modal after success
        },
      },
    );
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-white max-h-[90vh] overflow-y-auto">
          <div className="p-6 sm:p-8 space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">✏️ Edit Product</h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Image */}
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover rounded-xl border border-white/20"
              />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-white/70">Product Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-sm text-white/70">Price (₦)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-white/70">Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-white/70">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="input resize-none"
                />
              </div>

              {/* In Stock */}
              <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                <span className="text-sm">In Stock</span>

                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2 rounded-xl bg-white/10 border border-white/20"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {isPending ? "Updating..." : "Save"}
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm text-center">
                  {error.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* styles */}
        <style jsx>{`
          .input {
            width: 100%;
            margin-top: 4px;
            padding: 10px 14px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            outline: none;
          }

          .input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
}
