import { useState } from "react";

const PLAYER = "https://playlistgo.vercel.app/myplayer";

export default function Playlist() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map">
      <div className="map-frame">
        {!loaded && <p className="page-status">Loading my playlist…</p>}

        <iframe
          src={PLAYER}
          title="Jasur's playlist"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
