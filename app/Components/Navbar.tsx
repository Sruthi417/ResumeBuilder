import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.scss";
import { usePuterStore } from "~/lib/puter";

interface NavbarProps {
  uploadedResumes?: Resume[];
}

const Navbar = ({ uploadedResumes = [] }: NavbarProps) => {
  const { auth } = usePuterStore();
  const hasResumes = uploadedResumes.length > 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  // Lock page scroll while the mobile menu is open, and make sure a
  // resize back up to desktop (or unmount) never leaves it locked.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`navbar ${hasResumes ? "navbar--has-resumes" : ""} ${
          isMenuOpen ? "navbar--open" : ""
        }`}
      >
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          RESMIND
        </Link>

        <div className="navbar__links">
          <NavLink
            to="#feature"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            Features
          </NavLink>

          {hasResumes && (
            <a href="#resumes" className="navbar__link active">
              Resumes
            </a>
          )}

          <NavLink
            to="#testimonials"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "active" : ""}`
            }
          >
            Testimonials
          </NavLink>
        </div>

        <Link to="/auth" className="navbar__action">
          {auth.isAuthenticated ? "Sign Out" : "Sign In"}
        </Link>

        {/* Below the breakpoint where the links + action button no
            longer fit, this replaces them — everything moves into the
            dropdown menu instead. */}
        <button
          type="button"
          className="navbar__toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <>
              Close
              <span className="navbar__toggle-icon" aria-hidden="true">
                ✕
              </span>
            </>
          ) : (
            <span className="navbar__hamburger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          )}
        </button>
      </nav>

      {/* Dimmed backdrop + dropdown card. Always in the DOM (not
          conditionally rendered) so the open/close state can transition
          with CSS instead of popping in and out. */}
      <button
        type="button"
        className={`navbar__scrim ${isMenuOpen ? "navbar__scrim--visible" : ""}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMenu}
      />

      <div
        className={`navbar__menu ${isMenuOpen ? "navbar__menu--open" : ""}`}
        role="menu"
      >
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `navbar__menu-link ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          Features
        </NavLink>

        {hasResumes && (
          <a href="#resumes" className="navbar__menu-link" onClick={closeMenu}>
            Resumes
          </a>
        )}

        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            `navbar__menu-link ${isActive ? "active" : ""}`
          }
          onClick={closeMenu}
        >
          Testimonials
        </NavLink>

        <Link
          to="/auth"
          className="navbar__menu-link navbar__menu-link--primary"
          onClick={closeMenu}
        >
          {auth.isAuthenticated ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </>
  );
};

export default Navbar;
