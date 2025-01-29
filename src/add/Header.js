import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones, faChess } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <h1>Jasur's attic | </h1>
            <div className="social-icons">
                <a href="https://www.chess.com/member/jasurgraduate" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faChess} />
                </a>
                <a href="https://github.com/jasurgraduate" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://t.me/jasurjacob_bot" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="https://wa.me/+447775180677" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href="https://jasurgraduate.github.io/DJ/" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faHeadphones} />
                </a>
            </div>
        </header>
    );
};

export default Header;

