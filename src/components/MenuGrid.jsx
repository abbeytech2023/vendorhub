import { MapPin, Star, BadgeCheck, Building2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function MenuGrid({ providers }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {providers?.map((provider) => (
        <Link
          to={`/artisan/${provider?.slug}`}
          key={provider.id}
          className="group bg-white rounded-3xl overflow-hidden border border-green-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-w-0"
        >
          {/* Responsive Image */}
          <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={provider.profilePicture}
              alt={provider.fullName || provider.storeName}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {provider.verified && (
              <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
                <BadgeCheck size={20} className="text-green-600" />
              </div>
            )}
          </div>

          {/* Artisan Details */}
          <div className="p-5 sm:p-6">
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 truncate">
              {provider?.storeName || provider?.fullName}
            </h3>

            <p className="text-green-700 font-semibold mt-1 truncate">
              {provider.services}
            </p>

            {/* Location */}
            <div className="flex items-center text-gray-500 text-sm mt-3">
              <MapPin size={16} className="mr-2 text-green-600 shrink-0" />

              <span className="truncate">
                {provider.localGovernment || "Location unavailable"}
              </span>
            </div>

            {/* Office Address */}
            <div className="flex items-start text-gray-500 text-sm mt-3">
              <Building2
                size={16}
                className="mr-2 mt-0.5 text-green-600 shrink-0"
              />

              <span className="line-clamp-2 break-words">
                {provider.officeAddress || "Office address not provided"}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-5">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400 mr-1"
              />

              <span className="font-medium">{provider.rating || "New"}</span>
            </div>

            {/* Book Now */}
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-300">
              Book Now
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
