import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <section className="hero">

      {/* Left — Copy */}
      <div className="hero__left">
        <div className="hero__eyebrow">Premium Beauty Studio</div>

        <h1 className="hero__heading">
          Your Beauty,<br /><em>Our Passion</em>
        </h1>

        <div className="hero__divider" aria-hidden="true" />

        <p className="hero__sub">
          Premium salon services crafted for elegance. Every detail
          considered, every moment cherished.
        </p>

        <div className="hero__cta-row">
          <Link to="/enquiry" className="hero__btn hero__btn--primary">
            Book Now
          </Link>
          <Link to="/portfolio" className="hero__btn hero__btn--ghost">
            View Portfolio
          </Link>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">500+</span>
            <span className="hero__stat-label">Happy Brides</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">8+</span>
            <span className="hero__stat-label">Years of Craft</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">4.9</span>
            <span className="hero__stat-label">Avg. Rating</span>
          </div>
        </div>
      </div>

      {/* Right — Image */}
      <div className="hero__right">
        <div className="hero__accent-border" aria-hidden="true" />
        <div className="hero__img-frame">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80"
            alt="Makeup artist at work"
          />
        </div>
        <div className="hero__tag" aria-hidden="true">
          <div className="hero__tag-title">Trusted by 500+ brides</div>
          <div className="hero__tag-sub">across India</div>
        </div>
      </div>

    </section>
  );
};

export default HomePage;