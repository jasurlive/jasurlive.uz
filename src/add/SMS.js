import React, { useState, useEffect } from 'react';
import TypingEffect from 'react-typing-effect';
import '../css/sms.css';

// Original list of messages
const messages = [
    "I tried my best, but my best wasn't enough...",
    "I wish I could go back and do it all differently",
    "No one ever really sees the pain behind the smile",
    "The saddest thing in life is wasted talent",
    "I need six months of vacation, twice a year",
    "Life is short. Smile while you still have teeth",
    "I`m like a cloud. When I disappear, it`s a beautiful day",
    "I`m not arguing, I`m just explaining why I`m right",
    "I`m on a seafood diet. I see food and I eat it",
    "I`m so good at sleeping, I can do it with my eyes closed",
];

const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const SMS = () => {
    const [shuffledMessages, setShuffledMessages] = useState([]);

    // Shuffle the messages when the component is mounted
    useEffect(() => {
        setShuffledMessages(shuffleArray(messages));
    }, []);

    return (
        <div className="containerSMS">
            <div className="SMS">
                <TypingEffect
                    text={shuffledMessages}
                    speed={100}
                    eraseDelay={5000}
                    eraseSpeed={20}
                    cursor="|"
                    typingDelay={500}
                />
            </div>
        </div>
    );
};

export default SMS;
