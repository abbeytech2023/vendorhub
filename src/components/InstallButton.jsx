import { useState } from "react";
import { usePWAInstall } from "../hooks/usePwaInstall";
import { FaDownload, FaTimes } from "react-icons/fa";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed || (!canInstall && !isIOS)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setDismissed(true)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-[90%] max-w-md rounded-2xl bg-white shadow-2xl p-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes size={18} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <FaDownload size={24} className="text-green-600" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-center mb-2">Install Our App</h2>

        <p className="text-gray-600 text-center text-sm mb-6">
          Get faster access, offline support, and a smoother experience.
        </p>

        {/* iOS instruction */}
        {isIOS ? (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl text-center">
            Tap <b>Share</b> → <b>Add to Home Screen</b>
          </div>
        ) : (
          <button
            onClick={installApp}
            className="w-full flex items-center justify-center gap-3 
              bg-gradient-to-r from-green-500 to-emerald-600 
              text-white font-semibold py-3 rounded-xl 
              hover:scale-[1.02] transition"
          >
            <FaDownload />
            Install Now
          </button>
        )}
      </div>
    </div>
  );
}
