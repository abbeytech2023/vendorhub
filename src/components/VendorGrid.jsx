import VendorCard from "./VendorCard";
import { vendors } from "../hooks/useVendors";

export default function VendorsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Featured Vendors
            </h2>

            <p className="text-gray-500 mt-2">
              Discover trusted sellers on VendorHub
            </p>
          </div>

          <span className="mt-4 md:mt-0 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">
            {vendors.length}+ Vendors
          </span>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="transform hover:-translate-y-2 transition duration-300"
            >
              <VendorCard vendor={vendor} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition">
            View All Vendors
          </button>
        </div>
      </div>
    </section>
  );
}
