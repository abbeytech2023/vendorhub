import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { priceFormat } from "../utility/priceFormat";

export default function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <Link to={`/details/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg"
        />

        <h3 className="uppercase font-semibold mt-3">{product.name}</h3>

        <p className="text-gray-500 text-sm">{product.vendor}</p>

        <p className="font-bold text-lg mt-1">{priceFormat(product.price)}</p>
      </Link>

      <button
        onClick={() => {
          addToCart(product);
          toast.success("Added To Cart");
        }}
        className="mt-3 w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
