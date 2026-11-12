import { useState } from "react";
import { FiPlay } from "react-icons/fi";
import Swiper from "./Swiper";
import { talks, youtubeId, type Talk } from "../data/content";

// shows the thumbnail only; the heavy youtube player loads on tap
function Video({ talk, active }: { talk: Talk; active: boolean }) {
  const [play, setPlay] = useState(false);
  const id = youtubeId(talk.url);

  return (
    <figure className="video">
      <div className="video-frame">
        {play && active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={talk.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button className="video-thumb" onClick={() => active && setPlay(true)} aria-label={`Play ${talk.title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video-play"><FiPlay /></span>
          </button>
        )}
      </div>
      <figcaption>
        <b>{talk.title}</b>
        <span className="muted small">{talk.date}</span>
      </figcaption>
    </figure>
  );
}

export default function Speeches() {
  return (
    <Swiper
      className="swiper-videos"
      items={talks}
      autoplay={0}
      // remount when a slide leaves the center so a playing video stops
      render={(talk, active) => <Video key={String(active)} talk={talk} active={active} />}
    />
  );
}
