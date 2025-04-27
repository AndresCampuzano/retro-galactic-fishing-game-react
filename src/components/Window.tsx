import Draggable, { type ControlPosition } from "react-draggable";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";

export const Window = ({
  children,
  title,
  img,
  onCloseWindow,
  onClickWindow,
  style,
  defaultPosition,
}: {
  children: ReactNode;
  title: string;
  img: string;
  onCloseWindow: () => void;
  onClickWindow: () => void;
  style?: CSSProperties | undefined;
  defaultPosition?: ControlPosition;
}) => {
  const nodeRef = useRef<any>(null);
  const [enableDrag, setEnableDrag] = useState(true);

  const onMouseEnterFunction = () => {
    setEnableDrag(false);
  };
  const onMouseLeaveFunction = () => {
    setEnableDrag(true);
  };
  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={enableDrag}
      defaultPosition={defaultPosition}
    >
      <div
        ref={nodeRef}
        onPointerDown={onClickWindow}
        style={style}
        className="absolute bg-[#969696] p-[1px] border-t-[2.5px] border-t-white border-l-[2.5px] border-l-white border-r-[2.5px] border-r-black border-b-[2.5px] border-b-black"
      >
        <div className="bg-[#c3c3c3] h-full">
          {/* Top bar */}
          <div className="flex items-center px-[5px] h-[30px] bg-[#02007f] text-[#fafafa] tracking-[1px] cursor-move select-none">
            <div
              onMouseEnter={onMouseEnterFunction}
              onMouseLeave={onMouseLeaveFunction}
              onTouchStartCapture={onMouseEnterFunction}
              onTouchEndCapture={onMouseLeaveFunction}
              className="flex flex-1 w-full items-center"
            >
              <img
                src={img}
                alt={title}
                width={20}
                draggable="false"
                className="select-none"
              />
              <h2>{title}</h2> <h2>{title}</h2>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={onCloseWindow}
                className="flex justify-center items-center p-[2px] h-[23px] w-[23px] bg-[#c3c3c3] border-t-[2.5px] border-l-[2.5px] border-l-white border-t-white border-r-[2.5px] border-r-black border-b-[2.5px] border-b-black cursor-pointer font-[VT323] text-[20px]"
              >
                <img src="images/close-icon.png" alt="close" width={10} />
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="h-[calc(100%-34px)] m-[2px] p-[10px] bg-[#fafafa] border-t-[2.5px] border-t-[#545454] border-l-[2.5px] border-l-[#545454] border-r-[2.5px] border-r-[#ffffff] border-b-[2.5px] border-b-[#ffffff] overflow-scroll overscroll-auto">
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
