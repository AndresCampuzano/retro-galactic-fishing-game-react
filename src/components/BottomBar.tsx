import { Clock } from "./Clock.tsx";
import type { ReactNode } from "react";

export const BottomBar = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-[5px] px-[8px] h-[60px] bg-[#c3c3c3] flex justify-between border-t-[2.5px] border-l-[2.5px] border-t-[#ffffff] border-l-[#ffffff] text-[20px]">
      <div className="flex gap-2">{children}</div>
      <Clock />
    </div>
  );
};
