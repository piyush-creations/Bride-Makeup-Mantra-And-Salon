import { useState } from "react";
import "./Enquiry.scss";

const services = [
  "Bridal Makeup",
  "Party Makeup",
  "Hair Styling",
  "Skincare Consultation",
  "Photoshoot Makeup",
  "Other",
];

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          date: form.date,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send enquiry");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", phone: "", email: "", service: "", date: "", message: "" });
    setSubmitted(false);
  };

  return (
    <section className="enquiry">
      {/* ── Left Panel ── */}
      <div className="enquiry__left">
        <div className="enquiry__left-inner">
          <span className="enquiry__tag">Get in Touch</span>
          <h2 className="enquiry__heading">
            Let's Create Your <em>Perfect Look</em>
          </h2>
          <p className="enquiry__sub">
            Fill out the form and Asha will personally get back to you within 24 hours.
          </p>

          <div className="enquiry__info">
            <div className="enquiry__info-item">
              <span className="enquiry__info-icon">✦</span>
              <div>
                <strong>Phone</strong>
                <span>+91 96168 44401</span>
              </div>
            </div>
            <div className="enquiry__info-item">
              <span className="enquiry__info-icon">✦</span>
              <div>
                <strong>Email</strong>
                <span>ashakeshri242@gmail.com</span>
              </div>
            </div>
            <div className="enquiry__info-item">
              <span className="enquiry__info-icon">✦</span>
              <div>
                <strong>Location</strong>
                <span>Prayagraj, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          <div className="enquiry__socials">
            <a href="#" className="enquiry__social-link">Instagram</a>
            <span>·</span>
            <a href="#" className="enquiry__social-link">Facebook</a>
            <span>·</span>
            <a href="#" className="enquiry__social-link">WhatsApp</a>
          </div>
        </div>

        <div className="enquiry__deco" aria-hidden="true">
          <div className="enquiry__deco-circle enquiry__deco-circle--1" />
          <div className="enquiry__deco-circle enquiry__deco-circle--2" />
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="enquiry__right">
        {submitted ? (
          <div className="enquiry__success">
            <div className="enquiry__success-icon">✓</div>
            <h3>Enquiry Sent!</h3>
            <p>Thank you, <strong>{form.name}</strong>. Asha will reach out to you shortly.</p>
            <button className="enquiry__btn" onClick={handleReset}>Send Another</button>
          </div>
        ) : (
          <form className="enquiry__form" onSubmit={handleSubmit} noValidate>
            <h3 className="enquiry__form-title">Book / Enquire</h3>

            <div className="enquiry__row">
              <div className="enquiry__field">
                <label htmlFor="name">Full Name <span>*</span></label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Priya Sharma"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className="enquiry__field">
                <label htmlFor="phone">Phone <span>*</span></label>
                <input
                  id="phone" name="phone" type="tel"
                  placeholder="+91 00000 00000"
                  value={form.phone} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="enquiry__field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange}
              />
            </div>

            <div className="enquiry__row">
              <div className="enquiry__field">
                <label htmlFor="service">Service <span>*</span></label>
                <select
                  id="service" name="service"
                  value={form.service} onChange={handleChange} required
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="enquiry__field">
                <label htmlFor="date">Preferred Date</label>
                <input
                  id="date" name="date" type="date"
                  value={form.date} onChange={handleChange}
                />
              </div>
            </div>

            <div className="enquiry__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={4}
                placeholder="Tell Asha about your occasion, theme, or any special requests…"
                value={form.message} onChange={handleChange}
              />
            </div>

            {error && <p className="enquiry__error">{error}</p>}

            <button className="enquiry__btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Enquiry →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Enquiry;