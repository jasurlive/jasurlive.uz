import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/home.css';

import pic from '../img/profile/brtower.png';
import pic1 from '../img/profile/wanda.png';
import pic2 from '../img/profile/paris.png';
import pic3 from '../img/profile/bernab.jpg';
import pic4 from '../img/profile/fifacard.png';
import pic5 from '../img/profile/innerp.png';
import pic6 from '../img/profile/octconfer.jpg';
import pic7 from '../img/profile/jasur7.png';
import pic8 from '../img/profile/seoulconfer.jpg';
import pic9 from '../img/profile/speechuz.jpg';
import pic10 from '../img/profile/solbridge.jpg';
import pic11 from '../img/profile/bernab2.jpg';
import pic12 from '../img/profile/istanbul.jpg';
import pic13 from '../img/profile/krculture.jpg';
import pic14 from '../img/profile/soldier.jpg';
import pic15 from '../img/profile/suwon.jpg';
import pic16 from '../img/profile/travel.jpg';
import pic17 from '../img/profile/uam.jpg';
import pic18 from '../img/profile/clone.jpg';
import pic19 from '../img/profile/wood.jpg';


const CustomSlider = () => {
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
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                grabCursor={true}
                speed={700}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 0 },
                    1024: { slidesPerView: 3, spaceBetween: 10 },
                }}
            >

                <SwiperSlide>
                    <img src={pic10} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic9} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic11} alt="" className="my-slider-img" />
                </SwiperSlide>


                <SwiperSlide>
                    <img src={pic18} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic19} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic12} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic13} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic14} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic15} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic16} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic17} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic8} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic7} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic6} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic5} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic4} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic3} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic2} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic1} alt="" className="my-slider-img" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pic} alt="" className="my-slider-img" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default CustomSlider;
