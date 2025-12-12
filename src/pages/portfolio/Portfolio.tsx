import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../../add/css/portfolio.css";
import Logo from "../../add/tools/Logo";
import { GiPartyPopper } from "react-icons/gi";
import { handleConfettiClick } from "../../add/tools/Confetti";

import Social from "../../add/tools/Social";
import UpDown from "../../add/tools/UpDown";

import Speeches from "../videos/Speeches";
import { ImSpinner2 } from "react-icons/im";

const Portfolio = () => {
  const [portfolioPosts, setPortfolioPosts] = useState<any[]>([]);
  const [portfolioSelectedPost, setPortfolioSelectedPost] = useState<
    any | null
  >(null);
  const [portfolioIsFullscreen, setPortfolioIsFullscreen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsLoadingData(true);

    fetch("data/portfolio/portfolio.xlsx", { cache: "no-store" })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const validPosts = worksheet.filter(
          (post: any) => post.Title && post.Description && post["Image Link"]
        );

        const initialLoadStatus: Record<string, boolean> = {};
        validPosts.forEach((post: any) => {
          initialLoadStatus[post["Image Link"]] = false;
        });
        setImageLoaded(initialLoadStatus);

        setPortfolioPosts(validPosts);
        setIsLoadingData(false);
      })
      .catch(() => {
        setIsLoadingData(false);
      });
  }, []);

  const handlePortfolioPostClick = (post: any) =>
    setPortfolioSelectedPost(post);
  const handlePortfolioCloseModal = () => setPortfolioSelectedPost(null);
  const handlePortfolioImageClick = () => setPortfolioIsFullscreen(true);
  const handlePortfolioFullscreenClose = () => setPortfolioIsFullscreen(false);

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

      {isLoadingData && (
        <div className="portfolio-global-loading">
          <ImSpinner2 className="portfolio-loading-spinner" />
          <p>Loading portfolio data...</p>
        </div>
      )}

      {!isLoadingData && (
        <>
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
                  {!imageLoaded[post["Image Link"]] && (
                    <div className="portfolio-image-loading">
                      <ImSpinner2 className="portfolio-loading-spinner" />
                    </div>
                  )}

                  <img
                    src={post["Image Link"]}
                    alt={post.Title}
                    style={{
                      display: imageLoaded[post["Image Link"]]
                        ? "block"
                        : "none",
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
                <div className="portfolio-item-details">
                  <p>{truncatePortfolioText(post.Description, 70)}</p>
                </div>
              </div>
            ))}

            {portfolioSelectedPost && (
              <div
                className="portfolio-modal"
                onClick={handlePortfolioCloseModal}
              >
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
                        src={
                          getYoutubeEmbedUrl(portfolioSelectedPost.Description)!
                        }
                        title={portfolioSelectedPost.Title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={portfolioSelectedPost["Image Link"]}
                        alt={portfolioSelectedPost.Title}
                        onClick={handlePortfolioImageClick}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>

                  <h3>Topic: {portfolioSelectedPost.Title}</h3>
                  <p className="portfolio-item-description">
                    {makePortfolioLinksClickable(
                      portfolioSelectedPost.Description
                    )}
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
        </>
      )}
    </div>
  );
};

export default Portfolio;
