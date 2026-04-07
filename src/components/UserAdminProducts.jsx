import { priceFormat } from "../utility/priceFormat";

export default function UserAdminProducts({
  localProducts,
  setSelectedProduct,
  handleStockToggle,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {localProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => setSelectedProduct(product)}
          className={`group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-gray-700 transition ${
            !product.inStock ? "opacity-50 grayscale" : ""
          }`}
        >
          {/* IMAGE */}
          <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            {/* OUT OF STOCK OVERLAY */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-red-400 font-bold text-sm tracking-widest">
                  OUT OF STOCK
                </span>
              </div>
            )}

            {/* STOCK BADGE */}
            <div className="absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStockToggle(product.id);
                }}
                className={`text-[10px] px-2 py-1 rounded-full font-semibold transition ${
                  product.inStock
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
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
  );
}
