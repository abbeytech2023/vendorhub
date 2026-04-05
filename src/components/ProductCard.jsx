import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { priceFormat } from "../utility/priceFormat";
import { useUserProfileTable } from "../hooks/useUser";

export default function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  // console.log(product);
  const { data } = useUserProfileTable();

  return (
    <div
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden ${
        !product.inStock ? "grayscale opacity-70" : ""
      }`}
    >
      {/* Product Image + Info */}
      <Link to={`/details/${product.id}`} className="flex-1 flex flex-col">
        {/* Image */}
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* STOCK BADGE */}
          <span
            className={`absolute top-2 right-2 text-[10px] sm:text-xs px-2 py-1 rounded-full font-bold ${
              product.inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-1">
          <h3 className="text-sm sm:text-base font-semibold uppercase line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm uppercase text-gray-500 truncate">
            {product.category}
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
            if (!product.inStock) return;
            addToCart(product);
            toast.success("Added To Cart");
          }}
          disabled={!product.inStock}
          className={`w-full text-sm sm:text-base py-2 rounded-xl transition ${
            product.inStock
              ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
