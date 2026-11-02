import { useState } from "react";

const BLOG = "https://destinero.vercel.app/itravelmap/";

export default function Blogs() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map">
      <div className="map-frame">
        {!loaded && <p className="page-status">Loading a map…</p>}

        <iframe
          src={BLOG}
          title="Jasur's travel map"
          allow="geolocation; clipboard-read; clipboard-write"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}