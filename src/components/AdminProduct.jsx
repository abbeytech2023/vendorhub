import { useUserProducts } from "../hooks/useProduct";
import { priceFormat } from "../utility/priceFormat";

export default function ProductList() {
  const { data: products, isLoading } = useUserProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 p-3 sm:p-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-xl shadow p-3 sm:p-4"
          >
            <div className="bg-gray-200 h-28 sm:h-32 md:h-36 rounded-xl mb-3"></div>
            <div className="bg-gray-200 h-3 sm:h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-3 sm:h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-gray-500 text-center px-4">
        <p className="text-base sm:text-lg font-medium">No products yet</p>
        <p className="text-xs sm:text-sm">
          Start by adding your first product 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 lg:p-6 mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
        Your Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-28 sm:h-32 md:h-36 lg:h-40 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-2 sm:p-3">
              <h3 className="font-semibold text-xs sm:text-sm truncate">
                {product.name}
              </h3>

              <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-1">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-green-900 font-bold text-xs sm:text-sm">
                  {priceFormat(product.price)}
                </span>

                <span
                  className={`text-[10px] sm:text-xs px-1 py-1 rounded-full ${
                    product.inStock
                      ? "bg-green-100 text-green-900"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
