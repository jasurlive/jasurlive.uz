import React from 'react';

function Portfolio() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* Iframe that loads the external website */}
            <iframe
                src="https://jasurcv.blogspot.com/" // Replace with your target URL
                title="Portfolio"
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
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}>

            </div>
        </div>
    );
}

export default Portfolio;
