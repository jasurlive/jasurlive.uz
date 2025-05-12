import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../../add/css/portfolio.css";
import Logo from "../../add/tools/Logo";
import { GiPartyPopper } from "react-icons/gi";
import { handleConfettiClick } from "../../add/tools/Confetti";
import { SlSizeFullscreen } from "react-icons/sl";

import Social from "../../add/tools/Social";
import UpDown from "../../add/tools/UpDown";

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
        if (worksheet.length === 0) {
          throw new Error("Invalid HTML: could not find <table>");
        }
        const validPosts = worksheet.filter(
          (post: any) =>
            post.Title &&
            post.Description &&
            post["Image Link"] &&
            post["Date & Time"]
        );
        const sortedPosts = validPosts.sort(
          (a: any, b: any) =>
            new Date(b["Date & Time"]).getTime() -
            new Date(a["Date & Time"]).getTime()
        );
        setPortfolioPosts(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePortfolioPostClick = (post: any) => {
    setPortfolioSelectedPost(post);
  };

  const handlePortfolioCloseModal = () => {
    setPortfolioSelectedPost(null);
  };

  const handlePortfolioFullscreenClick = () => {
    setPortfolioIsFullscreen(true);
  };

  const handlePortfolioFullscreenClose = () => {
    setPortfolioIsFullscreen(false);
  };

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
    if (truncatedText.length <= length) return truncatedText;
    return truncatedText.substring(0, length) + "...";
  };

  return (
    <div>
      <Logo />
      <div className="header-portfolio">
        <h1>
          Trash Portfolio 🚮💼🗑️ | Shall we
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
                <img
                  src={portfolioSelectedPost["Image Link"]}
                  alt={portfolioSelectedPost.Title}
                />
                <button
                  className="portfolio-fullscreen-icon"
                  onClick={handlePortfolioFullscreenClick}
                >
                  <SlSizeFullscreen />
                </button>
              </div>
              <h3>Topic: {portfolioSelectedPost.Title}</h3>
              <strong>📢:</strong> {portfolioSelectedPost["Date & Time"]}
              <p className="portfolio-item-description">
                {makePortfolioLinksClickable(portfolioSelectedPost.Description)}
              </p>
              <p></p>
            </div>
          </div>
        )}
        {portfolioIsFullscreen && (
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
