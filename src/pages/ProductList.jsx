import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../hooks/useCartContext";
import { useAllProducts } from "../hooks/useFecthProducts";

export default function ProductListPage() {
  const { products = [] } = useAllProducts();
  const [cart, setCart] = useState([]);
  const { addToCart } = useCartContext();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart((prev) => [...prev, product]);
  };

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);

  const conditions = useMemo(() => {
    const conds = products.map((p) => p.condition).filter(Boolean);
    return ["All", ...new Set(conds)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        selectedCategory === "All" || p.category === selectedCategory;

      const conditionMatch =
        selectedCondition === "All" || p.condition === selectedCondition;

      return categoryMatch && conditionMatch;
    });
  }, [products, selectedCategory, selectedCondition]);

  // 🔥 FILTER MESSAGE
  const getFilterMessage = () => {
    if (selectedCategory === "All" && selectedCondition === "All") {
      return "Showing all products";
    }

    if (selectedCategory !== "All" && selectedCondition === "All") {
      return `Filtered by category: ${selectedCategory}`;
    }

    if (selectedCategory === "All" && selectedCondition !== "All") {
      return `Filtered by condition: ${selectedCondition}`;
    }

    return `Filtered by ${selectedCategory} • ${selectedCondition}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>

          <span className="text-gray-600 font-medium">
            Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border rounded-md bg-white text-gray-700"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border rounded-md bg-white text-gray-700"
        >
          {conditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 FILTER NOTE */}
      <div className="text-center mt-4 text-sm text-gray-600 font-medium">
        {getFilterMessage()}
      </div>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
