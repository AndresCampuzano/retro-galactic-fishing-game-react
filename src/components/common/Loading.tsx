import { useEffect, useState } from "react";

const images = [
  "/public/images/poison_delay.png",
  "/public/images/poison_leveling.png",
  "/public/images/poison_recovery.png",
];

export const Loading = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-fit text-center items-center justify-center">
      <img
        src={images[currentImageIndex]}
        alt="Loading animation"
        className="w-5"
      />
      <p>Loading content...</p>
    </div>
  );
};
