// Projects.js
import React from 'react';
import '../css/home.css';

const webProjectsData = [
    {
        name: 'Music Playlist (DJ)',
        url: 'https://jasurgraduate.github.io/DJ',
        icon: '🎧',
        description: 'Music Playlist (DJ) 🆕',
    },
    {
        name: 'Get a Hangul Certificate',
        url: 'https://jasurgraduate.github.io/Hangul/',
        icon: '📄',
        description: 'Get a Hangul Certificate 🆕',
    },
    {
        name: 'Make Framed Pictures',
        url: 'https://jasurgraduate.github.io/photo-frame/',
        icon: '🖼️',
        description: 'Make Framed Pictures 🆕',
    },
    {
        name: 'Travel Map',
        url: 'https://jasurgraduate.github.io/itravel',
        icon: '🗺️',
        description: 'Travel Map 🆕',
    },
    {
        name: 'CD IELTS Preparation',
        url: 'https://jasurgraduate.github.io/IELTS/',
        icon: '💻',
        description: 'CD IELTS Preparation',
    },
    {
        name: 'Latin-Cyrillic Converter',
        url: 'https://jasurgraduate.github.io/LATIN_TO_CYRILLIC/',
        icon: '🔁',
        description: 'Latin-Cyrillic Converter',
    },
    {
        name: 'Play Chess',
        url: 'https://jasurgraduate.github.io/chess',
        icon: '♟️',
        description: 'Play Chess',
    },
    {
        name: 'To-Do List',
        url: 'https://jasurgraduate.github.io/to-do-list',
        icon: '✅',
        description: 'To-Do List',
    },
];

function Projects() {
    return (
        <div className="container-web-projects">
            <h5>Web Projects:</h5>
            {webProjectsData.map((project, index) => (
                <a href={project.url} className="btn" key={index}>
                    &#10148; <div className="iconz">{project.icon} </div> {project.description}
                </a>
            ))}
        </div>
    );
}

export default Projects;
