import { Screen } from "./components/Screen.tsx";
import { BottomBar } from "./components/BottomBar.tsx";
import { ItemDesktop } from "./components/ItemDesktop.tsx";
import { useEffect, useState } from "react";
import { StartMenu } from "./components/StartMenu.tsx";

const UI_ELEMENTS = {
  aboutMe: {
    img: "images/my-computer.png",
    title: "About Me",
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
    setAboutMe(true);
    setOpenWindows((prev) => [...prev, UI_ELEMENTS.aboutMe.title]);
  }, []);

  const handleWindowAbout = () => {
    setAboutMe((prev) => !prev);
    setOpenWindows((prev) => {
      const newWindows = prev.filter((w) => w !== UI_ELEMENTS.aboutMe.title);
      return [...newWindows, UI_ELEMENTS.aboutMe.title];
    });
  };

  const handleLeaderboard = () => {
    setLeaderboard((prev) => !prev);
    setOpenWindows((prev) => {
      const newWindows = prev.filter(
        (w) => w !== UI_ELEMENTS.leaderboard.title,
      );
      return [...newWindows, UI_ELEMENTS.leaderboard.title];
    });
  };

  const handleWindowRecycle = () => {
    setGameMarket((prev) => !prev);
    setOpenWindows((prev) => {
      const newWindows = prev.filter((w) => w !== UI_ELEMENTS.gameMarket.title);
      return [...newWindows, UI_ELEMENTS.gameMarket.title];
    });
  };

  const handleStartMenu = () => {
    setStartMenu((prev) => !prev);
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
        </div>
      </div>
      {showStartMenu && <StartMenu handleStartMenu={handleStartMenu} />}
      <BottomBar handleStartMenu={handleStartMenu} />
    </Screen>
  );
}

export default App;
