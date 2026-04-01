import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { priceFormat } from "../utility/priceFormat";

export default function ProductCard({ product }) {
  const { addToCart } = useCartContext();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image + Info */}
      <Link to={`/details/${product.id}`} className="flex-1 flex flex-col">
        {/* Image */}
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-1">
          <h3 className="text-sm sm:text-base font-semibold uppercase line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {product.vendor}
          </p>

          <p className="text-sm sm:text-base font-bold text-green-600">
            {priceFormat(product.price)}
          </p>
        </div>
      </Link>

      {/* Button */}
      <div className="p-3 pt-0">
        <button
          onClick={() => {
            addToCart(product);
            toast.success("Added To Cart");
          }}
          className="w-full bg-green-600 text-white text-sm sm:text-base py-2 rounded-xl hover:bg-green-700 active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
