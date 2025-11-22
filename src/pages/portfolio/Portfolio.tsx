import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../../add/css/portfolio.css";
import Logo from "../../add/tools/Logo";
import { GiPartyPopper } from "react-icons/gi";
import { handleConfettiClick } from "../../add/tools/Confetti";

import Social from "../../add/tools/Social";
import UpDown from "../../add/tools/UpDown";

import Speeches from "../videos/Speeches";

const Portfolio = () => {
  const [portfolioPosts, setPortfolioPosts] = useState<any[]>([]);
  const [portfolioSelectedPost, setPortfolioSelectedPost] = useState<
    any | null
  >(null);
  const [portfolioIsFullscreen, setPortfolioIsFullscreen] = useState(false);

  useEffect(() => {
    fetch("data/portfolio/portfolio.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const validPosts = worksheet.filter(
          (post: any) => post.Title && post.Description && post["Image Link"]
        );

        setPortfolioPosts(validPosts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handlers
  const handlePortfolioPostClick = (post: any) =>
    setPortfolioSelectedPost(post);
  const handlePortfolioCloseModal = () => setPortfolioSelectedPost(null);
  const handlePortfolioImageClick = () => setPortfolioIsFullscreen(true);
  const handlePortfolioFullscreenClose = () => setPortfolioIsFullscreen(false);

  // Helpers
  const makePortfolioLinksClickable = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const truncatePortfolioText = (text: string, length: number) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const truncatedText = text
      .split(urlRegex)
      .filter((part) => !urlRegex.test(part))
      .join("");
    return truncatedText.length <= length
      ? truncatedText
      : truncatedText.substring(0, length) + "...";
  };

  const getYoutubeEmbedUrl = (text: string) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = text.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div>
      <Logo />
      <div className="header-portfolio">
        <h1>
          Portfolio 🚮💼🗑️ | Shall we
          <button
            className="icon-party-portfolio"
            id="confettiButton"
            onClick={handleConfettiClick}
          >
            <GiPartyPopper />
          </button>
          ?
        </h1>
      </div>

      <div className="portfolio-container">
        {portfolioPosts.map((post, index) => (
          <div
            key={index}
            className="portfolio-item"
            onClick={() => handlePortfolioPostClick(post)}
          >
            <div className="portfolio-item-image">
              <img src={post["Image Link"]} alt={post.Title} />
            </div>
            <h3>{post.Title}</h3>
            <div className="portfolio-item-details">
              <p>{truncatePortfolioText(post.Description, 70)}</p>
            </div>
          </div>
        ))}

        {portfolioSelectedPost && (
          <div className="portfolio-modal" onClick={handlePortfolioCloseModal}>
            <div
              className="portfolio-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="portfolio-close"
                onClick={handlePortfolioCloseModal}
              >
                ❎
              </span>

              <div className="portfolio-modal-image-container">
                {getYoutubeEmbedUrl(portfolioSelectedPost.Description) ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYoutubeEmbedUrl(portfolioSelectedPost.Description)!}
                    title={portfolioSelectedPost.Title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={portfolioSelectedPost["Image Link"]}
                    alt={portfolioSelectedPost.Title}
                    onClick={handlePortfolioImageClick} // click image to fullscreen
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>

              <h3>Topic: {portfolioSelectedPost.Title}</h3>
              <p className="portfolio-item-description">
                {makePortfolioLinksClickable(portfolioSelectedPost.Description)}
              </p>
            </div>
          </div>
        )}

        {portfolioIsFullscreen &&
          portfolioSelectedPost &&
          !getYoutubeEmbedUrl(portfolioSelectedPost.Description) && (
            <div
              className="portfolio-fullscreen-modal"
              onClick={handlePortfolioFullscreenClose}
            >
              <img
                src={portfolioSelectedPost["Image Link"]}
                alt={portfolioSelectedPost.Title}
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
