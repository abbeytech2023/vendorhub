import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaPlus,
  FaEdit,
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
        console.error("Error fetching artisan:", error);
        setVendor(null);
      } else {
        console.log("Vendor:", data);
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

  return (
    <div className="min-h-screen bg-gray-100 mt-21 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={vendor.profilePicture || "/default-avatar.png"}
              alt={vendor.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-800">
                  {vendor.fullName}
                </h1>

                <FaCheckCircle className="text-green-500" />
              </div>

              {vendor.services && (
                <p className="text-green-600 uppercase font-medium mt-1">
                  {vendor.services}
                </p>
              )}

              {vendor.bio && (
                <p className="text-gray-500 mt-4 leading-7">{vendor.bio}</p>
              )}

              <div className="flex flex-wrap gap-5 mt-5 text-gray-600 text-sm">
                {vendor.location && (
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {vendor.location}
                  </span>
                )}

                {vendor.phone && (
                  <span className="flex items-center gap-2">
                    <FaPhone />
                    {vendor.phone}
                  </span>
                )}

                {vendor.email && (
                  <span className="flex items-center gap-2">
                    <FaEnvelope />
                    {vendor.email}
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="bg-yellow-50 rounded-2xl p-5">
                <FaStar className="text-yellow-500 text-3xl mx-auto mb-2" />

                <h2 className="text-3xl font-bold">{vendor.rating || "0.0"}</h2>

                <p className="text-gray-500 text-sm">
                  {vendor.reviews || 0} Reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-green-600">
              {vendor.completedJobs || 0}
            </h2>
            <p className="text-gray-500 mt-2">Completed Jobs</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-blue-600">
              {vendor.activeBookings || 0}
            </h2>
            <p className="text-gray-500 mt-2">Active Bookings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-purple-600">
              {vendor.servicesCount || 0}
            </h2>
            <p className="text-gray-500 mt-2">Services</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-orange-500">
              ₦{(vendor.earnings || 0).toLocaleString()}
            </h2>
            <p className="text-gray-500 mt-2">Total Earnings</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaPlus />
              Add Service
            </button>

            <button className="border border-gray-300 hover:bg-gray-50 transition px-6 py-3 rounded-xl flex items-center gap-2">
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
