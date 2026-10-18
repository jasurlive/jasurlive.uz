import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const BLOG = "https://jasurlive.blogspot.com/";

export default function Blogs() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="blog">
      <div className="blog-bar">
        <h1>Blog</h1>
        <a className="chip" href={BLOG} target="_blank" rel="noreferrer">
          open in new tab <FiExternalLink />
        </a>
      </div>

      <div className="blog-frame">
        {!loaded && <p className="page-status">Loading blog…</p>}
        <iframe src={BLOG} title="Jasur's blog" onLoad={() => setLoaded(true)} />
      </div>
    </main>
  );
}
