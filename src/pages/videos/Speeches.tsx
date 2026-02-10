import { useEffect, useState } from "react";
import "../../add/css/speeches.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

interface SpeechVideo {
  title: string;
  url: string;
  description: string;
  date: string;
}

const videos: SpeechVideo[] = [
  {
    title: "Graduation Interview at Woosong University",
    url: "https://youtu.be/0wzbNb0-Iaw",
    description:
      "Highlighting the impact of the KGSP program on global railway systems.",
    date: "August 2025",
  },
  {
    title: "Farewell Speech at Solbridge International Business School",
    url: "https://youtu.be/ql98k916P38",
    description: "Highlighting the key moments of our life in South Korea",
    date: "June 2025",
  },
  {
    title: "👨🏻‍🎓 Graduation Speech Shorts",
    url: "https://youtube.com/shorts/qUKU_80dIwY",
    description: "Graduation speech at Woosong University",
    date: "August 2025",
  },
  {
    title: "Speech at a Conference in Seoul",
    url: "https://youtube.com/shorts/DAOv3IKZz4w",
    description: "Technology and innovation in Uzbekistan Railways",
    date: "November 2024",
  },
  {
    title: "Response Speech as a Representative",
    url: "https://youtube.com/shorts/36-68832ogA",
    description: "Welcome ceremony speech",
    date: "October 2024",
  },
  {
    title: "Receiving My Graduation Award",
    url: "https://youtu.be/vQORjm4dFhY",
    description: "Representative Award at Woosong University",
    date: "August 2025",
  },
  {
    title: "Presentation Speech Highlights",
    url: "https://youtube.com/shorts/0tBfhfbKlRM",
    description: "Conference presentation highlights",
    date: "December 2024",
  },
];

const getEmbedUrl = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([^?&/]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export default function Speeches() {
  const [embeds, setEmbeds] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const data: Record<string, string> = {};
    videos.forEach((v) => {
      const embed = getEmbedUrl(v.url);
      if (embed) data[v.url] = embed;
    });
    setEmbeds(data);
  }, []);

  return (
    <div className="speeches-container">
      <h1 className="talks">Talks & Interviews 🎤</h1>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        slidesPerView={3}
        centeredSlides
        loop
        navigation
        autoplay={{ delay: 12000, disableOnInteraction: false }}
        pagination={{ type: "progressbar" }}
        scrollbar={{ draggable: true }}
        speed={800}
        breakpoints={{
          320: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.url}>
            <div className="speech-card">
              <div className="video-container">
                <iframe
                  src={embeds[video.url]}
                  title={video.title}
                  onLoad={() => setLoaded((v) => ({ ...v, [video.url]: true }))}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {!loaded[video.url] && <div className="video-loading" />}
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
    </div>
  );
}
