import React, { useState } from "react";

import {
  Search,
  Star,
  BadgeCheck,
  Building2,
  SlidersHorizontal,
  ArrowRight,
  ChevronDown,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useRealEstateAgents } from "../hooks/useRealEstateAgents";
import MenuGrid from "../components/MenuGrid";

export default function RealEstateAgents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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

  // Extract Available States
  const availableStates = [
    ...new Set(
      (agents || []).map((agent) => agent.state?.trim()).filter(Boolean),
    ),
  ].sort();

  // Search and State Filtering
  const filteredAgents = (agents || []).filter((agent) => {
    const searchContent = `
      ${agent.fullName || ""}
      ${agent.location || ""}
      ${agent.storeName || ""}
      ${agent.services || ""}
      ${agent.state || ""}
      ${agent.localGovernment || ""}
    `.toLowerCase();

    const matchesSearch = searchContent.includes(searchTerm.toLowerCase());

    const matchesState = selectedState
      ? agent.state?.trim().toLowerCase() === selectedState.toLowerCase()
      : true;

    return matchesSearch && matchesState;
  });

  // Clear Filters
  const clearFilters = () => {
    setSelectedState("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-green-900">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Modern luxury residential property"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60"></div>

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
                onClick={() => {
                  document.getElementById("agents-section")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
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
      <main
        id="agents-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
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

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 border px-5 py-3 rounded-xl transition ${
              showFilters || selectedState
                ? "bg-green-50 border-green-600 text-green-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-green-600"
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
            {selectedState && (
              <span className="bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            )}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-gray-900 text-lg">Filter Agents</h3>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select State
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                  />

                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl py-3 pl-10 pr-10 outline-none focus:border-green-600 bg-white text-gray-700"
                  >
                    <option value="">All States</option>

                    {availableStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {filteredAgents.length} matching agents
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filter */}
        {selectedState && (
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm text-gray-500">Filtering by:</span>

            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {selectedState}

              <button type="button" onClick={() => setSelectedState("")}>
                <X size={14} />
              </button>
            </span>
          </div>
        )}

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
          <MenuGrid providers={filteredAgents} />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <Building2 size={45} className="mx-auto text-gray-300" />

            <h3 className="text-xl font-bold text-gray-900 mt-4">
              No agents found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with a different name or selecting another state.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Clear Filters
            </button>
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
