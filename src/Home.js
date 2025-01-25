import React from 'react';
import './css/home.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Online from './Online';
import CustomSlider from './add/Slider';
import { handleConfettiClick } from './add/Confetti';
import Skills from './add/Skills';
import Projects from './add/Projects';

function Home() {
    return (

        <div>
            <div className="logo">
                <Link to="/"><img src="img/logo.png" alt="@jasurjacob" width="260" height="50" /></Link>
            </div>

            <header>
                <h1>Official website | Anorkulov Jasur (자수르)</h1>
                <div className="social-icons">
                    <a href="https://github.com/jasurgraduate" className="social-icon">
                        <img src="img/gth.png" alt="" />
                    </a>
                    <a href="https://t.me/jasurjacob_bot" className="social-icon">
                        <img src="img/tg.png" alt="" />
                    </a>
                    <button className="icon-party" id="confettiButton" onClick={handleConfettiClick}>
                        <img src="img/party.png" alt="Party" />
                    </button>
                    <a href="https://wa.me/+447775180677" className="social-icon">
                        <img src="img/wts.png" alt="" />
                    </a>
                    <a href="https://jasurgraduate.github.io/DJ/" className="social-icon">
                        <img src="img/dj.png" alt="" />
                    </a>
                </div>
            </header>

            <main>
                <div className="containerSMS">
                    <div className="SMS">
                        I tried my best, but my best wasn`t enough...
                    </div>
                </div>

                {/* Profile Images Section */}
                <CustomSlider />


                {/* Skills Section */}
                <Skills />

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