import { Link, NavLink } from "react-router";
import "./Navbar.scss";

interface NavbarProps {
  uploadedResumes?: Resume[];
}

const Navbar = ({ uploadedResumes = [] }: NavbarProps) => {
  const hasResumes = uploadedResumes.length > 0;

  return (
    <nav className={`navbar ${hasResumes ? "navbar--has-resumes" : ""}`}>
      <Link to="/" className="navbar__logo">
        RESMIND
      </Link>

      <div className="navbar__links">
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `navbar__link ${isActive ? "active" : ""}`
          }
        >
          Features
        </NavLink>

        {hasResumes && (
          <a href="#resumes" className="navbar__link">
            Resumes
          </a>
        )}

        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            `navbar__link ${isActive ? "active" : ""}`
          }
        >
          Testimonials
        </NavLink>
      </div>

      <Link to="/upload" className="navbar__action">
        Analyze Resume
        {/* <span className="navbar__arrow" aria-hidden="true">
          -&gt;
        </span> */}
      </Link>
    </nav>
  );
};

export default Navbar;
