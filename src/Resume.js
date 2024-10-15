import React, { useState, useEffect } from 'react';
import './css/resume.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Resume() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCardFlipped, setIsCardFlipped] = useState(false); // State for business card flip

    const images = [
        'img/istanbul.jpg',
        'img/pic.png',
        'img/pic1.png',
        'img/pic2.png',
        'img/pic3.png',
        'img/pic4.png',
        'img/pic5.png',
        'img/pic7.png'
    ];

    useEffect(() => {
        const savedIndex = localStorage.getItem('currentImageIndex');
        if (savedIndex) {
            setCurrentImageIndex(parseInt(savedIndex));
        }
    }, []);

    const handleFlipperClick = () => {
        setIsFlipped(true);
        setTimeout(() => {
            const newIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(newIndex);
            localStorage.setItem('currentImageIndex', newIndex);
            setIsFlipped(false);
        }, 300);
    };

    const handleCardClick = () => {
        setIsCardFlipped(!isCardFlipped);
    };

    return (
        <div>
            <div className="logo">
                <Link to="/"><img src="img/logo.png" alt="@jasurjacob" width="260" height="50" />
                </Link>
            </div>
            <div className="header-resume">
                <div className="container-resume">
                    <h1>👨🏻‍🔬 Resume (CV) | Jasur Anorkulov | Electronics Engineer</h1>
                    <div className="contact-info">
                        <p>Phone: +998 99 *********** | Email: <a href="mailto:jasur@graduate.org">jasur@graduate.org</a></p>
                        <p>Address: Uzbekistan, Samarkand, ************************</p>
                        <p>Date of Birth: ************</p>
                    </div>
                </div>
            </div>

            <main>
                <div className="container-resume">
                    <section>
                        <h2>A Bit About Me</h2>
                        <div className="image-container">
                            <div className={`image-flipper ${isFlipped ? 'flipped' : ''}`} onClick={handleFlipperClick}>
                                <img id="imageSwitcher" src={images[currentImageIndex]} alt="" width="350" height="350" className="flipping-image" />
                            </div>
                        </div>
                        <div className="aboutme-resume">
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

                    {/* Removed Download CV Section */}


                    <section>
                        <h2>Business Card</h2>
                        <div className="card-container">
                            <div className={`business-card ${isCardFlipped ? 'flipped' : ''}`} id="business-card" onClick={handleCardClick}>
                                <div className="front">
                                    <img src="img/front.png" alt="" />
                                </div>
                                <div className="back">
                                    <img src="img/back.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Removed Download BC Section */}

                </div>
            </main>
        </div>
    );
}

export default Resume;
