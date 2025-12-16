import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "../css/swiper.css";
import "swiper/css";
import "swiper/css/navigation";
import { ImSpinner2 } from "react-icons/im";

const selectedImageNames = [
  "octconfer",
  "seoulconfer",
  "krculture",
  "woosong1",
  "woosong12",
  "kgsp",
  "sustainable",
  "amid",
  "uzb",
  "solbridge2",
  "whitesuit",
];

const importSelectedImages = async (): Promise<string[]> => {
  const images = import.meta.glob("../media/img/profile/*.{png,jpg,jpeg}", {
    eager: true,
  }) as Record<string, { default: string }>;
  return Object.entries(images)
    .filter(([path]) => {
      const fileName = path.split("/").pop();
      if (!fileName) return false;
      const baseName = fileName.replace(/\.(png|jpg|jpeg)$/i, "");
      return selectedImageNames.includes(baseName);
    })
    .map(([_, img]) => img.default);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const HomeSwiper: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    importSelectedImages().then((imgs) => {
      const shuffled = shuffleArray(imgs);
      setImages(shuffled);
      const initialLoad: Record<string, boolean> = {};
      shuffled.forEach((img) => (initialLoad[img] = false));
      setLoadedMap(initialLoad);
    });
  }, []);

  const handleImageLoad = (src: string) => {
    setLoadedMap((prev) => ({ ...prev, [src]: true }));
  };

  const slidesPerView = 3;
  const loopEnabled = images.length > slidesPerView;

  return (
    <div className="my-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        loop={loopEnabled}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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
          1024: { slidesPerView: slidesPerView, spaceBetween: 10 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-image-wrapper">
              {!loadedMap[image] && (
                <div className="swiper-image-spinner">
                  <ImSpinner2 className="spinner-icon" />
                </div>
              )}
              <img
                src={image}
                alt=""
                className="my-swiper-img"
                onLoad={() => handleImageLoad(image)}
                style={{ display: loadedMap[image] ? "block" : "none" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
