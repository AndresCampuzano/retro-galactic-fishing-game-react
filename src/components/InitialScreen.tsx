import { useEffect, useState } from "react";

export const InitialScreen = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    const data = [
      {
        windows95message:
          "<span>Starting Windows 95..." +
          (isOffline ? "<br/><br/><strong>OFFLINE MODE ENABLED</strong>" : "") +
          "</br/></br/>Windows is bypassing your startup files.</br/></br/>Loading...</br/>Loading...</span>",
      },
    ];

    const allElements = document.getElementsByClassName("typing");
    for (let j = 0; j < allElements.length; j++) {
      const currentElementId = allElements[j].id;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const currentElementIdContent = data[0][currentElementId];
      const element = document.getElementById(currentElementId);
      const devTypeText = currentElementIdContent;

      // type code
      let i = 0,
        isTag,
        text;
      (function type(): void {
        text = devTypeText.slice(0, ++i);
        if (text === devTypeText) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
        const char = text.slice(-1);
        if (char === "<") isTag = true;
        if (char === ">") isTag = false;
        if (isTag) return type();
        setTimeout(type, 30);
      })();
    }
  }, [isOffline]);

  return (
    <div className="initial-screen">
      <img src="images/windows-logo.png" alt="windows 95 logo" width="80px" />
      <br />
      <br />
      <span id="windows95message" className="typing" />
      <span className="blinker">&#32;</span>
    </div>
  );
};
