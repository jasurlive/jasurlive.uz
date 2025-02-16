import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '../css/sms.css';

const messages = [
    "I tried my best, but my best wasn't enough...",
    "I wish I could go back and do it all differently",
    "No one ever really sees the pain behind the smile",
    "The saddest thing in life is wasted talent",
    "I need six months of vacation, twice a year 🙃",
    "Life is short. Smile while you still have teeth 🦷",
    "I`m like a cloud. When I disappear, it`s a beautiful day 🌞",
    "I don`t argue, I just explain why I`m right",
    "I`m on a seafood diet. I see food and I eat it 🍕",
    "I`m so good at sleeping, I can do it with my eyes closed",
    "I learnt a lot from my mistakes. Now I want to make more mistakes to learn more",
    "Sucking at somethin' is the first step towards being sorta good at something",
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
    const [shuffledMessages, setShuffledMessages] = useState(messages);

    useEffect(() => {
        setShuffledMessages(shuffleArray(messages));
    }, []);

    return (
        <div className="containerSMS">
            <div className="SMS">
                {shuffledMessages.length > 0 && (
                    <Typewriter
                        words={shuffledMessages}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={90}
                        deleteSpeed={20}
                        delaySpeed={5000}
                    />
                )}
            </div>
        </div>
    );
};

export default SMS;
