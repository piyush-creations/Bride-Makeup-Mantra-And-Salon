import "./Portfolio.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import A from "../../Assests/A.jpeg";
import B from "../../Assests/B.jpeg";
import C from "../../Assests/C.jpeg";
import D from "../../Assests/D.jpeg";
import E from "../../Assests/E.jpeg";
import G from "../../Assests/G.jpeg";
import F from "../../Assests/F.jpeg";
import H from "../../Assests/H.jpeg";
import I from "../../Assests/I.jpeg";
import J from "../../Assests/J.jpeg";

const slides = [
  { img: A },
  { img: B },
  { img: C },
  { img: D },
  { img: E },
  { img: G },
  { img: F },
  { img: H },
  { img: I },
  { img: J },
];

const Portfolio = () => {
  const navigate = useNavigate(); // ✅ navigation hook

  return (
    <section className="portfolio">

      <div className="portfolio-header">
        <span className="section-label">Our Portfolio</span>
        <h2 className="section-title">Bridal Transformations</h2>
        <p className="section-sub">
          Every look, crafted with love and artistry
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1.2, centeredSlides: true },
          480: { slidesPerView: 1.6, centeredSlides: true },
          768: { slidesPerView: 2.4, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
          1280: { slidesPerView: 3.5, centeredSlides: false },
        }}
        className="portfolio-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <span className="card-num">0{index + 1}</span>

              <img
                src={slide.img}
                alt={`Portfolio ${index + 1}`}
                className="card-img"
              />

              <div className="overlay">
                <p className="overlay-brand">
                  Bride's Makeup Mantra
                </p>
                <p className="overlay-title">
                  Bridal Look {index + 1}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="cta-row">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/enquiry")}
        >
          Book Your Look
        </button>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/portfolio")}
        >
          View All Work
        </button>
      </div>

    </section>
  );
};

export default Portfolio;