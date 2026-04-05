import React, { useState } from "react";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";

export default function VendorProfile({ vendor }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!vendor) return null;

  const Label = ({ children }) => (
    <p className="text-gray-400 text-xs uppercase tracking-wide">{children}</p>
  );

  const Value = ({ children }) => (
    <p className="text-gray-100 font-medium break-words">{children}</p>
  );

  const Row = ({ label, value }) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Value>{value}</Value>
    </div>
  );

  return (
    <div className="w-full text-gray-100 bg-gray-950 min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <img
              src={vendor.profilePicture}
              alt={vendor.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-green-500"
            />

            <div>
              <h1 className="text-lg sm:text-xl font-semibold uppercase tracking-wide">
                {vendor.fullName}
              </h1>

              <p className="text-gray-300 text-sm uppercase">
                {vendor.storeName}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <FaMapMarkerAlt className="text-green-500" />
                <span>
                  {vendor.state} • {vendor.localGovernment}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <a
              href={`tel:${vendor.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm"
            >
              <FaPhone /> Call
            </a>

            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* BUSINESS INFO */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-gray-200 font-semibold">Business Info</h2>

            <Row label="Store Name" value={vendor.storeName} />
            <Row label="State" value={vendor.state} />
            <Row label="LGA" value={vendor.localGovernment} />

            <Row
              label="Office Address"
              value={vendor.officeAddress || "Not set"}
            />
          </div>

          {/* BANK DETAILS */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-gray-200 font-semibold">Bank Details</h2>

            <Row label="Bank Name" value={vendor.bankName} />
            <Row label="Account Name" value={vendor.accountName} />
            <Row label="Account Number" value={vendor.accountNumber} />
          </div>
        </div>

        {/* EDIT BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isEditOpen && (
        <EditProfileModal
          vendor={vendor}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}
