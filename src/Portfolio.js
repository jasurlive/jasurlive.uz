import React, { useEffect } from 'react';

function Awards() {
    useEffect(() => {
        // Redirect to another website
        window.location.href = 'https://jasurcv.blogspot.com/'; // Replace with your target URL
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>

        </div>
    );

}

export default Awards;
