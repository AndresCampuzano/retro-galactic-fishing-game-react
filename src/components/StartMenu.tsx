import OutsideClickHandler from "react-outside-click-handler";

export const StartMenu = ({
  onCloseStartMenu,
}: {
  onCloseStartMenu: () => void;
}) => {
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

        <a
          href="https://www.linkedin.com/in/andres-campuzano-garzon/"
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black no-underline hover:bg-[#031860] hover:text-[#fafafa]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="images/linkedin.png" alt="linkedin icon" width="35px" />
          <p className="ml-[10px] text-[1.2rem]">Linkedin</p>
        </a>

        <a
          href="https://github.com/AndresCampuzano"
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black no-underline hover:bg-[#031860] hover:text-[#fafafa]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="images/github.png" alt="github icon" width="35px" />
          <p className="ml-[10px] text-[1.2rem]">GitHub</p>
        </a>

        <a
          href="mailto:andres.campuzano@icloud.com"
          className="flex items-center px-[15px] py-[5px] w-full h-[60px] cursor-pointer text-black no-underline hover:bg-[#031860] hover:text-[#fafafa]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="images/email.png" alt="email icon" width="35px" />
          <p className="ml-[10px] text-[1.2rem]">Email</p>
        </a>
      </div>
    </OutsideClickHandler>
  );
};
