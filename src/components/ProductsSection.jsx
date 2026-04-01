import { useState } from "react";
import ProductCard from "./ProductCard";
import { useAllProducts } from "../hooks/useFecthProducts";
import Spinner from "../components/Spinner";

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, isLoading, error } = useAllProducts();

  // Extract categories
  const categories = ["All", ...new Set(products?.map((p) => p.category))];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products?.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Products</h2>

        {/* Select Dropdown */}
        <div className="flex justify-center mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading && <Spinner />}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">Failed to load products</p>
        )}

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
