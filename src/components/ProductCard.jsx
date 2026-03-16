import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <Link to={`/details/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg"
        />

        <h3 className="font-semibold mt-3">{product.name}</h3>

        <p className="text-gray-500 text-sm">{product.vendor}</p>

        <p className="font-bold text-lg mt-1">₦{product.price}</p>
      </Link>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
