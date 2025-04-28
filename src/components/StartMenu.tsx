import OutsideClickHandler from "react-outside-click-handler";
import { UI_ELEMENTS } from "../constants.ts";

export const StartMenu = ({
  onCloseStartMenu,
  onOpenWindow,
}: {
  onCloseStartMenu: () => void;
  onOpenWindow: (title: string) => void;
}) => {
  const onOpenWindowHandler = (title: string) => {
    onOpenWindow(title);
    onCloseStartMenu();
  };

  return (
    <OutsideClickHandler
      onOutsideClick={(event) => {
        if (!(event.target as HTMLElement).closest("#start-menu-button")) {
          onCloseStartMenu();
        }
      }}
    >
      <div className="z-[9999] absolute bottom-[60px] left-0 pl-[50px] h-[500px] w-[350px] bg-[#c3c3c3] border-t-[2.5px] border-l-[2.5px] border-r-[2.5px] border-b-[2.5px] border-t-white border-l-white border-r-black border-b-black">
        <div className="absolute left-0 bottom-0 top-0 w-[50px] bg-[#8d8d8d] flex flex-col-reverse h-full text-white">
          <p className="rotate-180 [writing-mode:vertical-lr] text-center text-[2.8rem] leading-none text-[#e8e8e8]">
            <span className="mt-2">Windows</span>
            <span className="mt-[3px] text-white">95</span>
          </p>
        </div>

        <div
          onClick={() => onOpenWindowHandler(UI_ELEMENTS.leaderboard.title)}
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black hover:bg-[#031860] hover:text-[#fafafa]"
        >
          <img
            src={UI_ELEMENTS.leaderboard.img}
            alt="leaderboard icon"
            width="35px"
          />
          <p className="ml-[10px] text-[1.2rem]">Leaderboard</p>
        </div>

        <div
          onClick={() => onOpenWindowHandler(UI_ELEMENTS.gameMarket.title)}
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black hover:bg-[#031860] hover:text-[#fafafa]"
        >
          <img
            src={UI_ELEMENTS.gameMarket.img}
            alt="game market icon"
            width="35px"
          />
          <p className="ml-[10px] text-[1.2rem]">Game Market</p>
        </div>

        <div
          onClick={() => onOpenWindowHandler(UI_ELEMENTS.aboutMe.title)}
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black hover:bg-[#031860] hover:text-[#fafafa]"
        >
          <img src={UI_ELEMENTS.aboutMe.img} alt="about icon" width="35px" />
          <p className="ml-[10px] text-[1.2rem]">About Me</p>
        </div>
      </div>
    </OutsideClickHandler>
  );
};
