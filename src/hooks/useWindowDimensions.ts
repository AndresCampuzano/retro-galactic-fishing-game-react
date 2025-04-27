import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to get the window dimensions and check if the device is mobile.
 */
export const useWindowDimensions = (): {
  isMobile: boolean;
  width: number;
  height: number;
} => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : 481;
    const height = hasWindow ? window.innerHeight : 667;
    return {
      isMobile: width < 481,
      width,
      height,
    };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [getWindowDimensions, hasWindow]);

  return windowDimensions;
};
