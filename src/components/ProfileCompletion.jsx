import { useState } from "react";
import { FaExclamationCircle, FaCheckCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfileCompletionChecker({ vendor }) {
  const [visible, setVisible] = useState(true);

  if (!vendor || !visible) return null;

  const requiredFields = [
    "fullName",
    "storeName",
    "phone",
    "whatsapp",
    "state",
    "localGovernment",
    "officeAddress",
    "bankName",
    "accountName",
    "accountNumber",
    "nin",
  ];

  const missingFields = requiredFields.filter(
    (field) => !vendor[field] || vendor[field].toString().trim() === "",
  );

  const isComplete = missingFields.length === 0;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      {/* CARD */}
      <div
        className={`
          relative w-full max-w-md rounded-2xl p-6 shadow-2xl border
          transition-all duration-300
          ${
            isComplete
              ? "bg-gradient-to-br from-green-900/90 to-emerald-900/90 border-green-500"
              : "bg-gradient-to-br from-gray-900 to-green-950 border-green-600"
          }
        `}
      >
        {/* CLOSE */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-green-200 hover:text-white transition"
        >
          <FaTimes />
        </button>

        {/* ICON */}
        <div className="flex items-center gap-3 mb-4">
          {isComplete ? (
            <FaCheckCircle className="text-green-400 text-3xl drop-shadow-lg" />
          ) : (
            <FaExclamationCircle className="text-green-300 text-3xl animate-pulse" />
          )}

          <h2 className="text-white text-lg font-semibold">
            {isComplete ? "Profile Complete" : "Finish Your Setup"}
          </h2>
        </div>

        {/* MESSAGE */}
        <p className="text-green-100 text-sm leading-relaxed mb-6">
          {isComplete
            ? "Your VendorHub account is fully verified and ready to go 🚀"
            : `Almost there! You still have ${missingFields.length} missing field(s). Complete your profile to unlock full access.`}
        </p>

        {/* BUTTON */}
        {!isComplete ? (
          <Link
            to="seller-admin"
            className="block w-full text-center py-3 rounded-xl font-semibold
            bg-green-500 hover:bg-green-400 text-black transition shadow-lg"
          >
            Complete Profile
          </Link>
        ) : (
          <button
            onClick={() => setVisible(false)}
            className="w-full py-3 rounded-xl font-semibold
            bg-green-500 hover:bg-green-400 text-black transition shadow-lg"
          >
            Got it
          </button>
        )}

        {/* glow decoration */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500 blur-3xl opacity-20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-400 blur-3xl opacity-20 rounded-full"></div>
      </div>
    </div>
  );
}
