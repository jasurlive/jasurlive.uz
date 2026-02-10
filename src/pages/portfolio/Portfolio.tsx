import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../../add/css/portfolio.css";
import Logo from "../../add/tools/Logo";
import { GiPartyPopper } from "react-icons/gi";
import { ImSpinner2 } from "react-icons/im";
import { handleConfettiClick } from "../../add/tools/Confetti";
import Social from "../../add/tools/Social";
import UpDown from "../../add/tools/FullScreen";

const Portfolio = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("data/portfolio/portfolio.xlsx", { cache: "no-store" })
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const wb = XLSX.read(data, { type: "array" });
        const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        const validPosts = ws.filter(
          (p: any) => p.Title && p.Description && p["Image Link"],
        );
        setImageLoaded(
          Object.fromEntries(
            validPosts.map((p: any) => [p["Image Link"], false]),
          ),
        );
        setPosts(validPosts);
      });
  }, []);

  const makeLinksClickable = (text: string) =>
    text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
      /(https?:\/\/[^\s]+)/.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      ),
    );

  const truncateText = (text: string, length: number) => {
    const plain = text.replace(/https?:\/\/[^\s]+/g, "");
    return plain.length <= length ? plain : plain.slice(0, length) + "...";
  };

  const getYoutubeEmbed = (text: string) => {
    const match = text.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div>
      <Logo />
      <div className="header-portfolio">
        <h1>
          Portfolio | Shall we
          <button
            className="icon-party-portfolio"
            onClick={handleConfettiClick}
          >
            <GiPartyPopper />
          </button>
          ?
        </h1>
      </div>

      <div className="portfolio-container">
        {posts.map((post, i) => (
          <div
            key={i}
            className="portfolio-item"
            onClick={() => setSelectedPost(post)}
          >
            <div className="portfolio-item-image">
              {!imageLoaded[post["Image Link"]] && (
                <div className="portfolio-image-loading">
                  <ImSpinner2 className="portfolio-loading-spinner" />
                </div>
              )}
              <img
                src={post["Image Link"]}
                alt={post.Title}
                style={{
                  display: imageLoaded[post["Image Link"]] ? "block" : "none",
                }}
                onLoad={() =>
                  setImageLoaded((prev) => ({
                    ...prev,
                    [post["Image Link"]]: true,
                  }))
                }
                onError={() =>
                  setImageLoaded((prev) => ({
                    ...prev,
                    [post["Image Link"]]: true,
                  }))
                }
              />
            </div>
            <h3>{post.Title}</h3>
            <p>{truncateText(post.Description, 70)}</p>
          </div>
        ))}

        {selectedPost && (
          <div
            className="portfolio-modal"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="portfolio-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="portfolio-close"
                onClick={() => setSelectedPost(null)}
              >
                ❎
              </span>
              {getYoutubeEmbed(selectedPost.Description) ? (
                <iframe
                  src={getYoutubeEmbed(selectedPost.Description)!}
                  title={selectedPost.Title}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={selectedPost["Image Link"]}
                  alt={selectedPost.Title}
                  style={{ cursor: "pointer" }}
                  onClick={() => setFullscreen(true)}
                />
              )}
              <h3>{selectedPost.Title}</h3>
              <p>{makeLinksClickable(selectedPost.Description)}</p>
            </div>
          </div>
        )}

        {fullscreen &&
          selectedPost &&
          !getYoutubeEmbed(selectedPost.Description) && (
            <div
              className="portfolio-fullscreen-modal"
              onClick={() => setFullscreen(false)}
            >
              <img
                src={selectedPost["Image Link"]}
                alt={selectedPost.Title}
                className="portfolio-fullscreen-image"
              />
            </div>
          )}
      </div>

      <Social />
      <UpDown />
    </div>
  );
};

export default Portfolio;
