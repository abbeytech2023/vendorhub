import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../hooks/useCartContext";
import { useAllProducts } from "../hooks/useFecthProducts";

export default function ProductListPage() {
  const { products = [] } = useAllProducts();
  const [cart, setCart] = useState([]);
  const { addToCart } = useCartContext();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart((prev) => [...prev, product]);
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="py-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>

          <span className="text-gray-600 font-medium">
            Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      {/* Category Select Box */}
      {/* Category Select Box */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
