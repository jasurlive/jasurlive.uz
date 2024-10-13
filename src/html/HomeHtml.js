// HomeHtml.js
import React from 'react';

const HomeHtml = ({ handleConfettiClick }) => {
    return (
        <div>
            <div className="logo">
                <a href="https://jasurlive.uz">
                    <img src="/jasurlive/img/logo.png" alt="@jasurjacob" width="260" height="50" />
                </a>
            </div>

            <header>
                <h1>Official website | Anorkulov Jasur (자수르)</h1>
                <div className="social-icons">
                    <a href="https://github.com/jasurgraduate" className="social-icon">
                        <img src="/jasurlive/img/gth.png" alt="" />
                    </a>
                    <a href="https://t.me/jasurjacob_bot" className="social-icon">
                        <img src="/jasurlive/img/tg.png" alt="" />
                    </a>
                    <button className="icon-party" id="confettiButton" onClick={handleConfettiClick}>
                        <img src="/jasurlive/img/party.png" alt="Party" />
                    </button>
                    <a href="https://wa.me/+447775180677" className="social-icon">
                        <img src="/jasurlive/img/wts.png" alt="" />
                    </a>
                    <a href="https://jasurgraduate.github.io/DJ/" className="social-icon">
                        <img src="/jasurlive/img/dj.png" alt="" />
                    </a>
                </div>
            </header>

            <main>
                <div className="container3">
                    <div id="typing-text"></div>
                </div>

                {/* Profile Images Section */}
                <div className="container">
                    <img src="/jasurlive/img/pic.png" alt="" className="profile-pic" />
                    <img src="/jasurlive/img/pic4.png" alt="" className="profile-pic" />
                    <img src="/jasurlive/img/pic2.png" alt="" className="profile-pic" />
                    <img src="/jasurlive/img/pic3.png" alt="" className="profile-pic" />
                    <img src="/jasurlive/img/pic7.png" alt="" className="profile-pic" />
                    <img src="/jasurlive/img/pic6.jpg" alt="" className="profile-pic" />
                </div>

                {/* Skills Section */}
                <div className="container2">
                    <h5>The software I use:</h5>
                    <div className="column">
                        <h4>CAD (Creo, AutoCAD, Blender)</h4>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '90%' }}>90%</div>
                        </div>
                        <h4>Robotstudio</h4>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '90%' }}>90%</div>
                        </div>
                        <h4>Visual Studio Code (JS,HTML,CSS,PHP,Python 🆕)</h4>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '70%' }}>70%</div>
                        </div>
                        <h4>Filmora, Premier Pro</h4>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '75%' }}>75%</div>
                        </div>
                        <h4>Microsoft Office</h4>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '80%' }}>80%</div>
                        </div>
                    </div>
                </div>

                {/* Web Projects Section */}
                <div>
                    <h5>Web Projects:</h5>
                    <div className="container6">
                        <iframe src="https://jasurgraduate.github.io/my_website/" title="My Web Projects"></iframe>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomeHtml;
