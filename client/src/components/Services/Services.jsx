import "./Services.scss";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="services">

      <div className="card" onClick={() => navigate("/services")}>
        <h3>Services</h3>
        <p>Hair, skincare & beauty treatments.</p>
      </div>

      <div className="card" onClick={() => navigate("/portfolio")}>
        <h3>Portfolio</h3>
        <p>Our premium transformations.</p>
      </div>

      <div className="card" onClick={() => navigate("/about")}>
        <h3>About Bride Makeup Mantra and Salon</h3>
        <p>Professional & experienced experts.</p>
      </div>

    </section>
  );
};

export default Services;