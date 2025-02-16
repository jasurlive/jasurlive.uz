import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faWhatsapp, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones, faChess } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div className="social-icons">
                <a href="https://www.chess.com/member/jasurgraduate" className="social-icon">
                    <FontAwesomeIcon icon={faChess} />
                </a>
                <a href="https://github.com/jasurgraduate" className="social-icon">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://t.me/jasurjacob_bot" className="social-icon">
                    <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="https://wa.me/+447775180677" className="social-icon">
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href="https://jasurgraduate.github.io/DJ/" className="social-icon">
                    <FontAwesomeIcon icon={faHeadphones} />
                </a>

            </div>
        </header>
    );
};

export default Header;

