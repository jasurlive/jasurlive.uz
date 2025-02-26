import Online from './Online';
import CustomSlider from './add/Slider';
import Skills from './add/Skills';
import Projects from './add/Projects';
import UpDown from './add/UpDown';
import SMS from './add/SMS';
import Header from './add/Header';
import FramedMap from './add/iframe/TravelMap';
import Logo from './add/Logo';

import './css/logo.css';
import './css/home.css';

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