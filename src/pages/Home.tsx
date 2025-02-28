import Online from '../add/tools/Online';
import CustomSlider from '../add/tools/Slider';
import Skills from '../add/tools/Skills';
import Projects from '../add/tools/Projects';
import UpDown from '../add/tools/UpDown';
import SMS from '../add/tools/SMS';
import Header from '../add/tools/Header';
import FramedMap from '../add/iframe/TravelMap';
import Logo from '../add/tools/Logo';

import '../add/css/logo.css';
import '../add/css/home.css';

const Home: React.FC = () => {
    return (
        <div>
            <Logo />
            <main>
                <Header />
                {/* Important Sections */}
                <SMS />
                <CustomSlider />
                <Skills />
                <UpDown />
                <FramedMap />
                {/* Web Projects Section */}
                <Projects />
                <div className="container-line-home"></div>
                <div className="container-DJ">
                    <iframe src="https://jasurgraduate.github.io/DJ" title="DJ Jasur"></iframe>
                </div>
                {/* Online Users Section */}
                <div className="container-online-users">
                    <Online />
                </div>
            </main>
        </div>
    );
}

export default Home;