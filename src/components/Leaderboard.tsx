import { Window } from "./Window.tsx";
import { useWindowDimensions } from "../hooks/useWindowDimensions.ts";

export const Leaderboard = ({
  handleCloseWindow,
  iconImg,
  title,
}: {
  handleCloseWindow: () => void;
  iconImg: string;
  title: string;
}) => {
  const { height, width, isMobile } = useWindowDimensions();

  // Calculate 80% of the screen height and subtract 60px
  const calculatedMaxHeight = height * 0.8 - 60;
  return (
    <Window
      handleCloseWindow={handleCloseWindow}
      img={iconImg}
      title={title}
      defaultPosition={isMobile ? { x: 20, y: 60 } : { x: 120, y: 50 }}
      style={{
        width: isMobile ? width - 30 : width - 200,
        maxWidth: 1000,
        height: calculatedMaxHeight,
      }}
    >
      Content here
    </Window>
  );
};
