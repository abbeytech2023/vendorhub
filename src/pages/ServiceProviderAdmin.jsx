import { useState } from "react";
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
  FaWifi,
  FaRedoAlt,
} from "react-icons/fa";

import AddReview from "../components/AddReview";
import VendorReviews from "../components/VendorReviews";
import MiniLoader from "../components/MiniLoader";

import { useFetchVendorBySlug } from "../hooks/useFetchVendorsBySlug";
import { useVendorReviews } from "../hooks/useReviews";
import { useUser } from "../hooks/useUser";

export default function ServiceProviderDashboard() {
  const { id } = useParams();

  const { vendor, isLoading, refetch } = useFetchVendorBySlug(id);
  const { user } = useUser();

  const [previewImage, setPreviewImage] = useState(null);

  const { reviews } = useVendorReviews(vendor?.id);

  const averageRating = reviews?.length
    ? (
        reviews.reduce((total, review) => total + Number(review.rating), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <MiniLoader />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-red-100 p-5 rounded-full">
              <FaWifi className="text-4xl text-red-600" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Connection Lost
          </h2>

          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            We couldn't load the vendor information. Please check your internet
            connection and try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition w-full sm:w-auto"
          >
            <FaRedoAlt />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const whatsappNumber = vendor.phone?.replace(/\D/g, "").replace(/^0/, "234");

  const message = `Hello ${vendor.fullName},

I found your profile on VendorHub and I'm interested in your ${vendor.services} services.

Could you please provide more information about your pricing and availability?

Thank you.`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-slate-100 pt-20 sm:pt-24 pb-8 sm:pb-10">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 min-w-0">
        {/* HERO SECTION */}

        <div className="relative w-full min-w-0 bg-gradient-to-br from-green-950 via-green-800 to-emerald-600 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-48 sm:w-72 h-48 sm:h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -left-20 -bottom-20 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-8 min-w-0">
              {/* BUSINESS INFORMATION */}

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6 items-center sm:items-start min-w-0 flex-1">
                {/* PROFILE IMAGE */}

                <div className="shrink-0">
                  <img
                    src={vendor.profilePicture || "/default-avatar.png"}
                    alt={vendor.storeName || vendor.fullName}
                    onClick={() =>
                      setPreviewImage(
                        vendor.profilePicture || "/default-avatar.png",
                      )
                    }
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white/90 shadow-xl cursor-pointer"
                  />
                </div>

                {/* BUSINESS DETAILS */}

                <div className="text-white text-center sm:text-left min-w-0 w-full">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight break-words [overflow-wrap:anywhere]">
                      {vendor.storeName || vendor.fullName}
                    </h1>

                    <FaCheckCircle className="text-green-300 text-lg sm:text-xl shrink-0" />
                  </div>

                  {vendor.services && (
                    <p className="uppercase tracking-wider mt-2 text-green-200 text-xs sm:text-sm font-bold break-words">
                      {vendor.services}
                    </p>
                  )}

                  <p className="text-green-100 mt-3 text-sm break-words">
                    Owned and managed by{" "}
                    <span className="font-semibold text-white">
                      {vendor.fullName}
                    </span>
                  </p>

                  {/* RATING */}

                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-4">
                    <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-xl">
                      <FaStar className="text-yellow-300" />

                      <span className="font-bold text-white">
                        {averageRating}
                      </span>
                    </div>

                    <span className="text-green-100 text-xs sm:text-sm">
                      {reviews?.length || 0} Customer Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* BOOKING BUTTON */}

              <div className="flex flex-col gap-2 w-full lg:w-auto lg:min-w-[210px] shrink-0">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-green-50 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 flex items-center justify-center gap-3 font-bold text-green-800 shadow-lg transition"
                >
                  <FaWhatsapp className="text-2xl sm:text-3xl text-green-600 shrink-0" />

                  <span className="text-sm sm:text-base">Book on WhatsApp</span>
                </a>

                <p className="text-green-100 text-xs text-center">
                  Contact the business directly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-5 sm:mt-8 min-w-0">
          {/* LEFT COLUMN */}

          <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            {/* ABOUT */}

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm min-w-0">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <FaUser className="text-green-600 text-lg sm:text-xl shrink-0" />

                <h2 className="text-xl sm:text-2xl font-bold">About</h2>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8 break-words [overflow-wrap:anywhere]">
                {vendor.bio || "This service provider hasn't added a bio yet."}
              </p>
            </div>

            {/* SERVICES */}

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm min-w-0">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <FaBriefcase className="text-green-600 text-lg sm:text-xl shrink-0" />

                <h2 className="text-xl sm:text-2xl font-bold">Services</h2>
              </div>

              <div className="inline-block max-w-full bg-green-100 text-green-700 rounded-full px-4 sm:px-5 py-2 font-semibold text-sm break-words">
                {vendor.services || "General Services"}
              </div>
            </div>

            {/* ADD REVIEW */}

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm min-w-0 overflow-hidden">
              <AddReview vendor_id={vendor.id} user={user} />
            </div>

            {/* VENDOR REVIEWS */}

            <div className="min-w-0 w-full overflow-hidden">
              <VendorReviews user_id={vendor.id} />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* CONTACT INFORMATION */}

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
                Contact Information
              </h2>

              <div className="space-y-5 sm:space-y-6">
                {/* LOCATION */}

                {vendor.location && (
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="bg-green-100 p-3 rounded-xl shrink-0">
                      <FaMapMarkerAlt className="text-green-600 text-lg" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Location</p>

                      <p className="font-medium text-gray-800 text-sm sm:text-base break-words [overflow-wrap:anywhere]">
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* OFFICE ADDRESS */}

                {vendor.officeAddress && (
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="bg-green-100 p-3 rounded-xl shrink-0">
                      <FaMapMarkerAlt className="text-green-600 text-lg" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Office Address</p>

                      <p className="font-medium text-gray-800 text-sm sm:text-base break-words [overflow-wrap:anywhere]">
                        {vendor.officeAddress}
                      </p>
                    </div>
                  </div>
                )}

                {/* PHONE */}

                {vendor.phone && (
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="bg-green-100 p-3 rounded-xl shrink-0">
                      <FaPhone className="text-green-600 text-lg" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Phone</p>

                      <a
                        href={`tel:${vendor.phone}`}
                        className="font-medium text-gray-800 text-sm sm:text-base break-all"
                      >
                        {vendor.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* EMAIL */}

                {vendor.email && (
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="bg-green-100 p-3 rounded-xl shrink-0">
                      <FaEnvelope className="text-green-600 text-lg" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Email</p>

                      <a
                        href={`mailto:${vendor.email}`}
                        className="font-medium text-gray-800 text-sm sm:text-base break-all"
                      >
                        {vendor.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* WHATSAPP CTA */}

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Need this service?
              </h3>

              <p className="text-gray-500 mt-2 text-sm sm:text-base leading-6">
                Contact this artisan directly on WhatsApp for instant booking
                and enquiries.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 px-3 font-semibold flex items-center justify-center gap-3 transition"
              >
                <FaWhatsapp className="text-2xl shrink-0" />

                <span>Book on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW */}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Profile"
            className="max-w-full max-h-[85dvh] rounded-xl sm:rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white cursor-pointer text-4xl font-bold hover:text-gray-300 p-2"
            aria-label="Close image preview"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
