import { useState } from "react";
import ProductCard from "./ProductCard";
import { useAllProducts } from "../hooks/useFecthProducts";
import Spinner from "../components/Spinner";

export default function ProductsSection() {
  const [cart, setCart] = useState([]);
  const { products, isLoading, error } = useAllProducts();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Top Products</h2>

        {!products && <Spinner />}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
