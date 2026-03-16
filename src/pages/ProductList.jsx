import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../hooks/useCartContext";
import { products } from "../hooks/useProduct";

export default function ProductListPage() {
  const [cart, setCart] = useState([]);
  const { addToCart } = useCartContext();
  // Example products (10+)

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart([...cart, product]);
    console.log("Cart:", [...cart, product]);
  };

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

      {/* Products Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
