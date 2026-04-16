import { useState } from "react";
import "./Services2.scss";

const servicesData = [
  { title: "Hair Styling", category: "Hair", desc: "Professional styling & cuts." },
  { title: "Hair Coloring", category: "Hair", desc: "Balayage, highlights & global color." },
  { title: "Hair Spa", category: "Hair", desc: "Deep nourishment for healthy hair." },
  { title: "Keratin Treatment", category: "Hair", desc: "Smooth & frizz-free hair." },

  { title: "Makeup", category: "Makeup", desc: "HD & party makeup services." },
  { title: "Bridal Makeup", category: "Makeup", desc: "Complete bridal transformation." },
  { title: "Engagement Makeup", category: "Makeup", desc: "Elegant engagement looks." },

  { title: "Facials", category: "Skin", desc: "Glow boosting facials." },
  { title: "Cleanup", category: "Skin", desc: "Quick refresh treatment." },
  { title: "Bleach & Detan", category: "Skin", desc: "Skin brightening solutions." },

  { title: "Manicure", category: "Nails", desc: "Beautiful hands care." },
  { title: "Pedicure", category: "Nails", desc: "Relaxing foot treatment." },

  { title: "Waxing", category: "Beauty", desc: "Full body waxing." },
  { title: "Threading", category: "Beauty", desc: "Eyebrow & facial shaping." },

  { title: "Party Hairstyling", category: "Hair", desc: "Trendy hairstyles for events." },
];

const categories = ["All", "Hair", "Makeup", "Skin", "Nails", "Beauty"];

const Services = () => {
  const [active, setActive] = useState("All");

  const filteredServices =
    active === "All"
      ? servicesData
      : servicesData.filter((s) => s.category === active);

  return (
    <div className="services">

      {/* HEADING */}
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Explore a wide range of beauty & salon services</p>
      </div>

      {/* FILTER */}
      <div className="services-filter">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={active === cat ? "active" : ""}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="services-container">
        {filteredServices.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;