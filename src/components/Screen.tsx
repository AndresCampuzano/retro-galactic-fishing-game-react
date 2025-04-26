import type { ReactNode } from "react";

export const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute inset-0 bg-[#009a9a] overflow-hidden bg-cover">
      {children}
    </div>
  );
};
