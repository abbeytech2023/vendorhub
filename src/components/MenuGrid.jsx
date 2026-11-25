import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, BadgeCheck, ArrowRight } from "lucide-react";

import { useVendorRatings } from "../hooks/useRatingService";

export default function MenuGrid({ providers = [] }) {
  const { ratings, isLoading } = useVendorRatings();

  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-end justify-between gap-4 mb-7 sm:mb-9">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-1 bg-green-600 rounded-full"></span>
              <span className="text-green-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                Find a professional
              </span>
            </div>

            <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-md">
              Discover skilled professionals ready to get the job done.
            </p>
          </div>

          <Link
            to="/artisans"
            className="shrink-0 inline-flex items-center gap-1.5 text-green-700 hover:text-green-800 font-bold text-sm transition-colors"
          >
            <span className="hidden sm:inline">View All Artisans</span>
            <span className="sm:hidden">View All</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Artisan Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {providers.slice(0, 8).map((provider) => {
            const vendor_rating = ratings[provider.id];

            return (
              <Link
                to={`/artisan/${provider?.slug}`}
                key={provider.id}
                className="group flex flex-col min-w-0 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={provider.profilePicture}
                    alt={provider.storeName || provider.fullName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {provider.verified && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                      <BadgeCheck size={17} className="text-green-600" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">
                    {provider.storeName || provider.fullName}
                  </h3>

                  <p className="text-green-700 text-xs sm:text-sm font-medium mt-1 line-clamp-1">
                    {provider.services}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-xs min-w-0">
                    <MapPin size={14} className="shrink-0 text-green-600" />

                    <span className="truncate">
                      {provider.localGovernment || "Location unavailable"}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400 shrink-0"
                    />

                    {isLoading ? (
                      <span className="text-xs text-gray-400">Loading...</span>
                    ) : vendor_rating ? (
                      <>
                        <span className="text-xs font-bold text-gray-800">
                          {vendor_rating.average}
                        </span>

                        <span className="text-xs text-gray-400">
                          ({vendor_rating.count})
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">New</span>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-auto pt-3">
                    <div className="w-full text-center bg-green-50 group-hover:bg-green-600 text-green-700 group-hover:text-white py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors">
                      View Profile
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom View All */}
        {providers.length > 4 && (
          <div className="mt-7 text-center sm:hidden">
            <Link
              to="/artisans"
              className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors"
            >
              Explore All Artisans
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
