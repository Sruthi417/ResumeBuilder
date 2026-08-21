import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import "./Hero.scss";

const logos = [
  "/redesign/logo1.png",
  "/redesign/logo2.png",
  "/redesign/logo3.png",
];

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);

const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end end"],
});

const progress = useSpring(scrollYProgress, {
  stiffness: 90,
  damping: 28,
  restDelta: 0.001,
});

const rotateX = useTransform(
  progress,
  [0, 0.85],
  [14, 0]
);

const scale = useTransform(
  progress,
  [0, 0.85],
  [0.985, 1]
);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="hero" ref={heroRef}>
      {/* =====================================================
          BLUE BACKGROUND
          Exists inside the hero only.

          Starts at 55vh and occupies the bottom 45vh
          of the first viewport.
      ===================================================== */}

      <div className="hero__blue-background" aria-hidden="true">
        <div className="hero__blue-dots" />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="hero__top-wrapper">
        <div className="hero__top">
          {/* CONTENT */}

          <motion.div
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="hero__badge" variants={itemVariants}>
              <span className="hero__badge-dot" />
              AI-powered resume analysis
            </motion.div>

            <motion.h1 variants={itemVariants}>
              Build a resume that{" "}
              <span className="highlight-word">gets</span>{" "}
              <span className="highlight-word">noticed.</span>
            </motion.h1>

            <motion.div className="hero__actions" variants={itemVariants}>
              <a href="/upload" className="hero__primary-button">
                upload Resume
                <span aria-hidden="true">→</span>
              </a>

              <a href="#how-it-works" className="hero__secondary-button">
                See how it works
              </a>
            </motion.div>
          </motion.div>

          {/* =================================================
              ILLUSTRATION
          ================================================= */}

          <motion.div
            className="hero__visual"
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.25,
            }}
          >
            <video
              className="hero__video"
              src="/redesign/video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </div>

        {/* =====================================================
            TRUST ROW
        ===================================================== */}

        <div className="hero__trust-row">
          {/* LOGOS */}

          <div className="hero__logo-window" aria-label="Trusted by candidates">
            <motion.div
              className="hero__logos"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div className="hero__logo" key={`${logo}-${index}`}>
                  <img src={logo} alt="" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* PROOF */}

          <motion.div
            className="hero__proof"
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >

            <p>
              AI resume insights built to simplify applications and make every
              submission stronger.
            </p>

            <div className="hero__rating" aria-label="4.8 rated by job seekers">
              <span aria-hidden="true">★★★★★</span>

              <strong>4.8 rated by job seekers</strong>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <motion.div className="hero__dashboard-wrapper"
        variants={itemVariants}
        initial="hidden"
        animate="show">
        <motion.div
          className="hero__dashboard"
          style={{
              rotateX,
      scale,
          }}
        >
          <img
            src="/redesign/dashboard.png"
            alt="ResMind ATS resume analysis dashboard"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
