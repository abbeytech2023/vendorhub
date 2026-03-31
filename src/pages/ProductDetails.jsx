// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProduct";
import { priceFormat } from "../utility/priceFormat";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductById(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-green-600 text-lg">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-500">{error.message}</div>
    );

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Image Section */}
        <div className="bg-green-100 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl object-cover w-full max-h-[400px]"
          />
        </div>

        {/* Details Section */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="uppercase text-3xl font-bold text-green-800 mb-3">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-red-900 mb-2">
              {priceFormat(product.price)}
            </p>

            <span
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                product.in_stock
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => {
                addToCart(product);
                toast.success("added To cart");
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Add to Cart
            </button>

            <button className="flex-1 border border-green-600 text-green-700 hover:bg-green-100 py-3 rounded-xl font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
