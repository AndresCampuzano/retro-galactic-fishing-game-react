import { Clock } from "./Clock.tsx";
import { PrimaryButton } from "./PrimaryButton.tsx";
import { useWindowDimensions } from "../hooks/useWindowDimensions.ts";

export const BottomBar = ({
  handleStartMenu,
  isAboutMeOpened,
  isRecycleBinOpened,
  isProjectsOpened,
}: {
  handleStartMenu: () => void;
  isAboutMeOpened: boolean;
  isRecycleBinOpened: boolean;
  isProjectsOpened: boolean;
}) => {
  const { isMobile } = useWindowDimensions();

  return (
    <div className="absolute bottom-0 left-0 right-0 p-[5px] px-[8px] h-[60px] bg-[#c3c3c3] flex justify-between border-t-[2.5px] border-l-[2.5px] border-t-[#ffffff] border-l-[#ffffff] text-[20px]">
      <div className="flex">
        <PrimaryButton onClick={handleStartMenu}>
          <img src="images/windows-logo.png" alt="windows logo" />
          <p>Start</p>
        </PrimaryButton>
        {!isMobile && isAboutMeOpened ? (
          <div className="ml-1">
            <PrimaryButton onClick={() => null}>
              <img src="images/my-computer.png" alt="Computer icon" />
              <p>About Me</p>
            </PrimaryButton>
          </div>
        ) : null}
        {!isMobile && isRecycleBinOpened ? (
          <div className="ml-1">
            <PrimaryButton onClick={() => null}>
              <img src="images/recycle-bin.png" alt="Recycle Bin icon" />
              <p>Recycle Bin</p>
            </PrimaryButton>
          </div>
        ) : null}
        {!isMobile && isProjectsOpened ? (
          <div className="ml-1">
            <PrimaryButton onClick={() => null}>
              <img src="images/folder.png" alt="Folder icon" />
              <p>Projects</p>
            </PrimaryButton>
          </div>
        ) : null}
      </div>
      <Clock />
    </div>
  );
};
