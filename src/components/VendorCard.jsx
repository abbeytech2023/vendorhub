import { FaStore, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 w-full max-w-sm mx-auto">
      {/* Banner */}
      <div className="h-20 sm:h-24 bg-gradient-to-r from-green-400 to-green-600 relative">
        {/* Logo */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 sm:pt-12 pb-5 px-4 sm:px-6 text-center">
        {/* Store Name */}
        <h3 className="text-base uppercase sm:text-lg font-bold text-gray-800 truncate">
          {vendor.storeName}
        </h3>

        {/* Category */}
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          {vendor.category}
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 mt-2 sm:mt-3 text-yellow-500">
          <FaStar className="text-sm sm:text-base" />
          <span className="text-xs sm:text-sm text-gray-700">
            {vendor.rating}
          </span>
        </div>

        {/* Button */}
        <Link
          to={`/vendor/${vendor.id}`}
          className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-black transition"
        >
          <FaStore />
          Visit Store
        </Link>
      </div>
    </div>
  );
}
