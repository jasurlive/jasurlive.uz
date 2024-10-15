import React, { useState } from 'react';
import './css/awards.css';
import confetti from 'canvas-confetti'; // Import the canvas-confetti library
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Awards() {
    // State to manage modal visibility and content
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ imgSrc: '', description: '' });

    // Function to open the modal with specific content
    const openModal = (imgSrc, description) => {
        setModalContent({ imgSrc, description });
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

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

    // Award data
    const awards = [
        {
            imgSrc: "img/awards/kr-hangul.png",
            title: "Quiz Completion Certificate",
            description: `A certificate from one of my ReactJS projects. You can also get your own certificate, scan the QR Code in the bottom right corner or <a href="https://jasurgraduate.github.io/Hangul/" target="_blank">click here</a>. \nOctober 2024`
        },
        {
            imgSrc: "img/awards/uzy.png",
            title: "Ownership Certificate",
            description: "Certificate for my UzY-Loco Application. Issued by the Ministry of Justice of Uzbekistan. \nFor full details, scan the QR Code in the bottom right corner. \nAugust 2024"
        },
        {
            imgSrc: "img/awards/uol.png",
            title: "Master of Science (Engineering)",
            description: "Award Certificate from the University of Liverpool. Passed with Distinction. December 2023."
        },
        {
            imgSrc: "img/awards/ielts2024.png",
            title: "IELTS Academic | 2024",
            description: "International English Language Testing System (IELTS) Certificate. Overall 7.5/9.0 \nJune 2024"
        },
        {
            imgSrc: "img/awards/transcriptuol.png",
            title: "Transcript of Studies",
            description: "The Academic Transcript provides studied modules, marks, and credits during the full year of study at UoL. Overall 72.5/100 \nNovember 2023."
        },
        {
            imgSrc: "img/awards/tuit.png",
            title: "Bachelor's diploma",
            description: "Award Certificate from the Tashkent Institute of Railway Engineering (From 2021 Tashkent State Transport University). With a specialty in Electrical Engineering, Electromechanics, and Electrotechnologies. \nOverall mark 82/100. \nJune 2019."
        },
        {
            imgSrc: "img/awards/ielts2022.png",
            title: "IELTS Academic | 2022",
            description: "International English Language Testing System (IELTS) Certificate. Overall 7.0/9.0 \nDecember 2021"
        },
        {
            imgSrc: "img/awards/ielts2019.png",
            title: "IELTS Academic | 2019 | First attempt",
            description: "International English Language Testing System (IELTS) Certificate. Overall 6.5/9.0 \nMay 2019"
        }
    ];

    return (
        <div>
            <div className="logo">
                <Link to="/"><img src="img/logo.png" alt="@jasurjacob" width="260" height="50" />
                </Link>
            </div>

            <div className='header-awards'>
                <h1>
                    My Awards 🎓🏆 | Pop
                    <button className="icon-party" id="confettiButton" onClick={handleConfettiClick}>
                        <img src="img/party.png" alt="Party" />
                    </button> up!
                </h1>
            </div>

            <main>
                <div className="gallery">
                    {/* Generate award items dynamically */}
                    {awards.map((award, index) => (
                        <div className="award" key={index} onClick={() => openModal(award.imgSrc, award.description)}>
                            <img src={award.imgSrc} alt={award.title} className="award-image" />
                            <div className="award-description">
                                <h2><strong>{award.title}</strong></h2>  {/* Wrap the title with <strong> to make it bold */}
                                <p dangerouslySetInnerHTML={{ __html: award.description.split('\n').join('<br />') }} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal for displaying award details */}
            {modalOpen && (
                <div id="modal-awards" className="modal-awards" onClick={closeModal}>
                    <span className="close-awards" onClick={closeModal}>❎</span>
                    <img className="modal-content-awards" id="modal-img" src={modalContent.imgSrc} alt="Award" />
                </div>
            )}
        </div>
    );
}

export default Awards;
