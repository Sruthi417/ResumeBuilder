import { Link } from "react-router";
import { motion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import "./UploadedResume.scss";

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  feedback: any;
  imagePath?: string;
}

interface UploadedResumeProps {
  resumes: Resume[];
  loadingResumes: boolean;
}

/* =========================================================
   SECTION ANIMATION
========================================================= */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const UploadedResume = ({
  resumes,
  loadingResumes,
}: UploadedResumeProps) => {
  const { fs } = usePuterStore();

  const [resumeUrls, setResumeUrls] = useState<
    Record<string, string>
  >({});

  /* =========================================================
     LOAD RESUME IMAGES FROM PUTER
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const createdUrls: string[] = [];

    const loadResumes = async () => {
      const urls: Record<string, string> = {};

      for (const resume of resumes) {
        if (!resume.imagePath) continue;

        try {
          const blob = await fs.read(resume.imagePath);

          if (!blob || cancelled) continue;

          const url = URL.createObjectURL(blob);

          createdUrls.push(url);

          urls[resume.id] = url;
        } catch (error) {
          console.error(
            `Failed to load resume ${resume.id}:`,
            error
          );
        }
      }

      if (!cancelled) {
        setResumeUrls(urls);
      }
    };

    if (resumes.length > 0) {
      loadResumes();
    }

    return () => {
      cancelled = true;

      createdUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [resumes, fs]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loadingResumes) {
    return (
      <div className="uploaded-resumes-loading">
        <img
          src="/images/resume-scan-2.gif"
          alt="Loading resumes..."
        />
      </div>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

 if (!loadingResumes && resumes.length === 0) {
  return null;
}

  /* =========================================================
     SECTION
  ========================================================= */

  return (
    <motion.section
      className="uploaded-resumes"
      id="resumes"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <motion.div
        className="uploaded-resumes__header"
        variants={sectionVariants}
      >
        <h2>
          Your uploaded <span>resumes</span>
        </h2>

        <p>
          Pick a resume to view its analysis and see where
          you can improve.
        </p>
      </motion.div>


      {/* =====================================================
          RESUME GRID
      ===================================================== */}

      <motion.div
        className="uploaded-resumes__grid"
        variants={sectionVariants}
      >

        {resumes.map((resume) => {
          const resumeUrl = resumeUrls[resume.id];

          return (
            <motion.div
              key={resume.id}
              className="uploaded-resumes__item"
              variants={cardVariants}
            >

              <Link
                to={`/resume/${resume.id}`}
                className="uploaded-resume-card"
              >

                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="uploaded-resume-card__header">

                  <div className="uploaded-resume-card__title">

                    {resume.companyName && (
                      <h3>
                        {resume.companyName}
                      </h3>
                    )}

                    {resume.jobTitle && (
                      <p>
                        {resume.jobTitle}
                      </p>
                    )}

                    {!resume.companyName &&
                      !resume.jobTitle && (
                        <h3>Resume</h3>
                    )}

                  </div>

                </div>


                {/* =================================================
                    RESUME PREVIEW
                ================================================= */}

                <div className="uploaded-resume-card__preview">

                  {resumeUrl ? (
                    <img
                      src={resumeUrl}
                      alt={
                        resume.jobTitle ||
                        resume.companyName ||
                        "Uploaded resume"
                      }
                    />
                  ) : (
                    <div className="uploaded-resume-card__placeholder" />
                  )}

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="uploaded-resume-card__footer">

                  <span>
                    View analysis
                  </span>

                  <span className="uploaded-resume-card__arrow">
                    →
                  </span>

                </div>

              </Link>

            </motion.div>
          );
        })}

      </motion.div>
    </motion.section>
  );
};

export default UploadedResume;