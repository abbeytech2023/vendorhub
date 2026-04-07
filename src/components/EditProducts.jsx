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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleStock = () => {
    setFormData((prev) => ({
      ...prev,
      inStock: !prev.inStock,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ ...formData });

    mutate(
      {
        id: product.id,
        updates: {
          ...formData,
          price: Number(formData.price),
        },
      },
      { onSuccess: onClose },
    );
  };

  if (!product) return null;

  const input =
    "w-full mt-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      {/* SIDE PANEL */}
      <div className="absolute inset-0 flex justify-end">
        <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[55%] h-full bg-gray-950 border-l border-white/10 flex flex-col text-white">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-gray-900">
            <h2 className="text-lg font-semibold">Edit Product</h2>

            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* IMAGE */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-xl border border-white/10"
                />
              )}

              {/* NAME */}
              <div>
                <label className="text-sm text-white/70">Product Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              {/* PRICE */}
              <div>
                <label className="text-sm text-white/70">Price (₦)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm text-white/70">Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={input}
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-white/70">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={input}
                />
              </div>

              {/* STOCK TOGGLE */}
              <div>
                <label className="text-sm text-white/70">Stock Status</label>

                <button
                  type="button"
                  onClick={toggleStock}
                  className={`mt-2 w-full flex items-center justify-between px-4 py-3 rounded-xl border transition
                    ${
                      formData.inStock
                        ? "bg-green-600/20 border-green-500 text-green-400"
                        : "bg-red-600/10 border-red-500 text-red-400"
                    }`}
                >
                  <span>{formData.inStock ? "In Stock" : "Out of Stock"}</span>

                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition
                      ${formData.inStock ? "bg-green-500" : "bg-red-500"}`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition
                        ${formData.inStock ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </div>
                </button>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-400 text-sm text-center">
                  {error.message}
                </p>
              )}
            </form>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/10 bg-gray-900 px-4 sm:px-6 py-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/10 border border-white/10"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
