import { useState, useEffect } from "react";

export const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  /**
   * Displays network status
   * Shows an icon indicating online/offline status in the bottom bar
   */
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? null : (
    <div
      className="flex items-center gap-1 px-1"
      title="Offline mode"
      style={{
        backgroundColor: "#ff0000",
      }}
    >
      <span className="text-lg text-white font-bold">Offline</span>
    </div>
  );
};
