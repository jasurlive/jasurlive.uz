import { useState, useEffect } from "react";
import Online from "../add/tools/Online";
import HomeSwiper from "../add/tools/SwiperHome";
import Skills from "../add/tools/Skills";
import Projects from "../add/tools/Projects";
import FullScreenToggle from "../add/tools/FullScreen";
import SMS from "../add/tools/SMS";
import FramedMap from "../add/iframe/TravelMap";
import DJ from "../add/iframe/DJ";
import Speeches from "../pages/videos/Speeches";
import Logo from "../add/tools/Logo";
import Social from "../add/tools/Social";
import Code from "../add/tools/Code";
import OrbitDotsLoader from "../add/tools/Spinner";
import "../add/css/home.css";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Show loader until window fully loads
  useEffect(() => {
    const onLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="page-loader">
          <OrbitDotsLoader />
        </div>
      )}

      <div
        className="home-container"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Logo />
        <SMS />
        <HomeSwiper />
        <Speeches />
        <FramedMap />
        <Projects />
        <Online />
        <Social />
        <FullScreenToggle />
      </div>
    </>
  );
};

export default Home;
