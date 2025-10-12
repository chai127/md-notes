import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../../style/Navbar.css";

function Navbar({ toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getActiveLink = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="site-header">
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu" role="button">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`nav-content ${menuOpen ? "show" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" className={getActiveLink} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/topics" className={getActiveLink} onClick={() => setMenuOpen(false)}>Topics</NavLink>
            <NavLink to="/about" className={getActiveLink} onClick={() => setMenuOpen(false)}>About</NavLink>
          </div>

          <div className="controls">
            <button className="controls-btn" onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
