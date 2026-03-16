import { usePWAInstall } from "../hooks/usePwaInstall";
import { FaDownload } from "react-icons/fa";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();

  if (isInstalled) return null;

  if (isIOS) {
    return (
      <div
        className="flex items-center gap-4 p-5 rounded-2xl 
      bg-gradient-to-r from-green-500 to-emerald-600 
      text-white shadow-xl text-base"
      >
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
  );
}
