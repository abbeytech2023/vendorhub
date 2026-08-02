import { BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function ArtisanGrid({ providers }) {
  console.log(providers);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {providers?.map((provider) => {
        return (
          <Link
            to={`artisan/${provider?.slug}`}
            key={provider.id}
            className="group bg-white rounded-3xl overflow-hidden border border-green-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div to="admin-artisan" className="relative   overflow-hidden">
              <img
                src={provider.profilePicture}
                alt={provider.fullName}
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
              />

              {provider.verified && (
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <BadgeCheck size={20} className="text-green-600" />
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-900">
                {provider.fullName}
              </h3>

              <p className="text-green-700 font-semibold mt-1">
                {provider.services}
              </p>

              <div className="flex items-center text-gray-500 text-sm mt-3">
                <MapPin size={16} className="mr-1 text-green-600" />
                {provider.localGovernment}
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400 mr-1"
                  />
                  <span className="font-medium">{provider.rating}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-300">
                Book Now
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
