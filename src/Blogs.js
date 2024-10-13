import React from 'react';

function Blogs() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* Iframe that loads the external website */}
            <iframe
                src="https://jasurgraduate.blogspot.com/" // Replace with your target URL
                title="Blogs"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                loading="lazy"
            ></iframe>

            {/* Navigation menu */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
            }}>
                <ul className="menu" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li><a href="/">&#127969; HOME</a></li>
                    <li><a href="/resume">&#128373; RESUME</a></li>
                    <li><a href="https://jasurcv.blogspot.com/">&#128092; PORTFOLIO</a></li>
                    <li><a href="/awards">&#127891; AWARDS</a></li>
                    <li><a href="https://jasurgraduate.blogspot.com/">&#x1F334; BLOGS</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Blogs;
