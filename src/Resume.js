// src/Resume.js

import React from 'react';
import './css/resume.css';  // Import your main CSS

function Resume() {
    return (
        <div>
            <header>
                <div className="container">
                    <h1>👨🏻‍🔬 Resume (CV) | Jasur Anorkulov | Electronics Engineer</h1>
                    <div className="contact-info">
                        <p>Phone: +998 99 *********** | Email: <a href="mailto:jasur@graduate.org">jasur@graduate.org</a></p>
                        <p>Address: Uzbekistan, Samarkand, ************************</p>
                        <p>Date of Birth: ************</p>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <section>
                        <h2>A Bit About Me</h2>
                        <div className="image-container">
                            <div className="image-flipper">
                                <img id="imageSwitcher" alt="@jasurjacob" width="350" height="350" className="flipping-image" />
                            </div>
                        </div>
                        <div className="men">
                            <b>Hello!</b> I'm <b>Jasur</b>, the electronics nerd keeping trains running 🚄. When I'm not busy with circuits, you'll find me coding, photoshopping, video editing, clowning 🤡, eating like there's no tomorrow 🍕🍝, podcasting, teaching, and of course, playing chess ♟️. I'm all about traveling ✈️, picking up new languages 🏌🏻‍♂️📚, and enjoying life 🍹🏖️. Wanna know more? Check the website and play around :)
                        </div>
                    </section>

                    <section>
                        <h2>Work/Education Experience</h2>
                        <ul>
                            <li><b>5️⃣ Masters (Postgraduate) Student at Woosong University</b><br />September 2024 - Current</li>
                            <li><b>4️⃣ Electronics Engineer at Locomotive Depot Uzbekistan (Samarkand branch)</b><br />November 2023 - September 2024</li>
                            <li><b>3️⃣ Masters (Postgraduate) Student at University of Liverpool</b><br />September 2022 - November 2023</li>
                            <li><b>2️⃣ Electronics Engineer at Locomotive Depot Uzbekistan (Tashkent)</b><br />June 2019 - September 2022</li>
                            <li><b>1️⃣ Undergraduate Student at Tashkent Institute of Railway Engineers</b><br />September 2015 - June 2019</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Download my CV</h2>
                        <section className="download-section">
                            <a href="Jasur_Anorkulov_CV_2024.pdf" className="download-btn">🔽 Download CV</a>
                        </section>
                    </section>

                    <div className="container">
                        <section>
                            <h2>Business Card</h2>
                            <div className="card-container">
                                <div className="business-card" id="business-card">
                                    <div className="front">
                                        <img src="jasurlive/img/front.png" alt="Business Card Front" />
                                    </div>
                                    <div className="back">
                                        <img src="jasurlive/img/back.png" alt="Business Card Back" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Download my Business Card</h2>
                            <section className="download-section">
                                <a href="business_card.pdf" className="download-btn2">🔽 Download BC</a>
                            </section>
                        </section>
                    </div>
                    <section className="download-section"></section>
                    <section className="download-section"></section>
                    <section className="download-section"></section>
                </div>
            </main>

            <ul className="menu">
                <li><a href="/">&#127969; HOME</a></li>
                <li><a href="/resume">&#128373; RESUME</a></li>
                <li><a href="https://jasurcv.blogspot.com/">&#128092; PORTFOLIO</a></li>
                <li><a href="/awards">&#127891; AWARDS</a></li>
                <li><a href="https://jasurgraduate.blogspot.com/">&#x1F334; BLOGS</a></li>
            </ul>

            <script src="scripts.js"></script>

            <div id="password-modal" style={{ display: 'none' }}>
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2>Enter Password</h2>
                    <input type="password" id="password-input" placeholder="Enter password" />
                    <button id="submit-password">Submit</button>
                    <div id="error-message" style={{ color: 'red', display: 'none' }}></div> {/* Error message container */}
                </div>
            </div>
        </div>
    );
}

export default Resume;
