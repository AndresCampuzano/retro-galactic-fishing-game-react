import { Screen } from "./components/Screen.tsx";
import { BottomBar } from "./components/BottomBar.tsx";
import { ItemDesktop } from "./components/ItemDesktop.tsx";
import { useEffect, useState } from "react";
import { StartMenu } from "./components/StartMenu.tsx";
import { Window } from "./components/Window.tsx";
import { useWindowDimensions } from "./hooks/useWindowDimensions.ts";
import { AboutContent } from "./components/floating-windows-content/AboutContent.tsx";
import { LeaderboardContent } from "./components/floating-windows-content/LeaderboardContent.tsx";

const UI_ELEMENTS = {
  aboutMe: {
    img: "images/my-computer.png",
    title: "About this Project",
  },
  leaderboard: {
    img: "images/leaderboard.png",
    title: "Leaderboard",
  },
  gameMarket: {
    img: "images/open-book.png",
    title: "Game Market",
  },
};

function App() {
  const [showAboutMe, setAboutMe] = useState<boolean>(false);
  const [showGameMarket, setGameMarket] = useState<boolean>(false);
  const [showLeaderboard, setLeaderboard] = useState<boolean>(false);
  const [showStartMenu, setStartMenu] = useState<boolean>(false);
  // const [showCodeScreen, setShowCodeScreen] = useState<boolean>(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const { height, width, isMobile } = useWindowDimensions();

  const calculatedMaxHeight = height * 0.8 - 60; // Calculate the max height of the floating window

  useEffect(() => {
    // Opening windows when page loads
    setLeaderboard(true);
    setOpenWindows((prev) => [...prev, UI_ELEMENTS.leaderboard.title]);
  }, []);

  /**
   * Bring the window to the front by removing it from the current position
   */
  const bringWindowToFront = (windowTitle: string) => {
    setOpenWindows((prev) => {
      const newWindows = prev.filter((w) => w !== windowTitle);
      return [...newWindows, windowTitle];
    });
  };

  const onOpenWindow = (title: string) => {
    if (title === UI_ELEMENTS.aboutMe.title) {
      setAboutMe(true);
    } else if (title === UI_ELEMENTS.leaderboard.title) {
      setLeaderboard(true);
    } else if (title === UI_ELEMENTS.gameMarket.title) {
      setGameMarket(true);
    }
    bringWindowToFront(title);
  };

  const onCloseWindow = (title: string) => {
    if (title === UI_ELEMENTS.aboutMe.title) {
      setAboutMe(false);
    } else if (title === UI_ELEMENTS.leaderboard.title) {
      setLeaderboard(false);
    } else if (title === UI_ELEMENTS.gameMarket.title) {
      setGameMarket(false);
    }
    setOpenWindows((prev) => prev.filter((w) => w !== title));
  };

  /**
   * Handle click on floating window to bring it to the front
   */
  const onClickOnAlreadyOpenedWindow = (windowTitle: string) => {
    bringWindowToFront(windowTitle);
  };

  const handleStartMenu = () => {
    setStartMenu((prev) => !prev);
  };

  /**
   * Determine z-index for each window based on order in openWindows array
   */
  const getZIndex = (windowTitle: string) => {
    const index = openWindows.indexOf(windowTitle);
    if (index === -1) return 0;
    return index + 1;
  };

  return (
    <Screen>
      {/* Items Desktop Grid */}
      <div className="mt-5 grid grid-cols-5 grid-rows-5 grid-flow-col gap-5">
        {/* Draggable Area */}
        <div className="absolute left-0 top-0 right-[1px] flex bottom-[60px] overflow-hidden">
          {/* Icons */}
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.aboutMe.title)}
            img={UI_ELEMENTS.aboutMe.img}
            title={UI_ELEMENTS.aboutMe.title}
            top={5}
            left={5}
          />
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.leaderboard.title)}
            img={UI_ELEMENTS.leaderboard.img}
            title={UI_ELEMENTS.leaderboard.title}
            imageSize={56}
            top={120}
            left={5}
          />
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.gameMarket.title)}
            img={UI_ELEMENTS.gameMarket.img}
            title={UI_ELEMENTS.gameMarket.title}
            imageSize={56}
            top={245}
            left={5}
          />
          {/* Floating windows */}
          {openWindows.includes(UI_ELEMENTS.leaderboard.title) &&
            showLeaderboard && (
              <div
                style={{ zIndex: getZIndex(UI_ELEMENTS.leaderboard.title) }}
                onClick={() =>
                  onClickOnAlreadyOpenedWindow(UI_ELEMENTS.leaderboard.title)
                }
              >
                <Window
                  handleCloseWindow={() =>
                    onCloseWindow(UI_ELEMENTS.leaderboard.title)
                  }
                  img={UI_ELEMENTS.leaderboard.img}
                  title={UI_ELEMENTS.leaderboard.title}
                  defaultPosition={
                    isMobile ? { x: 20, y: 60 } : { x: 120, y: 50 }
                  }
                  style={{
                    width: isMobile ? width - 30 : width - 200,
                    maxWidth: 1000,
                    height: calculatedMaxHeight,
                  }}
                >
                  <LeaderboardContent />
                </Window>
              </div>
            )}

          {openWindows.includes(UI_ELEMENTS.aboutMe.title) && showAboutMe && (
            <div
              style={{ zIndex: getZIndex(UI_ELEMENTS.aboutMe.title) }}
              onClick={() =>
                onClickOnAlreadyOpenedWindow(UI_ELEMENTS.aboutMe.title)
              }
            >
              <Window
                handleCloseWindow={() =>
                  onCloseWindow(UI_ELEMENTS.aboutMe.title)
                }
                img={UI_ELEMENTS.aboutMe.img}
                title={UI_ELEMENTS.aboutMe.title}
                defaultPosition={
                  isMobile ? { x: 20, y: 60 } : { x: 120, y: 50 }
                }
                style={{
                  width: isMobile ? width - 30 : width - 200,
                  maxWidth: 1000,
                  height: calculatedMaxHeight,
                }}
              >
                <AboutContent />
              </Window>
            </div>
          )}
        </div>
      </div>
      {showStartMenu && <StartMenu handleStartMenu={handleStartMenu} />}
      <BottomBar handleStartMenu={handleStartMenu} />
    </Screen>
  );
}

export default App;
