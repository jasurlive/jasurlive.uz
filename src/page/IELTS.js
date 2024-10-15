import React from 'react';

function Portfolio() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* Iframe that loads the external website */}
            <iframe
                src="https://jasurgraduate.github.io/IELTS/" // Replace with your target URL
                title="IELTS"
                style={{
                    width: '100%',
                    height: 'calc(100% - 60px)', // Reduce height to leave space for the bottom menu (adjust 60px as needed)
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                loading="lazy"
            ></iframe>

            {/* Bottom navigation menu */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '60px', // Adjust height as needed
                backgroundColor: '#fff', // Adjust color as needed
                zIndex: 1,
                boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', // Optional: Add a shadow for better separation
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            </div>
        </div>
    );
}

export default Portfolio;
