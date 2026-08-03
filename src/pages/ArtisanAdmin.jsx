import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaWhatsapp,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";

import supabase from "../lib/supabaseClients";
import MiniLoader from "../components/MiniLoader";

export default function ServiceProviderDashboard() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [vendorLoading, setVendorLoading] = useState(true);

  useEffect(() => {
    async function fetchVendor() {
      if (!id) {
        setVendorLoading(false);
        return;
      }

      setVendorLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "artisan")
        .eq("slug", id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setVendor(null);
      } else {
        setVendor(data);
      }

      setVendorLoading(false);
    }

    fetchVendor();
  }, [id]);

  if (vendorLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MiniLoader />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Artisan not found
        </h2>
      </div>
    );
  }

  const whatsappNumber = vendor.phone?.replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* HERO */}

        <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-500 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img
                  src={vendor.profilePicture || "/default-avatar.png"}
                  alt={vendor.fullName}
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <div className="text-white text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-4xl font-bold">{vendor.fullName}</h1>

                    <FaCheckCircle className="text-white" />
                  </div>

                  {vendor.services && (
                    <p className="uppercase tracking-widest mt-2 font-semibold">
                      {vendor.services}
                    </p>
                  )}

                  <div className="flex justify-center sm:justify-start items-center gap-2 mt-5">
                    <FaStar className="text-yellow-300" />

                    <span className="font-bold">{vendor.rating || "0.0"}</span>

                    <span className="opacity-90">
                      ({vendor.reviews || 0} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 transition rounded-2xl px-8 py-4 flex items-center justify-center gap-3 font-bold text-green-700 shadow-lg"
              >
                <FaWhatsapp className="text-3xl" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">
            {/* ABOUT */}

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <FaUser className="text-green-600 text-xl" />

                <h2 className="text-2xl font-bold">About</h2>
              </div>

              <p className="text-gray-600 leading-8">
                {vendor.bio || "This service provider hasn't added a bio yet."}
              </p>
            </div>

            {/* SERVICES */}

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <FaBriefcase className="text-green-600 text-xl" />

                <h2 className="text-2xl font-bold">Services</h2>
              </div>

              <div className="inline-flex bg-green-100 text-green-700 rounded-full px-5 py-2 font-semibold">
                {vendor.services || "General Services"}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {vendor.location && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FaMapMarkerAlt className="text-green-600 text-lg" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Location</p>

                      <p className="font-medium text-gray-800">
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                )}

                {vendor.officeAddress && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FaMapMarkerAlt className="text-green-600 text-lg" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Office Address</p>

                      <p className="font-medium text-gray-800">
                        {vendor.officeAddress}
                      </p>
                    </div>
                  </div>
                )}

                {vendor.phone && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FaPhone className="text-green-600 text-lg" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Phone</p>

                      <p className="font-medium text-gray-800">
                        {vendor.phone}
                      </p>
                    </div>
                  </div>
                )}

                {vendor.email && (
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FaEnvelope className="text-green-600 text-lg" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>

                      <p className="font-medium text-gray-800 break-all">
                        {vendor.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rating Card */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-center text-white shadow-lg">
              <FaStar className="text-5xl mx-auto mb-4" />

              <h2 className="text-5xl font-bold">{vendor.rating || "0.0"}</h2>

              <p className="mt-2 text-lg">Average Rating</p>

              <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
                {vendor.reviews || 0} Reviews
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-800">
                Need this service?
              </h3>

              <p className="text-gray-500 mt-2">
                Contact this artisan directly on WhatsApp for instant booking
                and enquiries.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition duration-300"
              >
                <FaWhatsapp className="text-2xl" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
