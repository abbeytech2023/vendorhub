import { useUserProducts } from "../hooks/useProduct";
import { useEffect, useState } from "react";
import EditProductModal from "./EditProducts";
import UserAdminProducts from "./UserAdminProducts";

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
      <UserAdminProducts
        localProducts={localProducts}
        handleStockToggle={handleStockToggle}
        setSelectedProduct={setSelectedProduct}
      />

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
