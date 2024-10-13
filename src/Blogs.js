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

            </div>
        </div>
    );
}

export default Blogs;
