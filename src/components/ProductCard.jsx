// import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";

// export default function ProductCard({ product, onAddToCart }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden flex flex-col">
//       {/* Product Image */}
//       <div className="relative overflow-hidden rounded-t-3xl">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
//         />

//         {/* Vendor Badge */}
//         <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
//           {/* {product.vendor} */}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-1">
//         {/* Product Name */}
//         <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
//           {product.name}
//         </h3>

//         {/* Price */}
//         <p className="text-green-600 font-bold text-lg mb-3">
//           ₦{product.price}
//         </p>

//         {/* Add to Cart Button */}
//         <button
//           onClick={() => onAddToCart(product)}
//           className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition"
//         >
//           <FaShoppingCart />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Link
      to={`/details/${product.id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-3">{product.name}</h3>

      <p className="text-gray-500 text-sm">{product.vendor}</p>

      <p className="font-bold text-lg mt-1">₦{product.price}</p>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Add to Cart
      </button>
    </Link>
  );
}
