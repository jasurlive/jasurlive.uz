
import '../css/home.css';

const webProjectsData = [

    {
        name: 'CD IELTS Preparation',
        url: 'https://ieltslive.vercel.app/',
        icon: '💻',
        description: 'CD IELTS Prep (IELTSLive) 🆕',
    },
    {
        name: 'Music Playlist (DJ)',
        url: 'https://playlistgo.vercel.app/',
        icon: '🎧',
        description: 'DJ YouTube (PlaylistGo) 🆕',
    },
    {
        name: 'Travel Map',
        url: 'https://destinero.vercel.app/',
        icon: '🗺️',
        description: 'Travel Map (Destinero) 🆕',
    },
    {
        name: 'Get a Hangul Certificate',
        url: 'https://jasurgraduate.github.io/Hangul/',
        icon: '📄',
        description: 'Get a Hangul Certificate',
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
    
    {
        name: 'Make Framed Pictures',
        url: 'https://jasurgraduate.github.io/photo-frame/',
        icon: '🖼️',
        description: 'Make Framed Pictures',
    },
];

function Projects() {
    return (
        <div className="container-web-projects">
            <h1>Web Projects:</h1>
            {webProjectsData.map((project, index) => (
                <a href={project.url} className="web-project-link" key={index}>
                    <div className="iconz">{project.icon} </div> {project.description}
                </a>
            ))}
        </div>
    );
}

export default Projects;
