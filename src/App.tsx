import { Screen } from "./components/Screen.tsx";
import { BottomBar } from "./components/BottomBar.tsx";
import { ItemDesktop } from "./components/ItemDesktop.tsx";
import { useEffect, useState } from "react";
import { StartMenu } from "./components/StartMenu.tsx";
import { Window } from "./components/Window.tsx";
import { useWindowDimensions } from "./hooks/useWindowDimensions.ts";
import { LeaderboardContent } from "./components/floating-windows-content/LeaderboardContent.tsx";
import { GameMarketContent } from "./components/floating-windows-content/GameMarketContent.tsx";
import { AboutContent } from "./components/floating-windows-content/AboutContent.tsx";
import { PrimaryButton } from "./components/PrimaryButton.tsx";
import { InitialScreen } from "./components/InitialScreen.tsx";
import { useFetch } from "./hooks/useFetch.ts";
import { fetchGameLeaderboard, fetchGameMarket } from "./api/game.service.ts";

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
  const [showStartMenu, setStartMenu] = useState<boolean>(false);
  const [showInitialScreen, setShowInitialScreen] = useState<boolean>(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const { height, width, isMobile } = useWindowDimensions();
  const calculatedMaxHeight = height * 0.8 - 60; // Calculate the max height of the floating window
  const [windowHeight, setWindowHeight] = useState<string | number>(
    calculatedMaxHeight,
  );

  const {
    data: leaderboardData,
    error: leaderboardError,
    loading: leaderboardLoading,
  } = useFetch(fetchGameLeaderboard, true);

  const {
    data: gameMarketData,
    error: gameMarketError,
    loading: gameMarketLoading,
  } = useFetch(fetchGameMarket, true);

  useEffect(() => {
    console.log({
      leaderboardData,
      leaderboardError,
      leaderboardLoading,
    });
  }, [leaderboardData, leaderboardError, leaderboardLoading]);

  useEffect(() => {
    console.log({
      gameMarketData,
      gameMarketError,
      gameMarketLoading,
    });
  }, [gameMarketData, gameMarketError, gameMarketLoading]);

  // Showing initial screen for 3.5 seconds when the page loads
  useEffect(() => {
    setTimeout(() => {
      setShowInitialScreen(false);
    }, 3500);
  }, []);

  /**
   * Resizing the floating windows when the screen size changes
   */
  useEffect(() => {
    if (isMobile) {
      setWindowHeight("100%");
    } else {
      setWindowHeight(calculatedMaxHeight);
    }
  }, [isMobile, calculatedMaxHeight]);

  useEffect(() => {
    // Opening windows when page loads
    setOpenWindows([UI_ELEMENTS.leaderboard.title]);
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
    if (!openWindows.includes(title)) {
      setOpenWindows((prev) => [...prev, title]);
    } else {
      bringWindowToFront(title);
    }
  };

  const onCloseWindow = (title: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== title));
  };

  /**
   * Handle click on floating window to bring it to the front
   */
  const onClickOnAlreadyOpenedWindow = (windowTitle: string) => {
    bringWindowToFront(windowTitle);
  };

  /**
   * Determine z-index for each window based on order in openWindows array
   */
  const getZIndex = (windowTitle: string) => {
    const index = openWindows.indexOf(windowTitle);
    if (index === -1) return 0;
    return index + 1;
  };

  const handleStartMenu = () => {
    setStartMenu((prev) => !prev);
  };

  if (showInitialScreen) {
    return <InitialScreen />;
  }

  return (
    <Screen>
      {/* Items Desktop Grid */}
      <div className="mt-5 grid grid-cols-5 grid-rows-5 grid-flow-col gap-5">
        {/* Draggable Area */}
        <div className="absolute left-0 top-0 right-[1px] flex bottom-[60px] overflow-hidden">
          {/* Icons */}
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.leaderboard.title)}
            img={UI_ELEMENTS.leaderboard.img}
            title={UI_ELEMENTS.leaderboard.title}
            top={5}
            left={5}
          />
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.gameMarket.title)}
            img={UI_ELEMENTS.gameMarket.img}
            title={UI_ELEMENTS.gameMarket.title}
            imageSize={56}
            top={120}
            left={5}
          />
          <ItemDesktop
            onClick={() => onOpenWindow(UI_ELEMENTS.aboutMe.title)}
            img={UI_ELEMENTS.aboutMe.img}
            title={UI_ELEMENTS.aboutMe.title}
            imageSize={56}
            top={245}
            left={5}
          />
          {/* Floating windows */}
          {openWindows.includes(UI_ELEMENTS.leaderboard.title) && (
            <Window
              onClickWindow={() =>
                onClickOnAlreadyOpenedWindow(UI_ELEMENTS.leaderboard.title)
              }
              onCloseWindow={() => onCloseWindow(UI_ELEMENTS.leaderboard.title)}
              img={UI_ELEMENTS.leaderboard.img}
              title={UI_ELEMENTS.leaderboard.title}
              defaultPosition={isMobile ? { x: 0, y: 0 } : { x: 120, y: 50 }}
              style={{
                zIndex: getZIndex(UI_ELEMENTS.leaderboard.title),
                width: isMobile ? width : width - 200,
                maxWidth: 1000,
                height: windowHeight,
              }}
            >
              <LeaderboardContent
                data={leaderboardData}
                loading={leaderboardLoading}
                error={leaderboardError}
              />
            </Window>
          )}

          {openWindows.includes(UI_ELEMENTS.gameMarket.title) && (
            <Window
              onClickWindow={() =>
                onClickOnAlreadyOpenedWindow(UI_ELEMENTS.gameMarket.title)
              }
              onCloseWindow={() => onCloseWindow(UI_ELEMENTS.gameMarket.title)}
              img={UI_ELEMENTS.gameMarket.img}
              title={UI_ELEMENTS.gameMarket.title}
              defaultPosition={isMobile ? { x: 0, y: 0 } : { x: 120, y: 50 }}
              style={{
                zIndex: getZIndex(UI_ELEMENTS.gameMarket.title),
                width: isMobile ? width : width - 200,
                maxWidth: 1000,
                height: windowHeight,
              }}
            >
              <GameMarketContent />
            </Window>
          )}

          {openWindows.includes(UI_ELEMENTS.aboutMe.title) && (
            <Window
              onClickWindow={() =>
                onClickOnAlreadyOpenedWindow(UI_ELEMENTS.aboutMe.title)
              }
              onCloseWindow={() => onCloseWindow(UI_ELEMENTS.aboutMe.title)}
              img={UI_ELEMENTS.aboutMe.img}
              title={UI_ELEMENTS.aboutMe.title}
              defaultPosition={isMobile ? { x: 0, y: 0 } : { x: 120, y: 50 }}
              style={{
                zIndex: getZIndex(UI_ELEMENTS.aboutMe.title),
                width: isMobile ? width : width - 200,
                maxWidth: 1000,
                height: windowHeight,
              }}
            >
              <AboutContent />
            </Window>
          )}
        </div>
      </div>
      {showStartMenu && <StartMenu onCloseStartMenu={handleStartMenu} />}
      <BottomBar>
        <PrimaryButton onClick={handleStartMenu}>
          <img
            src="images/windows-logo.png"
            alt="windows logo"
            className="w-7 h-7 object-contain"
          />
          {!(isMobile && openWindows.length > 2) && <p>Start</p>}
        </PrimaryButton>

        {openWindows.includes(UI_ELEMENTS.leaderboard.title) && (
          <PrimaryButton
            onClick={() =>
              onClickOnAlreadyOpenedWindow(UI_ELEMENTS.leaderboard.title)
            }
          >
            <img
              src={UI_ELEMENTS.leaderboard.img}
              alt={UI_ELEMENTS.leaderboard.title}
              className="w-7 h-7 object-contain"
            />
            <p className="hidden sm:block leading-[0.8]">
              {UI_ELEMENTS.leaderboard.title}
            </p>
          </PrimaryButton>
        )}

        {openWindows.includes(UI_ELEMENTS.gameMarket.title) && (
          <PrimaryButton
            onClick={() =>
              onClickOnAlreadyOpenedWindow(UI_ELEMENTS.gameMarket.title)
            }
          >
            <img
              src={UI_ELEMENTS.gameMarket.img}
              alt={UI_ELEMENTS.gameMarket.title}
              className="w-7 h-7 object-contain"
            />
            <p className="hidden sm:block leading-[0.8]">
              {UI_ELEMENTS.gameMarket.title}
            </p>
          </PrimaryButton>
        )}

        {openWindows.includes(UI_ELEMENTS.aboutMe.title) && (
          <PrimaryButton
            onClick={() =>
              onClickOnAlreadyOpenedWindow(UI_ELEMENTS.aboutMe.title)
            }
          >
            <img
              src={UI_ELEMENTS.aboutMe.img}
              alt={UI_ELEMENTS.aboutMe.title}
              className="w-7 h-7 object-contain"
            />
            <p className="hidden sm:block leading-[0.8]">
              {UI_ELEMENTS.aboutMe.title}
            </p>
          </PrimaryButton>
        )}
      </BottomBar>
    </Screen>
  );
}

export default App;
