import { useState } from "react";
import "../add/css/resume.css";

import BCfront from "../add/media/img/bc/front.png";
import BCback from "../add/media/img/bc/back.png";

import Swiper from "../add/tools/Swiper";
import Logo from "../add/tools/Logo";

import { FaPhoneSquareAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaRegAddressCard } from "react-icons/fa";

import Social from "../add/tools/Social";
import UpDown from "../add/tools/UpDown";

function Resume() {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCardClick = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  return (
    <div>
      <Logo />
      <div className="header-resume">
        <div className="container-resume">
          <h1>👨🏻‍🔬 Resume (CV) | Jasur Anorkulov | Electronics Engineer</h1>
          <div className="contact-info">
            <p>
              <FaPhoneSquareAlt />: +998 99 *********** | <TfiEmail />:{" "}
              <a href="mailto:jasur@graduate.org">jasur@graduate.org</a>
            </p>
            <p>
              <FaRegAddressCard />: ***************, **************
            </p>
          </div>
        </div>
      </div>

      <main>
        <div className="container-resume">
          <section>
            <h2>A Bit About Me</h2>
            <div className="aboutme-resume">
              <b>Hola!</b> I'm <b>Jasur</b>, the electronics nerd keeping trains
              running 🚄. When I'm not busy with circuits, you'll find me
              coding, photoshopping, video editing, clowning 🤡, eating like
              there's no tomorrow 🍕🍝, podcasting, teaching, and playing chess
              ♟️. I'm all about traveling ✈️, picking up new languages 🏌🏻‍♂️📚, and
              enjoying life 🍹🏖️. Wanna know more? Check the website and play
              around ツ
            </div>
          </section>

          <section>
            <h2>Work/Education Experience</h2>
            <div className="timeline">
              <li>
                <b>6️⃣ Loading...</b>
              </li>
              <li>
                <b>5️⃣ Masters (Postgraduate) Student at Woosong University</b> |
                September 2024 - February 2026
              </li>
              <li>
                <b>
                  4️⃣ Electronics Engineer at Locomotive Depot Uzbekistan
                  (Samarkand branch)
                </b>{" "}
                | November 2023 - September 2024
              </li>
              <li>
                <b>
                  3️⃣ Masters (Postgraduate) Student at University of Liverpool
                </b>{" "}
                | September 2022 - November 2023
              </li>
              <li>
                <b>
                  2️⃣ Electronics Engineer at Locomotive Depot Uzbekistan
                  (Tashkent)
                </b>{" "}
                | June 2019 - September 2022
              </li>
              <li>
                <b>
                  1️⃣ Undergraduate Student at Tashkent Institute of Railway
                  Engineers
                </b>{" "}
                | September 2015 - June 2019
              </li>
            </div>
          </section>

          {/* Removed Download CV Section */}

          <section>
            <h2>Business Card</h2>
            <div className="card-container">
              <div
                className={`business-card ${isCardFlipped ? "flipped" : ""}`}
                id="business-card"
                onClick={handleCardClick}
              >
                <div className="front">
                  <img src={BCfront} alt="Business Card Front" />
                </div>
                <div className="back">
                  <img src={BCback} alt="Business Card Back" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>Photo Gallery</h2>
          </section>
          <div className="gallery-container-resume">
            <Swiper />
          </div>
        </div>
      </main>
      <Social />
      <UpDown />
    </div>
  );
}

export default Resume;
