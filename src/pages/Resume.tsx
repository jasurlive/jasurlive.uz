import { useState } from "react";
import "../add/css/resume.css";

import BCfront from "../add/media/img/bc/front.png";
import BCback from "../add/media/img/bc/back.png";

import Swiper from "../add/tools/Swiper";
import Logo from "../add/tools/Logo";
import Social from "../add/tools/Social";
import UpDown from "../add/tools/FullScreen";
import Skills from "../add/tools/Skills";
import Code from "../add/tools/Code";

import {
  FaPhoneSquareAlt,
  FaTrain,
  FaUniversity,
  FaTools,
} from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaRegAddressCard } from "react-icons/fa";
import FullScreenToggle from "../add/tools/FullScreen";

function Resume() {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  return (
    <div>
      <Logo />

      <header className="header-resume">
        <div className="container-resume">
          <h1>Resume (CV) | Jasur Anorkulov | Electronics Engineer</h1>

          <div className="contact-info">
            <p>
              <FaPhoneSquareAlt /> +998 99 *********** | <TfiEmail />{" "}
              <a href="mailto:jasur@graduate.org">jasur@graduate.org</a>
            </p>
            <p>
              <FaRegAddressCard /> ***************, **************
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="container-resume">
          <section>
            <h2>About Me 🔽</h2>
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
            <h2>Business Card 🔽</h2>
            <div className="card-container">
              <div
                className={`business-card ${isCardFlipped ? "flipped" : ""}`}
                onClick={() => setIsCardFlipped(!isCardFlipped)}
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
            <h2>Work / Education Experience 🔽</h2>

            <ul className="timeline">
              <li className="timeline-item">
                <div className="timeline-left">
                  <b>8️⃣ PhD Student, Tashkent State Transport University</b>
                  <span>January 2026 – Current</span>
                </div>
                <div className="timeline-right">🎓</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>
                    7️⃣ Lead Specialist, Technical Services for Talgo trains,
                    "Railwayexpress" JSC
                  </b>
                  <span>January 2026 – Current</span>
                </div>
                <div className="timeline-right">🚄</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>
                    6️⃣ On-board Engineer, Talgo-250 high-speed trains,
                    "Railwayexpress" JSC
                  </b>
                  <span>September 2025 – January 2026</span>
                </div>
                <div className="timeline-right">🚄</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>5️⃣ MSc Student, Woosong University</b>
                  <span>September 2024 – February 2026</span>
                </div>
                <div className="timeline-right">🎓</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b> 4️⃣ Electronics Engineer, "Railwayinfrastructure" JSC</b>
                  <span>November 2023 – September 2024</span>
                </div>
                <div className="timeline-right">🚄</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>3️⃣ MSc Student, University of Liverpool</b>
                  <span>September 2022 – November 2023</span>
                </div>
                <div className="timeline-right">🎓</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>2️⃣ Electronics Engineer, Locomotive Depot Uzbekistan</b>
                  <span>June 2019 – September 2022</span>
                </div>
                <div className="timeline-right">🚄</div>
              </li>

              <li className="timeline-item">
                <div className="timeline-left">
                  <b>
                    1️⃣ BEng Student, Tashkent Institute of Railway Engineers
                  </b>
                  <span>September 2015 – June 2019</span>
                </div>
                <div className="timeline-right">🎓</div>
              </li>
            </ul>
          </section>

          <section>
            <Skills />
          </section>

          <section>
            <Code />
          </section>

          <section>
            <h2>Gallery 🔽</h2>
            <div className="gallery-container-resume">
              <Swiper />
            </div>
          </section>
        </div>
      </main>

      <Social />
      <FullScreenToggle />
    </div>
  );
}

export default Resume;
