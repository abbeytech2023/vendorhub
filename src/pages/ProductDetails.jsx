import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProduct";
import { priceFormat } from "../utility/priceFormat";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import GoBackButton from "../components/GoBackButton";

export default function ProductDetails() {
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-600 text-lg">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 mt-12 py-4 flex items-center justify-between">
          <GoBackButton label="Back" />
          <div className="w-24" /> {/* balance spacer */}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="bg-green-50 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[420px] object-contain rounded-2xl"
            />
          </div>

          {/* DETAILS */}
          <div className="p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-3">
                {product.name}
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <p className="text-3xl font-bold text-red-600 mb-4">
                {priceFormat(product.price)}
              </p>

              <span
                className={`inline-block px-4 py-1 text-sm rounded-full font-medium ${
                  product.in_stock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart");
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
              >
                Add to Cart
              </button>

              <button className="flex-1 border border-green-600 text-green-700 hover:bg-green-50 py-3 rounded-xl font-semibold transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
