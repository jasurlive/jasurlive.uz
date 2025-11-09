import React, { useState, useEffect } from "react";
import "../../add/css/speeches.css"; // ✅ external CSS for styles

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

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
      title: "👨🏻‍🎓 Graduation Speech Shorts",
      videoId: "https://youtube.com/shorts/qUKU_80dIwY",
      description: "Just a mumble of my graduation speech highlights 😆",
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
        "Inspiring (kinda 😅) speech delivered at the welcome ceremony.",
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

  return (
    <div className="speeches-container">
      <h1>🌟 Talks & Speeches</h1>

      <main>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
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
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {videoLinks.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="speech-card">
                <div className="video-container">
                  <iframe
                    src={(() => {
                      // Extract VIDEO_ID from various YouTube URL formats
                      const url = video.videoId;
                      const match = url.match(
                        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/
                      );
                      const videoId = match ? match[1] : "";
                      return `https://www.youtube.com/embed/${videoId}`;
                    })()}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }} // Ensure it takes full width and height
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
