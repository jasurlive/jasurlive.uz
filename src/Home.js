import React from 'react';
import './css/home.css';  // Your main CSS

function Home() {
    return (
        <div>
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
                        <button className="social-iconz" id="confettiButton">
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
                                <div className="progress" style={{ width: '90%' }}>90%</div>
                            </div>
                            <h4>Arduino, MatLAB</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '65%' }}>65%</div>
                            </div>
                            <h4>Photoshop</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '70%' }}>70%</div>
                            </div>
                            <h4>Audacity</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '60%' }}>60%</div>
                            </div>
                        </div>

                        <div className="container7">
                            <iframe src="https://jasurgraduate.github.io/itravel/" title="My Journeys"></iframe>
                        </div>

                        <h5>Battle of DJs 🎧🖤:</h5>
                        <div className="container8">
                            <iframe src="https://jasurgraduate.github.io/DJ" title="DJ Jasur"></iframe>
                        </div>

                        {/* Web Projects Section */}
                        <div className="container4">
                            <h5>Web Projects:</h5>
                            <a href="https://jasurgraduate.github.io/DJ" className="btn">
                                &#10148; <div className="iconz">🎧</div>Become a DJ 🆕
                            </a>
                            <a href="https://jasurgraduate.github.io/itravel" className="btn">
                                &#10148; <div className="iconz">🗺️</div>Travel Map 🆕
                            </a>
                            <a href="IELTS/" className="btn">
                                &#10148; <div className="iconz">💻</div> CD IELTS Preparation
                            </a>
                            <a href="https://jasurgraduate.github.io/LATIN_TO_CYRILLIC/" className="btn">
                                &#10148; <div className="iconz">🔁</div> Latin-Cyrillic Converter
                            </a>
                            <a href="https://jasurgraduate.github.io/chess" className="btn">
                                &#10148; <div className="iconz">♟️</div> Play Chess
                            </a>
                            <a href="https://jasurlive.uz/list/" className="btn">
                                &#10148; <div className="iconz">✅</div> Grocery List
                            </a>
                        </div>
                    </div>
                </main>
            </div>

            {/* Navigation Menu */}
            <ul className="menu">
                <li><a href="/">&#127969; HOME</a></li>
                <li><a href="/resume">&#128373; RESUME</a></li>
                <li><a href="https://jasurcv.blogspot.com/">&#128092; PORTFOLIO</a></li>
                <li><a href="/awards">&#127891; AWARDS</a></li>
                <li><a href="https://jasurgraduate.blogspot.com/">&#x1F334; BLOGS</a></li>
            </ul>
        </div>
    );
}

export default Home;
