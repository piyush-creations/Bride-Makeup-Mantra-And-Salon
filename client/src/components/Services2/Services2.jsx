import { useState } from "react";
import "./Services2.scss";

const IMGS = {
  Hair: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=480&q=80",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=480&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=480&q=80",
    "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=480&q=80",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=480&q=80",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=480&q=80",
  ],
  Makeup: [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=480&q=80",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=480&q=80",
  "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=480&q=80",
],
  Skin: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=480&q=80",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=480&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=480&q=80",
  ],
  Nails: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=480&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=480&q=80",
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=480&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=480&q=80",
  ],
};

const servicesData = [
  {
    title: "Hair Styling",
    category: "Hair",
    desc: "Precision cuts and bespoke styles tailored to your face and personality.",
    items: ["Blow dry & finish", "Trim & reshape", "Special occasion updo"],
  },
  {
    title: "Hair Coloring",
    category: "Hair",
    desc: "From subtle balayage to bold vivid color — your transformation starts here.",
    items: ["Balayage & highlights", "Global color", "Root touch-up"],
  },
  {
    title: "Hair Spa",
    category: "Hair",
    desc: "Deep conditioning rituals to restore softness, strength, and shine.",
    items: ["Protein mask", "Scalp massage", "Argan oil treatment"],
  },
  {
    title: "Keratin Treatment",
    category: "Hair",
    desc: "Banish frizz and unlock silky, manageable hair for months.",
    items: ["Brazilian keratin", "Nano keratin", "Cysteine smoothing"],
  },
  {
    title: "Party Hairstyling",
    category: "Hair",
    desc: "Glamorous event-ready looks crafted for every occasion.",
    items: ["Open waves", "Sleek buns", "Braided styles"],
  },
  {
    title: "Highlights & Ombre",
    category: "Hair",
    desc: "Dimensional color blends that catch light beautifully.",
    items: ["Foil highlights", "Ombre gradient", "Money piece"],
  },
  {
    title: "Makeup",
    category: "Makeup",
    desc: "HD and airbrush artistry for every mood and moment.",
    items: ["Party makeup", "Editorial looks", "Natural glam"],
  },
  {
    title: "Bridal Makeup",
    category: "Makeup",
    desc: "Your most radiant self — curated for the biggest day of your life.",
    items: ["Trial session", "Long-wear formula", "Family coordination"],
  },
  {
    title: "Engagement Makeup",
    category: "Makeup",
    desc: "Polished, photogenic elegance for your engagement celebration.",
    items: ["Soft glam", "Dewy skin finish", "Lash styling"],
  },
  {
    title: "Facials",
    category: "Skin",
    desc: "Glow-boosting treatments tailored to your skin's unique needs.",
    items: ["Hydra facial", "Gold facial", "Anti-ageing"],
  },
  {
    title: "Cleanup",
    category: "Skin",
    desc: "A quick refresh to restore brightness and clear your complexion.",
    items: ["Express cleanup", "Tan removal", "Pore cleansing"],
  },
  {
    title: "Bleach & Detan",
    category: "Skin",
    desc: "Reveal luminous skin with our brightening and detanning solutions.",
    items: ["Face bleach", "Body detan", "D-tan pack"],
  },
  {
    title: "Manicure",
    category: "Nails",
    desc: "Beautifully groomed hands with our relaxing nail care rituals.",
    items: ["Classic manicure", "Gel manicure", "Nail art"],
  },
  {
    title: "Pedicure",
    category: "Nails",
    desc: "Indulge in a soothing foot treatment for smooth, healthy feet.",
    items: ["Spa pedicure", "Callus removal", "Nail shaping"],
  },
  {
    title: "Waxing",
    category: "Beauty",
    desc: "Smooth, long-lasting results with our full-body waxing services.",
    items: ["Rica wax", "Full body", "Sensitive skin wax"],
  },
  {
    title: "Threading",
    category: "Beauty",
    desc: "Expert eyebrow and facial shaping for perfectly defined features.",
    items: ["Eyebrow shaping", "Upper lip", "Full face"],
  },
];

const categories = ["All", "Hair", "Makeup", "Skin", "Nails", "Beauty"];

// Track image index per category for cycling
const imgIndexTracker = {};
function getImg(cat) {
  if (imgIndexTracker[cat] === undefined) imgIndexTracker[cat] = 0;
  const arr = IMGS[cat];
  const url = arr[imgIndexTracker[cat] % arr.length];
  imgIndexTracker[cat]++;
  return url;
}

const Services = () => {
  const [active, setActive] = useState("All");

  // Reset tracker on filter change so images cycle from start per category
  const handleFilter = (cat) => {
    Object.keys(imgIndexTracker).forEach((k) => (imgIndexTracker[k] = 0));
    setActive(cat);
  };

  const filtered =
    active === "All"
      ? servicesData
      : servicesData.filter((s) => s.category === active);

  return (
    <section className="services">
      {/* ── Header ── */}
      <div className="services-header">
        <span className="eyebrow">What we offer</span>
        <h1>
          Beauty, <em>elevated</em>
        </h1>
        <p>
          Professional care for every part of you — from a fresh cut to a full
          bridal transformation.
        </p>
        <div className="header-rule">
          <span />
          <span className="dot" />
          <span />
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="services-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={active === cat ? "active" : ""}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Cards Grid ── */}
      <div className="services-container">
        {filtered.map((service, i) => (
          <div
            className="service-card"
            key={`${service.title}-${i}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="top-bar" />

            {/* Image */}
            <div className="img-wrap">
              <img
                src={getImg(service.category)}
                alt={service.title}
                loading="lazy"
              />
              <div className="img-overlay" />
              <span className="cat-badge">{service.category}</span>
            </div>

            {/* Body */}
            <div className="card-body">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="card-items">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;