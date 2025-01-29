import React, { useState, useEffect } from 'react';
import Snowfall from "react-snowfall";
import snowflakeImage from '../img/icons/snow.png';

const SnowFall = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const img = new Image();
        img.src = snowflakeImage;
        img.onload = () => setImages([img]);
    }, []);

    if (images.length === 0) {
        return null; // or a loading spinner
    }

    return (
        <Snowfall
            snowflakeCount={15}
            radius={[0, 30]}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1000,
            }}
            images={images}
        />
    );
};

export default SnowFall;