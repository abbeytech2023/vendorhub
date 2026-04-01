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

export default function VendorProfile({ vendor: vendo }) {
  console.log(vendo);

  const vendor = {
    fullName: "Jane Smith",
    storeName: "Jane Smith Enterprises",
    profilePicture: "https://i.pravatar.cc/150?img=25",

    phone: "+2348012345678",
    whatsapp: "2348012345678",

    state: "Lagos",
    localGovernment: "Ikeja",

    bankName: "Access Bank",
    accountName: "Jane Smith Enterprises",
    accountNumber: "9876543210",

    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 text-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={vendor.profilePicture}
              alt={vendo.fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
            />

            <div>
              <h1 className="text-xl font-bold">{vendo.fullName}</h1>

              <p className="text-gray-400">{vendo.storeName}</p>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <FaMapMarkerAlt />
                <span>
                  {vendor.state} • {vendo.localGovernment}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${vendo.phone}`}
              className="px-4 py-2 bg-gray-700 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-600 transition"
            >
              <FaPhone /> Call
            </a>

            <a
              href={`https://wa.me/${vendo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-green-700 transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* BUSINESS */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-5 space-y-3">
            <h2 className="font-semibold text-gray-200">Business Info</h2>

            <div className="text-sm text-gray-400 space-y-2">
              <p>
                <span className="text-gray-200">Store:</span> {vendo.storeName}
              </p>
              <p>
                <span className="text-gray-200">State:</span> {vendo.state}
              </p>
              <p>
                <span className="text-gray-200">LGA:</span>{" "}
                {vendo.localGovernment}
              </p>
            </div>
          </div>

          {/* BANK */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-5 space-y-3">
            <h2 className="font-semibold text-gray-200">Bank Details</h2>

            <div className="text-sm text-gray-400 space-y-2">
              <p>
                <span className="text-gray-200">Bank:</span> {vendor.bankName}
              </p>
              <p>
                <span className="text-gray-200">Account:</span>{" "}
                {vendor.accountName}
              </p>
              <p className="tracking-widest text-gray-300">
                {vendor.accountNumber}
              </p>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-5 space-y-3">
            <h2 className="font-semibold text-gray-200">Social Links</h2>

            <div className="flex gap-3 text-xl">
              <a href={vendor.social.facebook}>
                <FaFacebook className="text-blue-500" />
              </a>
              <a href={vendor.social.instagram}>
                <FaInstagram className="text-pink-400" />
              </a>
              <a href={vendor.social.twitter}>
                <FaTwitter className="text-blue-400" />
              </a>
              <a href={vendor.social.linkedin}>
                <FaLinkedin className="text-blue-500" />
              </a>
            </div>
          </div>
        </div>

        {/* EDIT */}
        <div className="mt-6 bg-gray-800 rounded-2xl shadow-md p-4 flex justify-end">
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
