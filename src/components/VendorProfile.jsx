import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function VendorProfile() {
  const vendor = {
    name: "Jane Smith",
    profilePicture: "https://i.pravatar.cc/150?img=25",
    bankName: "Access Bank",
    accountName: "Jane Smith Enterprises",
    accountNumber: "9876543210",
    social: {
      facebook: "https://facebook.com/janesmith",
      instagram: "https://instagram.com/janesmith",
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  };

  return (
    <div className="w-full bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center">
          <img
            src={vendor.profilePicture}
            alt={vendor.name}
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover mb-3"
          />

          <h2 className="text-lg font-semibold text-gray-800">{vendor.name}</h2>

          <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm">
            Edit
          </button>

          {/* Socials */}
          <div className="flex gap-3 mt-4">
            <FaFacebook className="text-blue-600 cursor-pointer" size={18} />
            <FaInstagram className="text-pink-500 cursor-pointer" size={18} />
            <FaTwitter className="text-blue-400 cursor-pointer" size={18} />
            <FaLinkedin className="text-blue-700 cursor-pointer" size={18} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Bank Information
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Bank</p>
              <p className="font-medium">{vendor.bankName}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Account Name</p>
              <p className="font-medium">{vendor.accountName}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
              <p className="text-xs text-gray-500">Account Number</p>
              <p className="font-medium tracking-widest">
                {vendor.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
