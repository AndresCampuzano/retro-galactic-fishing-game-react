export const ItemDesktop = ({
  onClick,
  img,
  title,
  top,
  left,
  imageSize = 48,
}: {
  onClick: () => void;
  img: string;
  title: string;
  top: number;
  left: number;
  imageSize?: number;
}) => {
  return (
    <div
      onClick={onClick}
      className="absolute flex flex-col items-center text-center cursor-pointer w-[110px] active:border active:border-black active:border-t-white active:border-l-white"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <img
        src={img}
        alt={title}
        style={{ width: imageSize, height: imageSize }}
      />
      <p className="text-center mt-2.5 text-[24px] leading-[0.8]">{title}</p>
    </div>
  );
};
