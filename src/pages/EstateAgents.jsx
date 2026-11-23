import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  BadgeCheck,
  Building2,
  SlidersHorizontal,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRealEstateAgents } from "../hooks/useRealEstateAgents";

export default function RealEstateAgents() {
  const [searchTerm, setSearchTerm] = useState("");

  const { agents, isPending, error } = useRealEstateAgents();

  // Loading State
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading real estate agents...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <Building2 size={45} className="mx-auto text-red-500" />

          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Something went wrong
          </h2>

          <p className="text-gray-500 mt-2">
            We couldn't load real estate agents. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Search Filter
  const filteredAgents = (agents || []).filter((agent) =>
    `${agent.fullName || ""} ${agent.location || ""} ${agent.specialization || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-green-900">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Modern luxury residential property"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-green-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 size={17} />
              VendorHub Real Estate
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Trusted Real Estate Agents Near You
            </h1>

            <p className="text-gray-200 mt-6 text-base sm:text-lg leading-relaxed max-w-2xl">
              Connect with experienced real estate professionals who can help
              you buy, sell, rent, or invest in properties with confidence.
            </p>

            {/* Search Box */}
            <div className="mt-9 bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl">
              <div className="flex items-center flex-1 px-3">
                <Search className="text-gray-400 shrink-0" size={21} />

                <input
                  type="text"
                  placeholder="Search agents, locations or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-3 text-gray-800 outline-none bg-transparent"
                />
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Find Agents
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-white text-sm">
              <div className="flex items-center gap-2">
                <BadgeCheck size={19} className="text-green-400" />
                Verified Professionals
              </div>

              <div className="flex items-center gap-2">
                <Star size={19} className="text-yellow-400" />
                Trusted Agents
              </div>

              <div className="flex items-center gap-2">
                <Building2 size={19} className="text-green-400" />
                Property Experts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Explore Real Estate Agents
            </h2>

            <p className="text-gray-500 mt-2">
              Find professionals to help with your next property deal.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-xl text-gray-700 hover:border-green-600 transition"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* Agent Count */}
        <div className="mb-6 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredAgents.length}
          </span>{" "}
          real estate agents
        </div>

        {/* Agent Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Agent Image */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={agent.profilePicture}
                    alt={agent.fullName}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />

                  {agent.verified && (
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 flex items-center gap-1 shadow-md">
                      <BadgeCheck size={17} className="text-green-600" />

                      <span className="text-xs font-semibold text-gray-700">
                        Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Agent Details */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900">
                    {agent.fullName}
                  </h3>

                  <p className="text-green-700 font-semibold text-sm mt-1">
                    {agent.specialization}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                    <MapPin size={16} className="text-green-600 shrink-0" />
                    <span>{agent.localGovernment}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                    <BriefcaseBusiness
                      size={16}
                      className="text-green-600 shrink-0"
                    />
                    <span>{agent.experience}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-4">
                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold text-gray-900">
                      {agent.rating}
                    </span>

                    <span className="text-gray-400 text-sm">
                      ({agent.reviews} reviews)
                    </span>
                  </div>

                  {/* Property Count */}
                  <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center">
                    {/* <div>
                      <p className="text-xl font-bold text-gray-900">
                        {agent.properties}
                      </p>

                      <p className="text-xs text-gray-500">
                        Properties handled
                      </p>
                    </div> */}

                    <Link
                      to={`/real-estate-agent/${agent.slug}`}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition"
                    >
                      View Profile
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <Building2 size={45} className="mx-auto text-gray-300" />

            <h3 className="text-xl font-bold text-gray-900 mt-4">
              No agents found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with a different name or location.
            </p>
          </div>
        )}
      </main>

      {/* Become an Agent CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-green-50 border border-green-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Are You a Real Estate Agent?
            </h2>

            <p className="text-gray-600 mt-3 max-w-xl">
              Join VendorHub and connect with people looking to buy, sell, rent,
              and invest in properties.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-xl font-semibold transition shrink-0"
          >
            Join VendorHub
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
