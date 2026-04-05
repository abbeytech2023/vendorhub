import { useUserProducts } from "../hooks/useProduct";
import { priceFormat } from "../utility/priceFormat";
import { useEffect, useState } from "react";
import EditProductModal from "./EditProducts";

export default function ProductList() {
  const { data: products, isLoading } = useUserProducts();
  const [localProducts, setLocalProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (products) setLocalProducts(products);
  }, [products]);

  const handleStockToggle = (id) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)),
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-900 border border-gray-800 rounded-2xl p-3"
          >
            <div className="h-36 bg-gray-800 rounded-xl mb-3"></div>
            <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!localProducts?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-gray-400 text-center px-4">
        <p className="text-lg font-semibold text-gray-200">No products yet</p>
        <p className="text-sm mt-1">Start by adding your first product 🚀</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Your Products
        </h2>

        <p className="text-sm text-gray-400">{localProducts.length} items</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {localProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-700 transition ${
              !product.inStock ? "opacity-60" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* STOCK BADGE */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStockToggle(product.id);
                  }}
                  className={`text-[10px] px-2 py-1 rounded-full font-semibold ${
                    product.inStock
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {product.inStock ? "In stock" : "Out"}
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-100 uppercase truncate">
                {product.name}
              </h3>

              <p className="text-xs text-gray-400 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-green-400 font-bold text-sm">
                  {priceFormat(product.price)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="text-xs px-3 py-1 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
