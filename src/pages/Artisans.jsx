import {
  Star,
  MapPin,
  BadgeCheck,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useVendors } from "../hooks/useVendors";

export default function ArtisansPage() {
  const { data: artisans = [], isLoading, error } = useVendors("artisan");

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find Trusted Service Providers
          </h1>

          <p className="mt-4 max-w-2xl text-green-100">
            Discover verified artisans and professionals near you. Book trusted
            electricians, plumbers, cleaners, mechanics, technicians and more.
          </p>

          {/* Search */}
          {/* <div className="mt-10 bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl">
            <div className="flex-1 flex items-center border rounded-xl px-4">
              <Search className="text-gray-400" size={20} />

              <input
                type="text"
                placeholder="Search service..."
                className="w-full p-3 outline-none text-gray-700"
              />
            </div>

            <div className="flex-1 flex items-center border rounded-xl px-4">
              <MapPin className="text-gray-400" size={20} />

              <input
                type="text"
                placeholder="Location"
                className="w-full p-3 outline-none text-gray-700"
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-white font-semibold transition">
              Search
            </button>
          </div> */}
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
        <div>
          {/* <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Service Providers
          </h2> */}

          <p className="text-gray-500 text-sm mt-1">
            {artisans.length} providers available
          </p>
        </div>

        <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-xl hover:bg-green-100 transition">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Providers Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-500">Loading service providers...</p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="text-center py-16">
            <p className="text-red-600 font-semibold">
              Unable to load service providers.
            </p>

            <p className="text-gray-500 mt-2">
              {error.message || "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && artisans.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>

            <h3 className="text-xl font-bold text-gray-800">
              No Service Providers Yet
            </h3>

            <p className="text-gray-500 mt-2">
              There are currently no registered artisans available. Please check
              back later.
            </p>
          </div>
        )}

        {/* Provider Cards */}
        {!isLoading && !error && artisans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
            {artisans.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Responsive Image */}
                <div className="w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={
                      provider.profilePicture ||
                      "https://placehold.co/600x450?text=Service+Provider"
                    }
                    alt={provider.fullName || "Service Provider"}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://placehold.co/600x450?text=Service+Provider";
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* Name and Verification */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 truncate">
                        {provider.fullName || "Unnamed Provider"}
                      </h3>

                      <p className="text-green-600 font-semibold mt-1 text-sm">
                        {provider.services
                          ? provider.services.charAt(0).toUpperCase() +
                            provider.services.slice(1)
                          : "Service Provider"}
                      </p>
                    </div>

                    {provider.verified && (
                      <BadgeCheck
                        className="text-green-600 shrink-0"
                        size={22}
                      />
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-500 mt-4 text-sm">
                    <MapPin size={16} className="mr-2 shrink-0" />

                    <span className="truncate">
                      {provider.localGovernment || "Location unavailable"}
                    </span>
                  </div>

                  {/* Rating and Jobs */}
                  <div className="flex justify-between items-center mt-4">
                    {provider.rating ? (
                      <div className="flex items-center">
                        <Star
                          className="fill-yellow-400 text-yellow-400 mr-1"
                          size={17}
                        />

                        <span className="font-medium text-sm">
                          {provider.rating}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        New Provider
                      </span>
                    )}

                    <span className="text-gray-500 text-xs sm:text-sm">
                      {provider.jobs || 0} Jobs
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-5">
                    <p className="text-xs text-gray-500">Starting From</p>

                    <h4 className="font-bold text-xl sm:text-2xl text-green-700">
                      {provider.price || "Contact for price"}
                    </h4>
                  </div>

                  {/* Button */}
                  <button className="w-full mt-auto pt-4">
                    <span className="block bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-sm transition">
                      Book Now
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
