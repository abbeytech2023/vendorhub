import React from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";

import MenuGrid from "../components/MenuGrid";
import { useVendors } from "../hooks/useVendors";

export default function ServiceProvider() {
  const { data: artisans = [], isLoading, error } = useVendors("artisan");

  if (isLoading) {
    return (
      <section className="w-full py-12 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={32} />
        <p className="text-gray-500 text-sm mt-3">Loading artisans...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-10 text-center px-4">
        <p className="text-red-500 text-sm">
          Unable to load artisans. Please try again.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Heading */}
        <div className="flex items-end justify-between gap-3 mb-6">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Find Trusted Artisans
            </h2>

            <p className="text-gray-500 text-sm mt-2 max-w-lg">
              Discover skilled professionals and connect with reliable service
              providers near you.
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {artisans.length} {artisans.length === 1 ? "artisan" : "artisans"}{" "}
              available
            </p>
          </div>

          <Link
            to="/artisans"
            className="shrink-0 inline-flex items-center gap-1.5 text-green-700 hover:text-green-800 font-semibold text-sm pb-1"
          >
            {/* <span className="hidden sm:inline">View All</span>
            <span className="sm:hidden">All</span> */}
            {/* <ArrowRight size={17} /> */}
          </Link>
        </div>

        {/* Artisan Listings */}
        {artisans.length > 0 ? (
          <MenuGrid providers={artisans.slice(0, 8)} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <h3 className="font-bold text-gray-800">
              No artisans available yet
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Check back later to discover available service providers.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
