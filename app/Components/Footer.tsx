import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================================
          BLUE TOP / BACKGROUND
      ========================================= */}
      <div className="footer__blue">

        <div className="footer__dots" />

      </div>


      {/* =========================================
          WHITE INVERTED CONTAINER
      ========================================= */}
      <div className="footer__container">

        <div className="footer__content">

          {/* ===============================
              BRAND / NEWSLETTER
          =============================== */}
          <div className="footer__brand">

            <div className="footer__logo">
              Resmind
            </div>

            <h2>
              Stay connected
            </h2>

            <div className="footer__subscribe">

              <input
                type="email"
                placeholder="name@email.com"
              />

              <button type="button">
                Subscribe
              </button>

            </div>

            {/* Bold Resmind */}
            <div className="footer__brand-name">
              RESMIND
            </div>

            <div className="footer__socials">

              <a href="#" aria-label="Instagram">
                ◎
              </a>

              <a href="#" aria-label="LinkedIn">
                in
              </a>

              <a href="#" aria-label="X">
                𝕏
              </a>

            </div>

          </div>


          {/* ===============================
              FOOTER LINKS
          =============================== */}
          <div className="footer__links">

            <div className="footer__column">

              <h3>Product</h3>

              <a href="#">Home</a>
              <a href="#">Pricing</a>
              <a href="#">Features</a>
              <a href="#">FAQ</a>

            </div>


            <div className="footer__column">

              <h3>Company</h3>

              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Blog</a>

            </div>


            <div className="footer__column">

              <h3>More</h3>

              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>

            </div>

          </div>

        </div>


        {/* =========================================
            BOTTOM
        ========================================= */}
        <div className="footer__bottom">

          <span>
            © {new Date().getFullYear()} Resmind. All rights reserved.
          </span>

          <span>
            Built for better resumes.
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;