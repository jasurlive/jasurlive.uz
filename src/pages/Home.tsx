import Online from "../add/tools/Online";
import Swiper from "../add/tools/Swiper";
import Skills from "../add/tools/Skills";
import Projects from "../add/tools/Projects";
import UpDown from "../add/tools/UpDown";
import SMS from "../add/tools/SMS";
import FramedMap from "../add/iframe/TravelMap";
import DJ from "../add/iframe/DJ";
import Speeches from "../pages/videos/Speeches";
import Logo from "../add/tools/Logo";
import "../add/css/home.css";
import Social from "../add/tools/Social";
import Code from "../add/tools/Code";

const Home: React.FC = () => {
  return (
    <div>
      <Logo />
      <main>
        <SMS />
        <Swiper />
        <Speeches />

        <Skills />
        <Code />

        <FramedMap />
        <Projects />
        <Online />
        <Social />
        <UpDown />
      </main>
    </div>
  );
};

export default Home;
