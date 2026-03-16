import { usePWAInstall } from "../hooks/usePwaInstall";
import { FaDownload } from "react-icons/fa";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();

  if (isInstalled) return null;

  // iOS instruction
  if (isIOS) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg animate-pulse">
        <img
          src="/apple-touch-icon.png"
          alt="App logo"
          className="w-10 h-10 rounded-xl border border-white"
        />
        <span className="text-sm font-medium">
          Tap <b>Share</b> → <b>Add to Home Screen</b> to install this app
        </span>
      </div>
    );
  }

  if (!canInstall) return null;

  return (
    <button
      onClick={installApp}
      className="
        group flex items-center gap-3 px-6 py-3
        rounded-2xl
        bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600
        text-white font-semibold
        shadow-lg
        hover:scale-105 hover:shadow-2xl
        transition-all duration-300
      "
    >
      <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition">
        <FaDownload size={18} />
      </div>

      <span className="text-sm md:text-base tracking-wide">Install App</span>
    </button>
  );
}
