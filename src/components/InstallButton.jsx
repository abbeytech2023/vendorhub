import { useState } from "react";
import { usePWAInstall } from "../hooks/usePwaInstall";
import { FaDownload, FaTimes } from "react-icons/fa";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed) return null;

  if (isIOS) {
    return (
      <div
        className="relative flex items-center gap-4 p-5 rounded-2xl 
        bg-gradient-to-r from-green-500 to-emerald-600 
        text-white shadow-xl text-base"
      >
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <FaTimes size={18} />
        </button>

        <img
          src="/apple-touch-icon.png"
          alt="App logo"
          className="w-12 h-12 rounded-xl border-2 border-white"
        />

        <span className="font-medium">
          Tap <b>Share</b> → <b>Add to Home Screen</b> to install
        </span>
      </div>
    );
  }

  if (!canInstall) return null;

  return (
    <div className="relative inline-block">
      {/* Close button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -right-2 z-10 bg-white text-gray-600 rounded-full p-1 shadow hover:bg-gray-100"
      >
        <FaTimes size={14} />
      </button>

      <button
        onClick={installApp}
        className="
          group flex items-center gap-4
          px-8 py-4
          rounded-full
          bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
          text-white text-lg font-bold
          shadow-2xl
          hover:scale-110
          hover:shadow-green-500/50
          transition-all duration-300
          animate-bounce
        "
      >
        <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition">
          <FaDownload size={22} />
        </div>

        <span className="tracking-wide">Install App</span>
      </button>
    </div>
  );
}
