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

  return (
    <div
      className="flex items-center gap-1 px-1 ml-2 cursor-default"
      title={isOnline ? "Connected to network" : "Offline mode"}
    >
      <img
        src={`/images/${isOnline ? "online.png" : "offline.png"}`}
        alt={isOnline ? "Network connected" : "Network offline"}
        width="40"
        height="40"
        className="mr-1"
      />
      <span className="text-lg">{isOnline ? "Online" : "Offline"}</span>
    </div>
  );
};
