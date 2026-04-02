import { useState } from "react";
import { useAddProduct } from "../hooks/useAddProduct";

export default function AddProductForm() {
  const { addProduct, isLoading } = useAddProduct();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null,
    inStock: true,
  });

  const [preview, setPreview] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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

    addProduct(form, {
      onSuccess: () => {
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          imageFile: null,
          inStock: true,
        });
        setPreview(null);
        setSuggestions([]);
      },
    });
  };

  const handleImage = (file) => {
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  // ✅ FIXED AI DESCRIPTION GENERATOR
  const handleGenerateDescription = () => {
    const productName = form.name || "This product";
    const category = form.category || "item";

    const base = `${productName} in the ${category} category`;

    const list = [
      `${base}. Crafted with premium materials for long-lasting durability and everyday reliability.`,
      `${base}. A budget-friendly yet high-quality choice designed for comfort, style, and daily use.`,
      `${base}. Built for performance and durability, making it a smart choice for long-term value.`,
      `${base}. Designed with a modern finish, combining elegance, efficiency, and practicality.`,
      `${base}. Offers excellent value with trusted quality and smooth user experience.`,
      `${base}. Perfect balance of affordability, quality, and performance for smart shoppers.`,
      `${base}. Made to deliver comfort, convenience, and reliability in every use.`,
      `${base}. Premium finish with attention to detail, standing out in its category.`,

      `${base}. Engineered for strength, durability, and consistent performance.`,
      `${base}. A reliable choice for everyday use with long-lasting quality.`,
      `${base}. Stylish design meets practical functionality for modern users.`,
      `${base}. Built with precision to ensure smooth and efficient performance.`,
      `${base}. A great option for users who value both quality and affordability.`,
      `${base}. Designed to enhance convenience and everyday productivity.`,
      `${base}. Strong build quality with a clean and modern aesthetic.`,
      `${base}. Perfectly suited for daily tasks with reliable performance.`,

      `${base}. High-quality construction ensures long-term usability and satisfaction.`,
      `${base}. A smart investment for users seeking durability and style.`,
      `${base}. Lightweight design with strong performance and efficiency.`,
      `${base}. Made for comfort, ease of use, and everyday reliability.`,
      `${base}. Combines modern design with practical everyday functionality.`,
      `${base}. Offers smooth performance with a premium feel.`,
      `${base}. Durable build designed for long-term daily use.`,
      `${base}. A trusted choice for quality-conscious buyers.`,

      `${base}. Designed for efficiency, comfort, and modern living.`,
      `${base}. Provides excellent usability with strong build quality.`,
      `${base}. A dependable product built for everyday challenges.`,
      `${base}. Sleek and durable design made for modern users.`,
      `${base}. Offers a perfect blend of performance and affordability.`,
      `${base}. Crafted for users who expect reliable daily performance.`,
      `${base}. Built to withstand daily use with ease and efficiency.`,
      `${base}. A practical solution for modern lifestyle needs.`,

      `${base}. Designed for smooth operation and long-term durability.`,
      `${base}. High-performance product with excellent finishing quality.`,
      `${base}. A stylish yet functional choice for everyday tasks.`,
      `${base}. Built with attention to detail for premium experience.`,
      `${base}. Offers durability and comfort in every use.`,
      `${base}. Made for users who prioritize quality and efficiency.`,
      `${base}. A balanced product combining style and performance.`,
      `${base}. Designed to deliver consistent and reliable results.`,

      `${base}. Strong and durable design for everyday reliability.`,
      `${base}. Provides excellent value for money and long-term use.`,
      `${base}. A modern solution built for convenience and performance.`,
      `${base}. Crafted to meet daily needs with ease and efficiency.`,
      `${base}. Durable, stylish, and designed for everyday excellence.`,
      `${base}. Built for users who want reliability and simplicity.`,
      `${base}. A premium-quality product designed for modern lifestyles.`,
      `${base}. Ensures comfort, durability, and consistent performance.`,
      `${base}. A top-tier choice for everyday usability and value.`,
    ];

    setSuggestions(list);
  };

  const selectSuggestion = (text) => {
    setForm((prev) => ({ ...prev, description: text }));
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 sm:p-8 space-y-6"
      >
        {/* HEADER */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            ✨ Create New Product
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm">
            Add product details to your VendorHub store
          </p>
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <select
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="text-black">
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="p-3 sm:col-span-2 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
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
              className="text-xs bg-green-600 px-3 py-1 rounded-lg text-white hover:bg-green-700 transition"
            >
              ✨ AI Suggest
            </button>
          </div>

          <textarea
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Product description..."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          {/* AI SUGGESTIONS */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-300">Choose a description:</p>

              {suggestions.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectSuggestion(item)}
                  className="w-full text-left p-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-3">
          <label className="text-white font-medium">📸 Product Image</label>

          <input
            type="file"
            accept="image/*"
            className="w-full text-white text-sm"
            onChange={(e) => handleImage(e.target.files[0])}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-28 h-28 object-cover rounded-xl border border-white/20"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-800 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Creating product..." : "🚀 Add Product"}
        </button>
      </form>
    </div>
  );
}
