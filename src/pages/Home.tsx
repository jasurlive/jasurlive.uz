import Online from '../add/tools/Online';
import CustomSlider from '../add/tools/Slider';
import Skills from '../add/tools/Skills';
import Projects from '../add/tools/Projects';
import UpDown from '../add/tools/UpDown';
import SMS from '../add/tools/SMS';
import Header from '../add/tools/Header';
import FramedMap from '../add/iframe/TravelMap';
import DJ from '../add/iframe/DJ';
import Logo from '../add/tools/Logo';

import '../add/css/logo.css';
import '../add/css/home.css';

const Home: React.FC = () => {
    return (
        <div>
            <Logo />
            <main>
                <Header />
                <SMS />
                <CustomSlider />
                <Skills />
                <UpDown />
                <FramedMap />
                <Projects />
                <DJ />
                <Online />
            </main>
        </div>
    );
}

export default Home;