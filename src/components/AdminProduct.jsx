// import { useProducts } from "../hooks/useFecthProducts";
import { useUserProducts } from "../hooks/useProduct";

export default function ProductList() {
  // const { products, isLoading, isError, error } = useProducts();
  const { data: products, isLoading, error } = useUserProducts();

  if (isLoading) {
    return (
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-2xl shadow p-4"
          >
            <div className="bg-gray-200 h-32 rounded-xl mb-3"></div>
            <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="flex items-center justify-center h-40 text-red-500">
  //       {error.message}
  //     </div>
  //   );
  // }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-gray-500">
        <p className="text-lg font-medium">No products yet</p>
        <p className="text-sm">Start by adding your first product 🚀</p>
      </div>
    );
  }

  return (
    <div className="p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="h-40 bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>

              <p className="text-xs text-gray-500 truncate">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-green-600 font-bold">
                  ₦{product.price}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.inStock
                      ? "bg-green-100 text-green-600"
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
