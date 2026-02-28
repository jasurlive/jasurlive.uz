import { useState } from "react";
import Kali from "./Kali";
import FullScreenToggle from "../add/tools/FullScreen";
import Social from "../add/tools/Social";
import OrbitDotsLoader from "../add/tools/Spinner";

import "../add/css/blogs.css";


export default function Blogs() {
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <Kali onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="blogs-container">
      {loading && (
        <div className="iframe-loader"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
        }}>
          <OrbitDotsLoader />
        </div>
      )}

      <Social />
      <FullScreenToggle />

      <iframe
        src="https://jasurlive.blogspot.com/"
        title="Blogs"
        onLoad={() => setLoading(false)}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />

      <div className="bottom-bar"></div>
    </div>
  );
}
