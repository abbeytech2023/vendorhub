import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function VendorProfile({ vendor }) {
  if (!vendor) return null;

  return (
    <div className="w-full text-gray-100">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* PROFILE INFO */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={vendor.profilePicture}
              alt={vendor.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-green-500"
            />

            <div>
              <h1 className="text-lg sm:text-xl font-bold uppercase">
                {vendor.fullName}
              </h1>

              <p className="text-gray-400 uppercase text-sm sm:text-base">
                {vendor.storeName}
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-1 flex-wrap">
                <FaMapMarkerAlt />
                <span>
                  {vendor.state} • {vendor.localGovernment}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <a
              href={`tel:${vendor.phone}`}
              className="w-full sm:w-auto justify-center px-4 py-2 bg-gray-700 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-600 transition"
            >
              <FaPhone /> Call
            </a>

            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-green-700 transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BUSINESS */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-4 sm:p-5 space-y-3">
            <h2 className="font-semibold text-gray-200">Business Info</h2>

            <div className="text-sm text-gray-400 space-y-2">
              <p>
                <span className="text-gray-200">Store:</span> {vendor.storeName}
              </p>
              <p>
                <span className="text-gray-200">State:</span> {vendor.state}
              </p>
              <p>
                <span className="text-gray-200">LGA:</span>{" "}
                {vendor.localGovernment}
              </p>
            </div>
          </div>

          {/* BANK */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-4 sm:p-5 space-y-3">
            <h2 className="font-semibold text-gray-200">Bank Details</h2>

            <div className="text-sm text-gray-400 space-y-2">
              <p>
                <span className="text-gray-200">Bank:</span> {vendor.bankName}
              </p>
              <p>
                <span className="text-gray-200">Account:</span>{" "}
                {vendor.accountName}
              </p>
              <p className="tracking-widest text-gray-300 break-all">
                {vendor.accountNumber}
              </p>
            </div>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-4 flex justify-center sm:justify-end">
          <button className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
