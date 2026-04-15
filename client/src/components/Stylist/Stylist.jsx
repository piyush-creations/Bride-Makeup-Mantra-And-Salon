import "./Stylist.scss";
import Asha from "../../Assests/asha.jpeg";
import { useNavigate } from "react-router-dom";  // ✅ add this

const Stylist = () => {
  const navigate = useNavigate(); // ✅ init

  return (
    <section className="stylist">

      <div className="img">
        <div className="img-wrapper">
          <img src={Asha} alt="Asha Kesarwani" />
        </div>
      </div>

      <div className="divider" />

      <div className="content">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          <span>Personal Styling</span>
        </div>

        <h2>
          Asha <em>Kesarwani</em>
        </h2>

        <h4>Makeup Artist</h4>

        <p>
          10+ years of experience delivering modern and elegant beauty services —
          crafted to bring out the finest version of you.
        </p>

        <div className="cta-row">
          <button 
            className="btn-primary"
            onClick={() => navigate("/enquiry")}  // ✅ navigation here
          >
            Book a Session
          </button>

          <button className="btn-link">
            View Portfolio →
          </button>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">Years of Expertise</span>
          </div>
          <div className="stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Clients Styled</span>
          </div>
          <div className="stat">
            <span className="stat-num">98%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Stylist;