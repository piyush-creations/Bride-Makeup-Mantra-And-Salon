import { useState, useEffect } from "react";
import "./Testimonial.scss";

const API_URL = "http://localhost:5000/api/testimonials";

const services = [
  "Bridal Makeup",
  "Party Makeup",
  "Hair Styling",
  "Skincare",
  "Photoshoot Makeup",
  "Other",
];

const StarRating = ({ rating, onRate }) => (
  <div className="testimonials__star-pick">
    {[1, 2, 3, 4, 5].map((val) => (
      <button
        key={val}
        type="button"
        className={`testimonials__star-btn ${val <= rating ? "testimonials__star-btn--filled" : ""}`}
        onClick={() => onRate(val)}
        aria-label={`${val} star`}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </button>
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", service: "", text: "", rating: 0 });
  // FIX: Store the submitter's name separately so clearing the form
  // doesn't blank the success message that reads from form.name
  const [submittedName, setSubmittedName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        const validTestimonials = Array.isArray(data)
          ? data.filter((t) => t && t.name && t.text && t.rating)
          : [];
        setReviews(validTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // FIX: Surface the error so the user/developer can see what's wrong
        setFetchError(error.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const getInitials = (name) =>
    name && name.trim()
      ? name.trim().split(" ").slice(0, 2).map((w) => w[0].toUpperCase()).join("")
      : "U";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || form.rating === 0) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          service: form.service || "Client",
          text: form.text,
          rating: form.rating,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const newTestimonial = await response.json();
      setReviews([newTestimonial, ...reviews]);

      // FIX: Save name BEFORE clearing the form so success message works
      setSubmittedName(form.name.split(" ")[0]);
      setForm({ name: "", service: "", text: "", rating: 0 });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert(`Could not save your review: ${error.message}`);
    }
  };

  return (
    <section className="testimonials">

      {/* ── Header ── */}
      <div className="testimonials__header">
        <div className="testimonials__tag">Client Stories</div>
        <h2 className="testimonials__heading">
          Words That Mean the <em>World to Us</em>
        </h2>
        <p className="testimonials__sub">
          Real experiences from real brides and clients who trusted Asha with their most precious moments.
        </p>
      </div>

      {/* ── Review Cards ── */}
      <div className="testimonials__grid">
        {loading ? (
          <div className="testimonials__loading">Loading testimonials...</div>
        ) : fetchError ? (
          // FIX: Show fetch error clearly during development
          <div className="testimonials__empty" style={{ color: "#c0392b" }}>
            Could not load testimonials: {fetchError}
          </div>
        ) : reviews.length === 0 ? (
          <div className="testimonials__empty">
            No testimonials yet. Be the first to share your experience!
          </div>
        ) : (
          reviews.map((r, i) => (
            <div className="testimonials__card" key={r.id || i}>
              <div className="testimonials__quote">"</div>
              <p className="testimonials__text">{r.text}</p>
              <div>
                <div className="testimonials__stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`testimonials__star ${s <= r.rating ? "testimonials__star--filled" : ""}`}
                    />
                  ))}
                </div>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">{getInitials(r.name)}</div>
                  <div>
                    <div className="testimonials__name">{r.name}</div>
                    <div className="testimonials__service">{r.service}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Divider ── */}
      <div className="testimonials__divider" aria-hidden="true">
        <span className="testimonials__divider-line" />
        <span className="testimonials__divider-text">Share Your Experience</span>
        <span className="testimonials__divider-line" />
      </div>

      {/* ── Review Form ── */}
      <div className="testimonials__form-wrap">
        {submitted ? (
          <div className="testimonials__success">
            <div className="testimonials__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c58b6d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            {/* FIX: Use submittedName instead of form.name (which is now empty) */}
            <h3>Thank You, {submittedName}!</h3>
            <p>Your review has been added. We truly appreciate your kind words.</p>
          </div>
        ) : (
          <form className="testimonials__form" onSubmit={handleSubmit} noValidate>
            <div className="testimonials__form-title">Add Your Thoughts</div>
            <p className="testimonials__form-sub">Had a session with Asha? We'd love to hear about it.</p>

            <div className="testimonials__row">
              <div className="testimonials__field">
                <label className="testimonials__label">
                  Your Name <span>*</span>
                </label>
                <input
                  className="testimonials__input"
                  name="name"
                  type="text"
                  placeholder="Anjali Gupta"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="testimonials__field">
                <label className="testimonials__label">Service Taken</label>
                <select
                  className="testimonials__input testimonials__select"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select service</option>
                  {services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="testimonials__field">
              <label className="testimonials__label">
                Your Rating <span>*</span>
              </label>
              <StarRating
                rating={form.rating}
                onRate={(val) => setForm({ ...form, rating: val })}
              />
            </div>

            <div className="testimonials__field">
              <label className="testimonials__label">
                Your Review <span>*</span>
              </label>
              <textarea
                className="testimonials__input testimonials__textarea"
                name="text"
                rows={4}
                placeholder="Tell us about your experience with Asha…"
                value={form.text}
                onChange={handleChange}
                required
              />
            </div>

            <button className="testimonials__btn" type="submit">
              Submit Your Review →
            </button>
          </form>
        )}
      </div>

    </section>
  );
};

export default Testimonials;