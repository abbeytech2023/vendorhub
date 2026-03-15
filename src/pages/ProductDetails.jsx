import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { products } from "../hooks/useProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    setProduct(prod);
  }, [id]);

  if (!product)
    return <p className="text-center mt-20 text-gray-500">Product not found</p>;

  const handleAddToCart = () => addToCart(product);

  return (
    <section className="mt-15 flex flex-col gap-10 items-center justify-center max-w-6xl mx-auto p-6">
      {/* Go Back */}

      <div className="flex flex-col md:flex-row justify-center items-center gap-12  rounded-2xl shadow-lg p-6 md:p-10">
        {/* Product Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl max-h-[400px] object-contain shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-2 text-gray-500 text-sm">
              Sold by: {product.vendor}
            </p>

            <p className="mt-4 text-3xl font-extrabold text-red-600">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md transition transform hover:-translate-y-1"
            >
              Add to Cart
            </button>

            {/* <a
              href={`https://wa.me/${product.whatsapp.replace(
                /\D/g,
                "",
              )}?text=${encodeURIComponent(
                `Hello ${product.vendor}, I want to order 1 x ${product.name}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex justify-center items-center gap-2 border-2 border-green-500 text-green-500 font-semibold py-3 rounded-xl hover:bg-green-500 hover:text-white transition"
            >
              Buy Now on WhatsApp
            </a> */}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center cursor-pointer text-indigo-600 hover:text-indigo-800 font-semibold transition"
      >
        &larr; Go Back
      </button>
    </section>
  );
}
