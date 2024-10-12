import React from 'react';
import './css/awards.css';

function Awards() {
    return (
        <div>
            <div className="logo">
                <a href="https://jasurlive.uz">
                    <img src="/jasurlive/img/logo.png" alt="" width="260" height="50" />
                </a>
            </div>

            <div class='header-awards'>
                <h1>
                    My Awards 🎓🏆 | Pop <button className="social-iconz" id="confettiButton">
                        <img src="/jasurlive/img/party.png" alt="Party" />
                    </button> up!
                </h1>
            </div>

            <main>
                <div className="gallery">
                    <div className="award">
                        <img src="/jasurlive/img/awards/uzy.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>Ownership Certificate</h2>
                            <p>
                                Certificate for my UzY-Loco Application. Issued by the Ministry of Justice of Uzbekistan.
                                For full details, scan the QR Code in the bottom right corner.
                                <br />
                                August 2024
                            </p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/uol.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>Master of Science (Engineering)</h2>
                            <p>Award Certificate from the University of Liverpool. Passed with Distinction. December 2023.</p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/ielts2024.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>IELTS Academic | 2024</h2>
                            <p>
                                International English Language Testing System (IELTS) Certificate. Overall 7.5/9.0
                                <br />
                                June 2024
                            </p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/transcriptuol.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>Transcript of Studies</h2>
                            <p>
                                The Academic Transcript provides studied modules, marks, and credits during the full year of study at UoL. Overall 72.5/100
                                <br />
                                November 2023.
                            </p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/tuit.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>Bachelor's diploma</h2>
                            <p>
                                Award Certificate from the Tashkent Institute of Railway Engineering (From 2021 Tashkent State Transport University). With a specialty in Electrical Engineering, Electromechanics, and Electrotechnologies.
                                <br />
                                Overall mark 82/100.
                                <br />
                                June 2019.
                            </p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/ielts2022.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>IELTS Academic | 2022</h2>
                            <p>
                                International English Language Testing System (IELTS) Certificate. Overall 7.0/9.0
                                <br />
                                December 2021
                            </p>
                        </div>
                    </div>

                    <div className="award">
                        <img src="/jasurlive/img/awards/ielts2019.png" alt="" className="award-image" />
                        <div className="award-description">
                            <h2>IELTS Academic | 2019 | First attempt</h2>
                            <p>
                                International English Language Testing System (IELTS) Certificate. Overall 6.5/9.0
                                <br />
                                May 2019
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <ul className="menu">
                <li><a href="/">&#127969; HOME</a></li>
                <li><a href="/resume">&#128373; RESUME</a></li>
                <li><a href="/portfolio">&#128092; PORTFOLIO</a></li>
                <li><a href="/awards">&#127891; AWARDS</a></li>
                <li><a href="https://jasurgraduate.blogspot.com/">&#x1F334; BLOGS</a></li>
            </ul>

            <div id="modal" className="modal-awards">
                <span className="close">&times;</span>
                <img className="modal-content" id="modal-img" alt="" />
                <div id="caption"></div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
            <script src="js/party.js"></script>
            <script src="js/main.js"></script>
        </div>
    );
}

export default Awards;
