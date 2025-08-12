import { useState } from "react";
import "../add/css/awards.css";
import { handleConfettiClick } from "../add/tools/Confetti";
import Logo from "../add/tools/Logo";
import { GiPartyPopper } from "react-icons/gi";

import uol from "../add/media/img/awards/uol.png";
import tuit from "../add/media/img/awards/tuit.png";
import ielts2024 from "../add/media/img/awards/ielts2024.png";
import transcriptuol from "../add/media/img/awards/transcriptuol.jpg";
import ielts2022 from "../add/media/img/awards/ielts2022.jpg";
import ielts2019 from "../add/media/img/awards/ielts2019.jpg";
import krhangul from "../add/media/img/awards/kr-hangul.png";
import uzy from "../add/media/img/awards/uzy.jpg";
import mimoTS from "../add/media/img/awards/mimo-TS.png";
import sololearnPY from "../add/media/img/awards/sololearn-PY.jpg";
import achievement from "../add/media/img/awards/achievementWoosong.jpg";
import commendation from "../add/media/img/awards/commendationWoosong.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Awards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    imgSrc: "",
    description: "",
  });

  const openModal = (imgSrc: string, description: string) => {
    setModalContent({ imgSrc, description });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const awards = [
    {
      imgSrc: commendation,
      title: "Certificate of Commendation (KGSP)",
      description:
        "Awarded for outstanding academic performance at Woosong University in 2024-25. \nAugust 2025.",
    },

    {
      imgSrc: achievement,
      title: "Certificate of Achievement (KGSP)",
      description:
        "Recognition of the diligent completion of the Korean Government Scholarship Program Master's Course \nAugust 2025.",
    },
    {
      imgSrc: sololearnPY,
      title: "Course Completion Certificate",
      description: `A simple certificate awarded for successfully completing Python Developer course on Sololearn.\nApril 2025.`,
    },

    {
      imgSrc: uzy,
      title: "Ownership Certificate",
      description:
        "Certificate for my UzY-Loco Application. Issued by the Ministry of Justice of Uzbekistan. \nFor full details, scan the QR Code in the bottom right corner. \nAugust 2024",
    },

    {
      imgSrc: transcriptuol,
      title: "Transcript of Studies",
      description:
        "The Academic Transcript provides studied modules, marks, and credits during the full year of study at UoL. 72.5/100 \nNovember 2023.",
    },
    {
      imgSrc: tuit,
      title: "Bachelor's diploma",
      description:
        "Award Certificate from the Tashkent Institute of Railway Engineering (From 2021 Tashkent State Transport University). 82/100. \nJune 2019.",
    },

    {
      imgSrc: ielts2024,
      title: "IELTS Academic | 2024",
      description:
        "International English Language Testing System (IELTS) Certificate. Overall 7.5/9.0 \nJune 2024",
    },
    {
      imgSrc: ielts2022,
      title: "IELTS Academic | 2022",
      description:
        "International English Language Testing System (IELTS) Certificate. Overall 7.0/9.0 \nDecember 2021",
    },
    {
      imgSrc: ielts2019,
      title: "IELTS Academic | 2019 | First attempt",
      description:
        "International English Language Testing System (IELTS) Certificate. Overall 6.5/9.0 \nMay 2019",
    },
    {
      imgSrc: mimoTS,
      title: "Course Completion Certificate",
      description: `A basic "meh" certificate awarded for successfully completing a TypeScript course on Mimo.\nMarch 2025.`,
    },
    {
      imgSrc: krhangul,
      title: "Quiz Completion Certificate",
      description: `A certificate from one of my ReactJS projects. You can also get your own certificate, scan the QR Code in the bottom right corner or <a href="https://jasurlive.github.io/Hangul/">click here</a>. \nOctober 2024`,
    },
    {
      imgSrc: uol,
      title: "Master of Science (Engineering)",
      description:
        "Award Certificate – University of Liverpool, UK. Barely passed.\nDecember 2023.",
    },
  ];

  return (
    <div>
      <Logo />

      <div className="header-awards">
        <h1>
          "Meh" types of Awards 🎓🏆 | Pop
          <button
            className="icon-party"
            id="confettiButton"
            onClick={handleConfettiClick}
          >
            <GiPartyPopper />
          </button>{" "}
          up!
        </h1>
      </div>

      <main>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "progressbar",
          }}
          scrollbar={{ draggable: true }}
          grabCursor={true}
          speed={800}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 0 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
        >
          {awards.map((award, index) => (
            <SwiperSlide key={index}>
              <div
                className="award"
                onClick={() => openModal(award.imgSrc, award.description)}
              >
                <img
                  src={award.imgSrc}
                  alt={award.title}
                  className="award-image"
                />
                <div className="award-description">
                  <h2>
                    <strong>{award.title}</strong>
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: award.description.split("\n").join("<br />"),
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {modalOpen && (
        <div id="modal-awards" className="modal-awards" onClick={closeModal}>
          <span className="close-awards" onClick={closeModal}>
            ❎
          </span>
          <img
            className="modal-content-awards"
            src={modalContent.imgSrc}
            alt="Award"
          />
          <p
            className="modal-description"
            dangerouslySetInnerHTML={{
              __html: modalContent.description.split("\n").join("<br />"),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Awards;
