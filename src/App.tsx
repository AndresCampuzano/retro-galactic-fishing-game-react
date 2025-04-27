import { Screen } from "./components/Screen.tsx";
import { BottomBar } from "./components/BottomBar.tsx";
import { ItemDesktop } from "./components/ItemDesktop.tsx";
import { useEffect, useState } from "react";
import { StartMenu } from "./components/StartMenu.tsx";
import { Leaderboard } from "./components/Leaderboard.tsx";
import { SetAboutMe } from "./components/SetAboutMe.tsx";

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

  useEffect(() => {
    // Opening windows when page loads
    setLeaderboard(true);
    setOpenWindows((prev) => [...prev, UI_ELEMENTS.leaderboard.title]);
  }, []);

  const bringWindowToFront = (windowTitle: string) => {
    setOpenWindows((prev) => {
      const newWindows = prev.filter((w) => w !== windowTitle);
      return [...newWindows, windowTitle];
    });
  };

  const handleWindowAbout = () => {
    if (!showAboutMe) {
      setAboutMe(true);
      bringWindowToFront(UI_ELEMENTS.aboutMe.title);
    } else {
      setAboutMe(false);
      setOpenWindows((prev) =>
        prev.filter((w) => w !== UI_ELEMENTS.aboutMe.title),
      );
    }
  };

  const handleLeaderboard = () => {
    if (!showLeaderboard) {
      setLeaderboard(true);
      bringWindowToFront(UI_ELEMENTS.leaderboard.title);
    } else {
      setLeaderboard(false);
      setOpenWindows((prev) =>
        prev.filter((w) => w !== UI_ELEMENTS.leaderboard.title),
      );
    }
  };

  const handleWindowRecycle = () => {
    if (!showGameMarket) {
      setGameMarket(true);
      bringWindowToFront(UI_ELEMENTS.gameMarket.title);
    } else {
      setGameMarket(false);
      setOpenWindows((prev) =>
        prev.filter((w) => w !== UI_ELEMENTS.gameMarket.title),
      );
    }
  };

  const handleWindowClick = (windowTitle: string) => {
    bringWindowToFront(windowTitle);
  };

  const handleStartMenu = () => {
    setStartMenu((prev) => !prev);
  };

  // Determine z-index for each window based on order in openWindows array
  const getZIndex = (windowTitle: string) => {
    const index = openWindows.indexOf(windowTitle);
    if (index === -1) return 0;
    return index + 1; // Higher index = higher z-index = appears on top
  };

  return (
    <Screen>
      {/* Items Desktop Grid */}
      <div className="mt-5 grid grid-cols-5 grid-rows-5 grid-flow-col gap-5">
        {/* Draggable Area */}
        <div className="absolute left-0 top-0 right-[1px] flex bottom-[60px] overflow-hidden">
          <ItemDesktop
            handleOpenWindow={handleWindowAbout}
            isViewAlreadyEnabled={showAboutMe}
            img={UI_ELEMENTS.aboutMe.img}
            title={UI_ELEMENTS.aboutMe.title}
            top={5}
            left={5}
          />
          <ItemDesktop
            handleOpenWindow={handleLeaderboard}
            isViewAlreadyEnabled={showLeaderboard}
            img={UI_ELEMENTS.leaderboard.img}
            title={UI_ELEMENTS.leaderboard.title}
            imageSize={56}
            top={120}
            left={5}
          />
          <ItemDesktop
            handleOpenWindow={handleWindowRecycle}
            isViewAlreadyEnabled={showGameMarket}
            img={UI_ELEMENTS.gameMarket.img}
            title={UI_ELEMENTS.gameMarket.title}
            imageSize={56}
            top={245}
            left={5}
          />
          {openWindows.includes(UI_ELEMENTS.leaderboard.title) &&
            showLeaderboard && (
              <div
                style={{ zIndex: getZIndex(UI_ELEMENTS.leaderboard.title) }}
                onClick={() => handleWindowClick(UI_ELEMENTS.leaderboard.title)}
              >
                <Leaderboard
                  key={UI_ELEMENTS.leaderboard.title}
                  iconImg={UI_ELEMENTS.leaderboard.img}
                  title={UI_ELEMENTS.leaderboard.title}
                  handleCloseWindow={handleLeaderboard}
                />
              </div>
            )}

          {openWindows.includes(UI_ELEMENTS.aboutMe.title) && showAboutMe && (
            <div
              style={{ zIndex: getZIndex(UI_ELEMENTS.aboutMe.title) }}
              onClick={() => handleWindowClick(UI_ELEMENTS.aboutMe.title)}
            >
              <SetAboutMe
                key={UI_ELEMENTS.aboutMe.title}
                iconImg={UI_ELEMENTS.aboutMe.img}
                title={UI_ELEMENTS.aboutMe.title}
                handleCloseWindow={handleWindowAbout}
              />
            </div>
          )}

          {/*{openWindows.includes(UI_ELEMENTS.gameMarket.title) &&*/}
          {/*  showGameMarket && (*/}
          {/*    <div*/}
          {/*      style={{ zIndex: getZIndex(UI_ELEMENTS.gameMarket.title) }}*/}
          {/*      onClick={() => handleWindowClick(UI_ELEMENTS.gameMarket.title)}*/}
          {/*    >*/}
          {/*      /!* Game Market window component would go here *!/*/}
          {/*    </div>*/}
          {/*  )}*/}
        </div>
      </div>
      {showStartMenu && <StartMenu handleStartMenu={handleStartMenu} />}
      <BottomBar handleStartMenu={handleStartMenu} />
    </Screen>
  );
}

export default App;
