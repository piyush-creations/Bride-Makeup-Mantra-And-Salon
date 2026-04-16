import "./Footer.scss";
import logo from "../../Assests/logo.png";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.52-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.https://www.instagram.com/bride_makeup_mantra/">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
 
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// const YoutubeIcon = () => (
//   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
//   </svg>
// );

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-col brand-col">
          <img src={logo} alt="Bride's Makeup Mantra Logo" />
          <p className="brand-tagline">
            Elevating beauty with modern elegance. Book your perfect look with us.
          </p>
          <div className="availability-badge">
            <span className="badge-dot" />
            Accepting bookings
          </div>
        </div>

        {/* Quick Links */}
        {/* <div className="footer-col">
          <h4 className="col-title">Quick Links</h4>
          <ul className="link-list">
            {["Home", "Services", "Portfolio", "About", "Book Now"].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div> */}

        {/* Contact */}
        <div className="footer-col">
          <h4 className="col-title">Contact</h4>
          <div className="contact-item">
            <div className="contact-icon"><PhoneIcon /></div>
            <span>+91 9616844401</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><EmailIcon /></div>
            <span>ashakeshri242@gmail.com</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><MapIcon /></div>
            <span>Prayagraj, Uttar Pradesh, India</span>
          </div>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4 className="col-title">Follow Us</h4>
          <div className="social-row">
            <a href="https://www.instagram.com/bride_makeup_mantra/" className="social-btn" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://www.facebook.com/makeupkemantra" className="social-btn" aria-label="Facebook"><FacebookIcon /></a>
            {/* <a href="#" className="social-btn" aria-label="YouTube"><YoutubeIcon /></a> */}
          </div>
          <p className="social-hint">Follow for bridal looks,<br />trends & behind-the-scenes.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="copy">© {new Date().getFullYear()} <span>Bride's Makeup Mantra.</span></p>
        <p className="made-with">Made with <span className="heart">♥</span> in Prayagraj</p>
      </div>
    </footer>
  );
};

export default Footer;