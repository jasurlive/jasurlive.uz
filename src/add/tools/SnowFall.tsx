import React, { useState, useEffect } from 'react';
import Snowfall from "react-snowfall";
import snow from '../media/img/icons/snow.png';
import leaf from '../media/img/icons/leaf.png';
import fall from '../media/img/icons/fall.png';
import sakura from '../media/img/icons/sakura.png';
import leaf2 from '../media/img/icons/leaf2.png';
import snow2 from '../media/img/icons/snow2.png';

const SnowFall: React.FC = () => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        const getSeasonImages = () => {
            const month = new Date().getMonth();
            if (month >= 2 && month <= 4) { // Spring
                return [sakura];
            } else if (month >= 5 && month <= 7) { // Summer
                return [leaf, leaf2];
            } else if (month >= 8 && month <= 10) { // Fall
                return [leaf, fall, leaf2];
            } else { // Winter
                return [snow, snow2];
            }
        };

        const loadImages = (imagePaths: string[]) => {
            const loadedImages: HTMLImageElement[] = [];
            imagePaths.forEach((path) => {
                const img = new Image();
                img.src = path;
                img.onload = () => {
                    loadedImages.push(img);
                    if (loadedImages.length === imagePaths.length) {
                        setImages(loadedImages);
                    }
                };
            });
        };

        loadImages(getSeasonImages());
    }, []);

    if (images.length === 0) {
        return null;
    }

    return (
        <Snowfall
            snowflakeCount={12}
            radius={[0, 20]}
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