import { useState } from 'react';
import '../add/css/awards.css';
import { handleConfettiClick } from '../add/tools/Confetti';
import Logo from '../add/tools/Logo';
import { GiPartyPopper } from "react-icons/gi";

import uol from '../add/media/img/awards/uol.png';
import tuit from '../add/media/img/awards/tuit.png';
import ielts2024 from '../add/media/img/awards/ielts2024.png';
import transcriptuol from '../add/media/img/awards/transcriptuol.png';
import ielts2022 from '../add/media/img/awards/ielts2022.png';
import ielts2019 from '../add/media/img/awards/ielts2019.png';
import krhangul from '../add/media/img/awards/kr-hangul.png';
import uzy from '../add/media/img/awards/uzy.png';


import Social from '../add/tools/Social';
import UpDown from '../add/tools/UpDown';

function Awards() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ imgSrc: '', description: '' });

    const openModal = (imgSrc: string, description: string) => {
        setModalContent({ imgSrc, description });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const awards = [
        {
            imgSrc: krhangul,
            title: "Quiz Completion Certificate",
            description: `A certificate from one of my ReactJS projects. You can also get your own certificate, scan the QR Code in the bottom right corner or <a href="https://jasurgraduate.github.io/Hangul/" target="_blank">click here</a>. \nOctober 2024`
        },
        {
            imgSrc: uzy,
            title: "Ownership Certificate",
            description: "Certificate for my UzY-Loco Application. Issued by the Ministry of Justice of Uzbekistan. \nFor full details, scan the QR Code in the bottom right corner. \nAugust 2024"
        },
        {
            imgSrc: uol,
            title: "Master of Science (Engineering)",
            description: "Award Certificate from the University of Liverpool. Passed with Distinction. December 2023."
        },
        {
            imgSrc: ielts2024,
            title: "IELTS Academic | 2024",
            description: "International English Language Testing System (IELTS) Certificate. Overall 7.5/9.0 \nJune 2024"
        },
        {
            imgSrc: transcriptuol,
            title: "Transcript of Studies",
            description: "The Academic Transcript provides studied modules, marks, and credits during the full year of study at UoL. Overall 72.5/100 \nNovember 2023."
        },
        {
            imgSrc: tuit,
            title: "Bachelor's diploma",
            description: "Award Certificate from the Tashkent Institute of Railway Engineering (From 2021 Tashkent State Transport University). With a specialty in Electrical Engineering, Electromechanics, and Electrotechnologies. \nOverall mark 82/100. \nJune 2019."
        },
        {
            imgSrc: ielts2022,
            title: "IELTS Academic | 2022",
            description: "International English Language Testing System (IELTS) Certificate. Overall 7.0/9.0 \nDecember 2021"
        },
        {
            imgSrc: ielts2019,
            title: "IELTS Academic | 2019 | First attempt",
            description: "International English Language Testing System (IELTS) Certificate. Overall 6.5/9.0 \nMay 2019"
        }
    ];

    return (
        <div>
            <Logo />

            <div className='header-awards'>
                <h1>
                    My Awards 🎓🏆 | Pop
                    <button className="icon-party" id="confettiButton" onClick={handleConfettiClick}>
                        <GiPartyPopper />
                    </button> up!
                </h1>
            </div>

            <main>
                <div className="gallery">
                    {awards.map((award, index) => (
                        <div className="award" key={index} onClick={() => openModal(award.imgSrc, award.description)}>
                            <img src={award.imgSrc} alt={award.title} className="award-image" />
                            <div className="award-description">
                                <h2><strong>{award.title}</strong></h2>
                                <p dangerouslySetInnerHTML={{ __html: award.description.split('\n').join('<br />') }} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {modalOpen && (
                <div id="modal-awards" className="modal-awards" onClick={closeModal}>
                    <span className="close-awards" onClick={closeModal}>❎</span>
                    <img className="modal-content-awards" src={modalContent.imgSrc} alt="Award" />
                </div>
            )}

            <Social />
            <UpDown />
        </div>
    );
}

export default Awards;

