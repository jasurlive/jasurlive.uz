import { useState, useEffect } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import "../css/fullscreen.css";

const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fullscreen-button" onClick={toggleFullScreen}>
      {isFullScreen ? (
        <BsFullscreenExit className="fullscreen-icon" />
      ) : (
        <BsFullscreen className="fullscreen-icon" />
      )}
    </div>
  );
};

export default FullScreenToggle;
