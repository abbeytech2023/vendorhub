import { usePWAInstall } from "../hooks/usePwaInstall";

export default function InstallButton() {
  const { installApp, canInstall, isInstalled, isIOS } = usePWAInstall();

  if (isInstalled) return null;

  // iOS instruction (Safari only)
  if (isIOS) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 shadow-sm text-sm">
        <img
          src="/apple-touch-icon.png"
          alt="App logo"
          className="w-8 h-8 rounded-lg"
        />
        <span>
          To install this app, tap <b>Share</b> → <b>Add to Home Screen</b>
        </span>
      </div>
    );
  }

  // Android install button
  if (!canInstall) return null;

  return (
    <button
      onClick={installApp}
      className="flex items-center gap-3 px-4 py-2 rounded-xl
                 bg-black text-white font-semibold shadow-md
                 hover:bg-blue-700 transition"
    >
      <img
        src="/pwa-192x192.png"
        alt="App logo"
        className="w-6 h-6 rounded-md bg-white p-1"
      />
      <span>Install App</span>
    </button>
  );
}
