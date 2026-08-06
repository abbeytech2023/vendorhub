import {
  Star,
  MapPin,
  BadgeCheck,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useVendors } from "../hooks/useVendors";

// const serviceProviders = [
//   {
//     id: 1,
//     name: "John Electricals",
//     profession: "Electrician",
//     location: "Lagos",
//     rating: 4.9,
//     jobs: 240,
//     price: "₦8,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43b",
//   },
//   {
//     id: 2,
//     name: "Sarah Cleaners",
//     profession: "Cleaning Services",
//     location: "Abuja",
//     rating: 4.8,
//     jobs: 182,
//     price: "₦12,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//   },
//   {
//     id: 3,
//     name: "Mike Plumbing",
//     profession: "Plumber",
//     location: "Port Harcourt",
//     rating: 4.7,
//     jobs: 154,
//     price: "₦10,000",
//     verified: false,
//     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//   },
//   {
//     id: 4,
//     name: "AutoFix Garage",
//     profession: "Mechanic",
//     location: "Ibadan",
//     rating: 4.9,
//     jobs: 310,
//     price: "₦15,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1504593811423-6dd665756598",
//   },
//   {
//     id: 5,
//     name: "Bright Painter",
//     profession: "Painter",
//     location: "Benin",
//     rating: 4.8,
//     jobs: 120,
//     price: "₦18,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
//   },
//   {
//     id: 6,
//     name: "Royal AC Services",
//     profession: "AC Technician",
//     location: "Enugu",
//     rating: 4.9,
//     jobs: 210,
//     price: "₦9,500",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
//   },
//   {
//     id: 7,
//     name: "Elite Carpentry",
//     profession: "Carpenter",
//     location: "Abeokuta",
//     rating: 4.6,
//     jobs: 140,
//     price: "₦20,000",
//     verified: false,
//     image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
//   },
//   {
//     id: 8,
//     name: "Spark Security",
//     profession: "CCTV Installer",
//     location: "Lagos",
//     rating: 4.9,
//     jobs: 400,
//     price: "₦25,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
//   },
//   {
//     id: 9,
//     name: "Fresh Laundry",
//     profession: "Laundry Services",
//     location: "Ilorin",
//     rating: 4.8,
//     jobs: 190,
//     price: "₦6,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
//   },
//   {
//     id: 10,
//     name: "Swift Movers",
//     profession: "Moving Services",
//     location: "Kano",
//     rating: 4.7,
//     jobs: 135,
//     price: "₦30,000",
//     verified: true,
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
//   },
// ];

export default function ArtisansPage() {
  const { data: artisans, isLoading, error } = useVendors("artisan");

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-19">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold">Find Trusted Service Providers</h1>

          <p className="mt-4 max-w-2xl text-green-100">
            Discover verified artisans and professionals near you. Book trusted
            electricians, plumbers, cleaners, mechanics, technicians and more.
          </p>

          <div className="mt-10 bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl">
            <div className="flex-1 flex items-center border rounded-xl px-4">
              <Search className="text-gray-400" size={20} />
              <input
                placeholder="Search service..."
                className="w-full p-3 outline-none text-gray-700"
              />
            </div>

            <div className="flex-1 flex items-center border rounded-xl px-4">
              <MapPin className="text-gray-400" size={20} />
              <input
                placeholder="Location"
                className="w-full p-3 outline-none text-gray-700"
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 px-8 rounded-xl text-white font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">10 Service Providers</h2>

        <button className="flex items-center gap-2 border px-5 py-2 rounded-xl hover:bg-green-100">
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Providers */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artisans?.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-xl">{provider.fullName}</h3>

                    <p className="text-green-600 font-semibold">
                      {provider.services.charAt(0).toUpperCase() +
                        provider.services.slice(1)}
                    </p>
                  </div>

                  {provider.verified && (
                    <BadgeCheck className="text-green-600" size={22} />
                  )}
                </div>

                <div className="flex items-center text-gray-500 mt-4">
                  <MapPin size={16} className="mr-2" />
                  {provider.localGovernment}
                </div>

                <div className="flex justify-between mt-5">
                  {/* <div className="flex items-center">
                    <Star
                      className="fill-yellow-400 text-yellow-400 mr-1"
                      size={18}
                    />
                    <span className="font-medium">{provider.rating}</span>
                  </div> */}

                  <span className="text-gray-500 text-sm">
                    {provider.jobs}+ Jobs
                  </span>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Starting From</p>

                    <h4 className="font-bold text-2xl text-green-700">
                      {provider.price}
                    </h4>
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
