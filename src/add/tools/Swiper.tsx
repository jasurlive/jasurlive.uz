import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "../css/swiper.css";
import "swiper/css";
import "swiper/css/navigation";

const importAll = async (): Promise<string[]> => {
  const images = import.meta.glob("../media/img/profile/*.{png,jpg,jpeg}", {
    eager: true,
  }) as Record<string, { default: string }>;
  return Object.values(images).map((img) => img.default);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CustomSwiper: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    importAll().then((imgs) => {
      setImages(shuffleArray(imgs));
    });
  }, []);

  return (
    <div className="my-swiper-container">
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
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "progressbar",
        }}
        scrollbar={{ draggable: true }}
        grabCursor={true}
        speed={800}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="" className="my-swiper-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
