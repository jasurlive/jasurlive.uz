import React from 'react';
import Iframe from 'react-iframe';
import '../css/home.css';

const FramedMap = () => {
    return (
        <div className="container-travel-map">
            <Iframe
                url="https://jasurgraduate.github.io/itravel/"
                width="100%"
                height="100vh"
                styles={{ border: "none" }}
                allow="geolocation"
            />
        </div>
    );
};

export default FramedMap;
