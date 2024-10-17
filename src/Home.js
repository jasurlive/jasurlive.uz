import React from 'react';
import './css/home.css';
import confetti from 'canvas-confetti';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {



    // Confetti options and trigger function
    let clickQueue = [];   // Queue to hold click events
    let isConfettiRunning = false; // Flag to check if confetti is currently running

    const handleConfettiClick = () => {
        // Add a new click event to the queue
        clickQueue.push(true);

        // If confetti is already running, don't start a new cycle
        if (!isConfettiRunning) {
            triggerConfettiQueue();  // Process the queue
        }
    };

    const triggerConfettiQueue = () => {
        if (clickQueue.length > 0) {
            // Set confetti running flag
            isConfettiRunning = true;

            // Remove the first item from the queue (simulate a click being handled)
            clickQueue.shift();

            const confettiCount = 10; // Increase confetti particles for more visual effect
            const colors = [
                '#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffdd00',
                '#ff00ff', '#00ffff', '#ff6600', '#6600ff', '#33cc33'
            ]; // Added more custom colors

            // Use multiple bursts to cover the entire top width
            const defaults = {
                origin: { y: -3 },      // Start at the top of the page
                gravity: 1.1,          // Slightly lower gravity for slower fall
                spread: 200,            // Slightly wider spread for better coverage
                scalar: 1.2,           // Increase scaling factor for larger particles
                colors: colors,        // Use extended colors array
                shapes: ['square', 'circle', 'triangle', 'star', 'polygon'] // New shapes for the confetti particles
            };

            // Emit particles across the top width of the page
            for (let i = 0; i < confettiCount; i++) {
                confetti({
                    ...defaults,
                    origin: {
                        x: Math.random(),      // Randomize horizontal position (across the width of the screen)
                        y: 0                   // Start from the top (y = 0)
                    },          // Emit particles one by one
                    ticks: 1000,                 // Increase particle lifespan to make them visible longer
                    scalar: Math.random() * 1.5 + 0.5 // Randomize size between 0.5x to 2x for variety
                });
            }

            // Set a timeout for 1 second before processing the next item in the queue
            setTimeout(() => {
                triggerConfettiQueue(); // Trigger the next confetti burst in queue
            }, 1000);
        } else {
            // Reset the flag once the queue is empty
            isConfettiRunning = false;
        }
    };


    return (
        <div>
            <div>
                <div className="logo">
                    <Link to="/"><img src="img/logo.png" alt="@jasurjacob" width="260" height="50" />
                    </Link>
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
                            Hello. This is my new replica website
                        </div></div>

                    {/* Profile Images Section */}
                    <div className="container-profile-pic">
                        <img src="img/pic.png" alt="" className="profile-pic" />
                        <img src="img/pic4.png" alt="" className="profile-pic" />
                        <img src="img/pic2.png" alt="" className="profile-pic" />
                        <img src="img/pic3.png" alt="" className="profile-pic" />
                        <img src="img/pic7.png" alt="" className="profile-pic" />
                        <img src="img/pic6.jpg" alt="" className="profile-pic" />
                    </div>

                    {/* Skills Section */}
                    <div className="container-skills">
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
                            <h4>Microsoft Office</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '90%' }}>90%</div>
                            </div>
                            <h4>Arduino, MatLAB</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '65%' }}>65%</div>
                            </div>



                            <h4>Visual Studio Code (JS,HTML,CSS,PHP,Python 🆕)</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}>75%</div>
                            </div>
                            <h4>Photoshop</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '70%' }}>70%</div>
                            </div>

                            <h4>Filmora, Premier Pro</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}>75%</div>
                            </div>

                            <h4>Audacity</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '60%' }}>60%</div>
                            </div>
                        </div>

                        <div className="container-travel-map">
                            <iframe src="https://jasurgraduate.github.io/itravel/" title="My Travel Map"></iframe>
                        </div>

                        <h5>Battle of DJs 🎧🖤:</h5>
                        <div className="container-DJ">
                            <iframe src="https://jasurgraduate.github.io/DJ" title="DJ Jasur"></iframe>
                        </div>

                        {/* Web Projects Section */}
                        <div className="container-web-projects">
                            <h5>Web Projects:</h5>
                            <a href="https://jasurgraduate.github.io/Hangul/" className="btn">
                                &#10148; <div className="iconz">📄</div>Get a Hangul Certificate 🆕
                            </a>
                            <a href="https://jasurgraduate.github.io/DJ" className="btn">
                                &#10148; <div className="iconz">🎧</div>Become a DJ 🆕
                            </a>
                            <a href="https://jasurgraduate.github.io/itravel" className="btn">
                                &#10148; <div className="iconz">🗺️</div>Travel Map 🆕
                            </a>
                            <a href="https://jasurgraduate.github.io/IELTS/" className="btn">
                                &#10148; <div className="iconz">💻</div> CD IELTS Preparation
                            </a>
                            <a href="https://jasurgraduate.github.io/LATIN_TO_CYRILLIC/" className="btn">
                                &#10148; <div className="iconz">🔁</div> Latin-Cyrillic Converter
                            </a>
                            <a href="https://jasurgraduate.github.io/chess" className="btn">
                                &#10148; <div className="iconz">♟️</div> Play Chess
                            </a>
                            <a href="https://jasurgraduate.github.io/to-do-list" className="btn">
                                &#10148; <div className="iconz">✅</div> Grocery List
                            </a>
                        </div>
                    </div>
                </main>
            </div>


        </div>
    );
}

export default Home;
