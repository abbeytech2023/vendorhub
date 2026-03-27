import { useState } from "react";

export default function ProductGrid() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 13",
      price: 450000,
      image: "https://picsum.photos/200",
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: 380000,
      image: "https://picsum.photos/201",
      inStock: false,
    },
  ]);

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleStock = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)),
    );
  };

  return (
    <div className="p-4">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl p-4 shadow-md transition ${
                product.inStock ? "bg-white" : "bg-gray-100 grayscale"
              }`}
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-36 sm:h-40 object-cover rounded-lg ${
                  !product.inStock ? "opacity-70" : ""
                }`}
              />

              {/* Info */}
              <h3 className="mt-3 font-semibold text-base sm:text-lg">
                {product.name}
              </h3>

              <p className="text-red-600 font-bold text-sm sm:text-base">
                ₦{product.price.toLocaleString()}
              </p>

              {/* Status */}
              <p
                className={`text-xs sm:text-sm mt-1 font-medium ${
                  product.inStock ? "text-green-600" : "text-gray-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => toggleStock(product.id)}
                  className={`w-full py-2 rounded-lg text-white text-sm ${
                    product.inStock
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {product.inStock ? "Out of Stock" : "Restock"}
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="w-full py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
