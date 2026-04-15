import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./Navbar.scss";
import logo from "../../Assests/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("/api/admin/check", { withCredentials: true })
      .then((res) => { if (res.data.loggedIn) setIsAdmin(true); })
      .catch(() => setIsAdmin(false));
  }, []);

  // Close drawer on route change
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout", {}, { withCredentials: true });
      setIsAdmin(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="navbar">

        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img src={logo} alt="Bride's Makeup Mantra and Salon" />
        </Link>

        {/* Desktop Nav Links — centered */}
        <ul className="navbar__links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>Services</NavLink></li>
          <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? "active" : ""}>Portfolio</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
          <li><NavLink to="/enquiry" className={({ isActive }) => isActive ? "active" : ""}>Enquiry</NavLink></li>
        </ul>

        {/* Desktop right side — Book Now + Admin (hidden on mobile via CSS) */}
        <div className="navbar__actions">
          <Link to="/enquiry" className="navbar__cta">Book Now</Link>

          {/* Admin button — desktop only, hidden on mobile */}
          <div className="navbar__admin-wrap">
            {!isAdmin ? (
              <Link to="/admin/login" className="navbar__admin-btn">Admin</Link>
            ) : (
              <button onClick={handleLogout} className="navbar__admin-btn navbar__admin-btn--logout">
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Drawer — rendered outside <nav> so overlay doesn't clip */}
      <div className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}>
        <ul>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
          <li><NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/enquiry" onClick={closeMenu}>Enquiry</NavLink></li>
        </ul>

        {/* Book Now CTA in mobile drawer — NO admin button here */}
        <Link
          to="/enquiry"
          className="navbar__cta navbar__cta--mobile"
          onClick={closeMenu}
        >
          Book Now
        </Link>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
};

export default Navbar;