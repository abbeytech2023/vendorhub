import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import { useVendor } from "../hooks/useVendors";
import MiniLoader from "../components/MiniLoader";
import { useUserProfileTable } from "../hooks/useUser";

export default function ServiceProviderDashboard() {
  const { data: user } = useUserProfileTable();

  const id = user?.slug;
  const { vendor, loading: vendorLoading } = useVendor(id);
  console.log(vendor);

  return (
    <div className="min-h-screen bg-gray-100 mt-21 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}

            <img
              src={vendor?.profilePicture}
              alt="Provider"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
            />

            {/* Bio */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {vendor?.fullName}
                </h1>

                <FaCheckCircle className="text-green-500" />
              </div>

              <p className="text-green-600 uppercase font-medium mt-1">
                {vendor?.services}
              </p>

              <p className="text-gray-500 mt-4 leading-7">{vendor?.bio}</p>

              <div className="flex flex-wrap gap-5 mt-5 text-gray-600 text-sm">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Abeokuta, Ogun
                </span>

                <span className="flex items-center gap-2">
                  <FaPhone />
                  {vendor?.phone}
                </span>

                <span className="flex items-center gap-2">
                  <FaEnvelope />
                  {vendor?.email}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="text-center">
              <div className="bg-yellow-50 rounded-2xl p-5">
                <FaStar className="text-yellow-500 text-3xl mx-auto mb-2" />

                <h2 className="text-3xl font-bold">4.9</h2>

                <p className="text-gray-500 text-sm">132 Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-green-600">58</h2>
            <p className="text-gray-500 mt-2">Completed Jobs</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-blue-600">18</h2>
            <p className="text-gray-500 mt-2">Active Bookings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-purple-600">9</h2>
            <p className="text-gray-500 mt-2">Services</p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-orange-500">₦420k</h2>
            <p className="text-gray-500 mt-2">Total Earnings</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaPlus />
              Add Service
            </button>

            <button className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-xl flex items-center gap-2">
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
