import { useState } from "react";
import { FaExclamationCircle, FaCheckCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { checkProfileComplete } from "../utility/profileComplete";

export default function ProfileCompletionChecker({ vendor }) {
  const [visible, setVisible] = useState(true);
  const { isComplete, missingFields } = checkProfileComplete(vendor);

  if (!vendor || !visible) return null;

  // ✅ KEY FIX: if profile is complete, show NOTHING
  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      {/* CARD */}
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl border bg-gradient-to-br from-gray-900 to-green-950 border-green-600">
        {/* CLOSE */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-green-200 hover:text-white transition"
        >
          <FaTimes />
        </button>

        {/* ICON */}
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationCircle className="text-green-300 text-3xl animate-pulse" />

          <h2 className="text-white text-lg font-semibold">
            Finish Your Setup
          </h2>
        </div>

        {/* MESSAGE */}
        <p className="text-green-100 text-sm leading-relaxed mb-6">
          Almost there! You still have {missingFields.length} missing field(s).
          Complete your profile to unlock full access.
        </p>

        {/* BUTTON */}
        <Link
          to="/seller-admin"
          className="block w-full text-center py-3 rounded-xl font-semibold
          bg-green-500 hover:bg-green-400 text-black transition shadow-lg"
        >
          Complete Profile
        </Link>

        {/* glow decoration */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500 blur-3xl opacity-20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-400 blur-3xl opacity-20 rounded-full"></div>
      </div>
    </div>
  );
}
