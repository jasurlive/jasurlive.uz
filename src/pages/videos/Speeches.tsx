import React, { useState, useEffect } from "react";
import "../../add/css/speeches.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

interface VideoLink {
  title: string;
  videoId: string; // full YouTube URL
  description: string;
  date: string;
  url?: string;
}

const Speeches: React.FC = () => {
  const videoLinks: VideoLink[] = [
    {
      title: "Graduation Interview at Woosong University",
      videoId: "https://youtu.be/0wzbNb0-Iaw",
      description:
        "Highlighting the impact of the KGSP program on global railway systems.",
      date: "August 2025",
    },

    {
      title: "Farewell Speech at Solbridge International Business School",
      videoId: "https://youtu.be/ql98k916P38",
      description: "Highlighting the key moments of our life in South Korea",
      date: "June 2025",
    },

    {
      title: "👨🏻‍🎓 Graduation Speech Shorts",
      videoId: "https://youtube.com/shorts/qUKU_80dIwY",
      description:
        "Just mumbling about something in my graduation speech. Woosong University.",
      date: "August 2025",
    },

    {
      title: "Speech at a Conference in Seoul",
      videoId: "https://youtube.com/shorts/DAOv3IKZz4w",
      description:
        "Presenting insights on technology and innovation in Uzbekistan Railways.",
      date: "November 2024",
    },
    {
      title: "Resonse Speech as a representative",
      videoId: "https://youtube.com/shorts/36-68832ogA",
      description:
        "Inspiring (kinda =D) speech delivered at the welcome ceremony.",
      date: "October 2024",
    },
    {
      title: "Receiving my award at a graduation ceremony",
      videoId: "https://youtu.be/vQORjm4dFhY",
      description:
        "Honored to receive the Representative Award at Woosong University.",
      date: "August 2025",
    },
    {
      title: "Highlights of my presentation speech",
      videoId: "https://youtube.com/shorts/0tBfhfbKlRM?feature=share",
      description:
        "Presenting key moments from my recent speech at the conference.",
      date: "December 2024",
    },
  ];

  const [cachedEmbeds, setCachedEmbeds] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const stored = localStorage.getItem("speech_iframe_cache");

    if (stored) {
      setCachedEmbeds(JSON.parse(stored));
      return;
    }

    const newCache: { [key: string]: string } = {};

    videoLinks.forEach((video) => {
      const url = video.videoId;
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/
      );
      const videoId = match ? match[1] : "";
      newCache[video.videoId] = `https://www.youtube.com/embed/${videoId}`;
    });

    setCachedEmbeds(newCache);
    localStorage.setItem("speech_iframe_cache", JSON.stringify(newCache));
  }, []);

  return (
    <div className="speeches-container">
      <h1 className="talks">Talks & Interviews 🎤</h1>

      <main>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 12000,
            disableOnInteraction: false,
          }}
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
            1024: { slidesPerView: 3, spaceBetween: 0 },
          }}
        >
          {videoLinks.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="speech-card">
                <div className="video-container">
                  <iframe
                    src={cachedEmbeds[video.videoId] || ""}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="speech-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <span className="date">{video.date}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
};

export default Speeches;
