import React from 'react';
import '../css/logo.css';
import deadpool from '../img/icons/deadpool-mini.png';

// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo-jasurlive" onClick={() => window.location.href = "/"}>
            <div className="logo-text"><img src={deadpool} alt="Jasur's logo" className='deadpool' /> jasurlive.uz | Jasur's attic</div>
        </div>
    );
};

export default Logo;

