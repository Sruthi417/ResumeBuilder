import React, { useLayoutEffect, useRef, useState } from "react";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicStar, HierarchySquare3, TickCircle } from "iconsax-react";

import "./Feature.scss";

// gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   FEATURES DATA
========================================================= */

const features = [
  {
    id: "analysis",
    number: "01",

    title: "AI Resume Analysis",

    shortTitle: "AI Resume Analysis",

    description:
      "Understand what is working in your resume and what is holding it back with detailed AI-powered feedback.",

    image: "/redesign/img1.png",
  },

  {
    id: "ats",
    number: "02",

    title: "ATS Score & Optimization",

    shortTitle: "ATS Optimization",

    description:
      "Find keyword gaps, formatting issues, and missing details that could affect how your resume performs in applicant tracking systems.",

    image: "/redesign/img2.png",
  },

  {
    id: "improvement",
    number: "03",

    title: "Personalized Improvement",

    shortTitle: "Personalized Improvement",

    description:
      "Turn your resume feedback into practical improvements tailored to the role you are applying for.",

    image: "/redesign/img3.png",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeFeature, setActiveFeature] = useState(0);

  /* =======================================================
     GSAP / SCROLLTRIGGER
  ======================================================= */
  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let ticking = false;

    const updateActiveFeature = () => {
      const activationY = window.innerHeight * 0.6;

      let activeIndex = 0;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const top = card.getBoundingClientRect().top;

        if (top <= activationY) {
          activeIndex = index;
        }
      });

      setActiveFeature((prev) => {
        if (prev === activeIndex) return prev;
        return activeIndex;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveFeature);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateActiveFeature();
    };

    // Initial state
    updateActiveFeature();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =======================================================
     SCROLL TO FEATURE
  ======================================================= */

  const scrollToFeature = (index: number) => {
    const card = cardRefs.current[index];

    if (!card) return;

    const activationY = window.innerHeight * 0.6;

    const y = card.getBoundingClientRect().top + window.scrollY - activationY;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="features" id="features">
      <div className="features__container" id="feature">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="features__left">
          <div className="features__heading">
            <span className="features__eyebrow">WHY RESMIND?</span>

            <h2>
              A smarter way to
              <br />
              <span>improve your resume.</span>
            </h2>

            <p>
              Understand your resume, optimize it for ATS, and turn feedback
              into a stronger application.
            </p>
          </div>

          {/* =================================================
              FEATURE SELECTOR
          ================================================= */}

          <div className="features__selector">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                type="button"
                className={`features__selector-item ${
                  activeFeature === index ? "is-active" : ""
                }`}
                onClick={() => scrollToFeature(index)}
              >
                <span className="features__selector-icon">
                  {index === 0 && (
                    <MagicStar size={24} color="#20242b" variant="Linear" />
                  )}

                  {index === 1 && (
                    <HierarchySquare3
                      size={24}
                      color="#20242b"
                      variant="Linear"
                    />
                  )}

                  {index === 2 && (
                    <TickCircle size={24} color="#20242b" variant="Linear" />
                  )}
                </span>

                <span className="features__selector-text">
                  {feature.shortTitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="features__right">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`feature-panel ${
                activeFeature === index ? "is-active" : ""
              }`}
            >
              {/* ===========================================
                  CONTENT
              =========================================== */}

              <div className="feature-panel__content">
                <div className="feature-panel__number">{feature.number}</div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>

              {/* ===========================================
                  FEATURE IMAGE
              =========================================== */}

              <div className="feature-panel__visual">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-panel__image"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
