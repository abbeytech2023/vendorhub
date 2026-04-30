import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useAllProducts } from "../hooks/useFecthProducts";
import Spinner from "../components/Spinner";

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");

  const { products = [], isLoading, error } = useAllProducts();

  // Categories & Conditions
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const conditions = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((p) => p.condition).filter(Boolean)),
    ];
  }, [products]);

  // Filter + Shuffle
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const categoryMatch =
        selectedCategory === "All" || p.category === selectedCategory;

      const conditionMatch =
        selectedCondition === "All" || p.condition === selectedCondition;

      return categoryMatch && conditionMatch;
    });

    // Shuffle (stable per filter change)
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [products, selectedCategory, selectedCondition]);

  // Filter message
  const getFilterMessage = () => {
    if (selectedCategory === "All" && selectedCondition === "All") {
      return "Showing all products";
    }

    if (selectedCategory !== "All" && selectedCondition === "All") {
      return `Showing ${selectedCategory} products`;
    }

    if (selectedCategory === "All" && selectedCondition !== "All") {
      return `Showing ${selectedCondition} items`;
    }

    return `Showing ${selectedCategory} • ${selectedCondition}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">Top Products</h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Condition */}
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {conditions.map((cond, i) => (
              <option key={i} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Message */}
        <div className="text-center text-gray-600 text-sm font-medium">
          {getFilterMessage()}
        </div>

        {/* Loading */}
        {isLoading && <Spinner />}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">Failed to load products</p>
        )}

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
