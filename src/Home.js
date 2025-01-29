import React from 'react';
import './css/home.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Online from './Online';
import CustomSlider from './add/Slider';
import Skills from './add/Skills';
import Projects from './add/Projects';
import UpDown from './add/UpDown';
import SMS from './add/SMS';
import Header from './add/Header';

function Home() {
    return (

        <div>
            <div className="logo">
                <Link to="/"><img src="img/logo.png" alt="@jasurjacob" width="260" height="50" /></Link>
            </div>


            <Header />


            <main>
                <SMS />

                {/* Important Sections */}
                <CustomSlider />
                <Skills />
                <UpDown />

                <div className="container-travel-map">
                    <iframe src="https://jasurgraduate.github.io/itravel/" title="My Travel Map"></iframe>
                </div>

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