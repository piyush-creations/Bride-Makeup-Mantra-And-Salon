import { useState, useEffect } from "react";
import axios from "axios";
import "./Portfolio2.scss";

const categories = ["All", "Hair", "Makeup", "Bridal"];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [portfolioData, setPortfolioData] = useState([]);

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("https://bride-makeup-mantra-and-salon.onrender.com/api/portfolio");
        setPortfolioData(res.data);
      } catch (err) {
        console.error("Error fetching portfolio", err);
      }
    };

    fetchPortfolio();
  }, []);

  // 🔥 FILTER
  const filtered =
    active === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === active);

  return (
    <div className="portfolio">

      {/* HEADER */}
      <div className="portfolio-header">
        <h1>Our Portfolio</h1>
        <p>Explore our latest beauty transformations</p>
      </div>

      {/* FILTER */}
      <div className="portfolio-filter">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={active === cat ? "active" : ""}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="portfolio-container">
        {filtered.map((item, index) => (
          <div className="portfolio-card" key={index}>

            {/* 🔥 IMPORTANT: full URL */}
            <img
              src={item.image}
              alt={item.category}
            />

            <div className="overlay">
              <h3>{item.category}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Portfolio;