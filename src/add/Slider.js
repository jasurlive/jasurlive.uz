import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/slider.css';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../img/profile', false, /\.(png|jpe?g)$/));

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const CustomSlider = () => {
    const shuffledImages = shuffleArray([...images]);

    return (
        <div className="my-slider-container">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true, el: '.swiper-pagination', type: 'progressbar' }}
                scrollbar={{ draggable: true }}
                grabCursor={true}
                speed={800}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 0 },
                    1024: { slidesPerView: 3, spaceBetween: 10 },
                }}
            >
                {shuffledImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt="" className="my-slider-img" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CustomSlider;


