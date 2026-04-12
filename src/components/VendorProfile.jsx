import React, { useState } from "react";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";

export default function VendorProfile({
  vendor,
  background = "bg-gray-950",
  cardBg = "bg-gray-900",
  showEditButton = true,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!vendor) return null;

  const Label = ({ children }) => (
    <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide">
      {children}
    </p>
  );

  const Value = ({ children }) => (
    <p className="text-gray-100 text-sm sm:text-base font-medium break-words">
      {children}
    </p>
  );

  const Row = ({ label, value }) => (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Value>{value}</Value>
    </div>
  );

  // 🔥 Mask NIN for security (recommended)
  const maskNIN = (nin) => {
    if (!nin) return "Not verified";
    if (nin.length < 7) return nin;
    return `${nin.slice(0, 4)}****${nin.slice(-3)}`;
  };

  return (
    <div
      className={`w-full min-h-screen ${background} text-gray-100 px-3 sm:px-6 py-5`}
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* HEADER */}
        <div
          className={`${cardBg} border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5`}
        >
          {/* PROFILE */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={vendor.profilePicture}
              alt={vendor.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-green-500 flex-shrink-0"
            />

            <div className="space-y-1">
              <h1 className="text-base sm:text-xl font-semibold uppercase tracking-wide">
                {vendor.fullName}
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm uppercase">
                {vendor.storeName}
              </p>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                <FaMapMarkerAlt className="text-green-500 flex-shrink-0" />
                <span>
                  {vendor.state} • {vendor.localGovernment}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <a
              href={`tel:${vendor.phone}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-sm"
            >
              <FaPhone /> Call
            </a>

            <a
              href={`https://wa.me/${vendor.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* BUSINESS INFO */}
          <div
            className={`${cardBg} border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5`}
          >
            <h2 className="text-gray-200 font-semibold text-sm sm:text-base">
              Business Info
            </h2>

            <div className="grid gap-4 sm:gap-5">
              <Row label="Store Name" value={vendor.storeName} />
              <Row label="State" value={vendor.state} />
              <Row label="LGA" value={vendor.localGovernment} />
              <Row
                label="Office Address"
                value={vendor.officeAddress || "Not set"}
              />

              {/* 🔥 NIN ADDED */}
              <Row label="NIN" value={maskNIN(vendor.nin)} />
            </div>
          </div>

          {/* BANK DETAILS */}
          <div
            className={`${cardBg} border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5`}
          >
            <h2 className="text-gray-200 font-semibold text-sm sm:text-base">
              Bank Details
            </h2>

            <div className="grid gap-4 sm:gap-5">
              <Row label="Bank Name" value={vendor.bankName} />
              <Row label="Account Name" value={vendor.accountName} />
              <Row label="Account Number" value={vendor.accountNumber} />
            </div>
          </div>
        </div>

        {/* EDIT BUTTON */}
        {showEditButton && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditOpen(true)}
              className="w-full sm:w-auto px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition"
            >
              Edit Profile
            </button>
          </div>
        )}
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
