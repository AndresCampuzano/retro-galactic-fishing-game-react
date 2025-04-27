import { useEffect, useState } from "react";
import { timeToHHMM } from "../utils/dates.ts";
import { NetworkStatus } from "./NetworkStatus.tsx";

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<string>();

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(timeToHHMM(new Date()));
    updateCurrentTime();
    const intervalTime = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalTime);
  }, []);

  return (
    <div className="flex justify-center items-center text-lg px-[10px] h-[45px] w-fit border-t-[2.5px] border-l-[2.5px] border-r-[2.5px] border-b-[2.5px] border-t-[#545454] border-l-[#545454] border-r-[#ffffff] border-b-[#ffffff]">
      <NetworkStatus />
      <img src="images/volume.png" alt="Volume icon" />
      <p>{currentTime}</p>
    </div>
  );
};
