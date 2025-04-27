import type { ReactNode, MouseEventHandler } from "react";

export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center p-0.5 h-11 bg-gray-400 border-t-[2.5px] border-l-[2.5px] border-r-[2.5px] border-b-[2.5px] border-white border-b-black border-r-black cursor-pointer font-vt323 text-lg active:bg-gray-500 active:border-t-gray-300 active:border-l-gray-300 active:border-r-gray-700 active:border-b-gray-700"
    >
      <span className="flex gap-2 justify-center items-center px-2.5 w-full h-full bg-[#c3c3c3] active:bg-gray-500 ">
        {children}
      </span>
    </button>
  );
};
