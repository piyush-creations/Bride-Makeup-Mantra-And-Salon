import "./About2.scss";

const values = [
  { icon: "💎", title: "Expert Professionals", desc: "Certified beauty artists with years of hands-on craft and passion for perfection." },
  { icon: "🌿", title: "Premium Products Only", desc: "Every product we use is hand-picked for quality, safety, and lasting results." },
  { icon: "✨", title: "Hygiene First", desc: "Our salon upholds the highest cleanliness standards — always, without exception." },
  { icon: "🎨", title: "Bespoke Care", desc: "No two clients are the same. Every service is tailored uniquely to you." },
  { icon: "💫", title: "Honest Pricing", desc: "Luxury should never be out of reach — transparent pricing, zero surprises." },
  { icon: "❤️", title: "Client-Obsessed", desc: "Your satisfaction isn't a goal — it's the foundation of everything we do." },
];

const pledgePoints = [
  "We listen before we suggest — your vision leads.",
  "We never rush. Every appointment gets our full attention.",
  "We stay current with beauty trends and techniques.",
  "We create a space where you feel seen, heard, and beautiful.",
];

const stripItems = [
  "Beauty is our craft",
  "Confidence is our gift",
  "Care is our promise",
  "You deserve the best",
];

const About = () => {
  // Duplicate for seamless marquee loop
  const allStrip = [...stripItems, ...stripItems];

  return (
    <div className="about-page">

      {/* ═══════════════════════════════ HERO */}
      <section className="ab-hero">
        <div className="hero-left">
          <span className="tag">Est. 2019 · Beauty Studio</span>
          <h1>
            Where Beauty<br />
            Meets <em>Intention</em>
          </h1>
          <p>
            A sanctuary designed for women who demand excellence —
            in every stroke, every treatment, every moment spent with us.
          </p>
          <button className="hero-cta">Discover Our Story</button>
        </div>

        <div className="hero-right">
          <div className="hero-bg-num">05</div>
          <div className="hero-card-grid">
            <div className="hc">
              <span className="hc-icon">👑</span>
              <span className="hc-num">500+</span>
              <span className="hc-label">Clients Transformed</span>
            </div>
            <div className="hc">
              <span className="hc-icon">⭐</span>
              <span className="hc-num">5★</span>
              <span className="hc-label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ STRIP */}
      <div className="ab-strip">
        <div className="strip-inner">
          {allStrip.map((item, i) => (
            <span className="strip-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════ STORY */}
      <section className="ab-story">
        <div className="story-wrap">
          <div className="story-left">
            <span className="tag">Our Story</span>
            <h2>
              Born from a Love<br />
              of <em>True Beauty</em>
            </h2>
            <div className="story-divider" />
          </div>

          <div className="story-right">
            <p>
              It started with a simple belief — that <strong>every woman deserves to feel
              extraordinary</strong>, not just on special occasions, but every single day.
              Our founder opened these doors in 2019 with nothing but passion, skill,
              and an unwavering commitment to craft.
            </p>
            <p>
              What began as a small studio has grown into a full-service beauty
              sanctuary trusted by hundreds of clients across the city. From everyday
              hair care to elaborate bridal styling, each service is delivered with
              the same care and attention that defined us from day one.
            </p>

            <div className="story-quote">
              <blockquote>
                "We don't just style hair or apply makeup — we help you step into
                the most confident version of yourself."
              </blockquote>
              <cite>— The Founders</cite>
            </div>

            <p>
              Today, our team of passionate professionals continues to grow — learning,
              evolving, and always putting <strong>you at the centre of everything</strong>.
              This isn't just a salon. It's your space to breathe, transform, and shine.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ VALUES */}
      <section className="ab-values">
        <div className="section-wrap">
          <div className="values-head">
            <div>
              <span className="tag">Why Choose Us</span>
              <h2>
                Six Reasons<br />
                to <em>Trust Us</em>
              </h2>
            </div>
            <p className="head-right">
              We built this studio around one question:<br />
              what would a perfect salon feel like?
            </p>
          </div>
        </div>

        <div className="section-wrap">
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-item" key={i}>
                <span className="vi-num">0{i + 1}</span>
                <span className="vi-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ STATS */}
      <section className="ab-stats">
        <div className="section-wrap">
          <div className="stats-head">
            <span className="tag">By The Numbers</span>
            <h2>
              A Track Record of <em>Excellence</em>
            </h2>
          </div>

          <div className="stats-row">
            <div className="stat-cell">
              <span className="sc-num">500+</span>
              <span className="sc-label">Happy Clients</span>
            </div>
            <div className="stat-cell">
              <span className="sc-num">5+</span>
              <span className="sc-label">Years Experience</span>
            </div>
            <div className="stat-cell">
              <span className="sc-num">20+</span>
              <span className="sc-label">Services Offered</span>
            </div>
            <div className="stat-cell">
              <span className="sc-num">100%</span>
              <span className="sc-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ PLEDGE */}
      <section className="ab-pledge">
        <div className="pledge-wrap">
          <div className="pledge-visual">
            <div className="pv-box">
              <div className="pv-text">
                <span className="pv-big">Our<br />Pledge</span>
                <span className="pv-sub">To every client, always</span>
              </div>
            </div>
            <div className="pv-chip">✦ Beauty with Integrity</div>
          </div>

          <div className="pledge-content">
            <span className="tag">Our Commitment</span>
            <h2>
              We Show Up<br />
              for <em>You, Every Time</em>
            </h2>
            <p>
              Choosing a salon is a matter of trust. We don't take that lightly.
              Here's what you can count on every time you walk through our doors.
            </p>
            <ul className="pledge-list">
              {pledgePoints.map((pt, i) => (
                <li key={i}>
                  <span className="check">✓</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;