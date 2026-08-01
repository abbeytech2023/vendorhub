import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useVendors } from "../hooks/useVendors";

import ArtisanCard from "./ArtisanCard";

export default function ServiceProviders() {
  const { data: providers, isLoading, error } = useVendors("artisan");

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
            Trusted Professionals
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Hire Trusted Service Providers
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find skilled professionals near you for home, business and personal
            services.
          </p>
        </div>
        <div className="">
          <ArtisanCard providers={providers} />
        </div>

        <div className="text-center mt-14">
          <Link
            to="/artisans"
            className="inline-flex items-center justify-center border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            View All Providers
          </Link>
        </div>
      </div>
    </section>
  );
}
