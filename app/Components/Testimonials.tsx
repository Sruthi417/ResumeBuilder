import React from "react";
import "./Testimonials.scss";

const testimonials = [
  {
    quote: "I finally understood what was holding my resume back.",
    text:
      "Resmind pointed out gaps I had completely overlooked and gave me clear suggestions instead of generic resume advice. It made improving my resume feel much more manageable.",
    name: "Ananya M.",
    role: "Recent Graduate",
  },

  {
    quote: "The ATS feedback made a real difference.",
    text:
      "I didn’t realize how much formatting and missing keywords could affect my resume. Resmind helped me identify the issues quickly and showed me exactly what I could improve.",
    name: "Rahul K.",
    role: "Software Developer",
  },

  {
    quote: "It felt like having a second pair of eyes on my resume.",
    text:
      "The feedback was specific to my resume and the role I was targeting. I was able to turn the suggestions into practical changes instead of starting over completely.",
    name: "Meera S.",
    role: "Marketing Associate",
  },

  {
    quote: "The feedback was much more useful than I expected.",
    text:
      "Instead of simply giving me a score, Resmind explained why certain parts of my resume needed attention and what I could do to make them stronger.",
    name: "Arjun P.",
    role: "Frontend Developer",
  },

  {
    quote: "I knew my resume needed work, but not where to start.",
    text:
      "Resmind gave me a clear direction and helped me prioritize the changes that mattered most. The suggestions were simple enough to apply right away.",
    name: "Diya R.",
    role: "Job Seeker",
  },

  {
    quote: "It helped me make my experience stand out better.",
    text:
      "The personalized suggestions helped me present my skills and experience more clearly for the kind of roles I was applying to. My resume feels much more focused now.",
    name: "Nikhil S.",
    role: "Business Analyst",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="testimonials__header">

          {/* <span className="testimonials__eyebrow">
            WHAT PEOPLE SAY
          </span> */}

          <h2>
            Resumes that
           
            <span>feel</span>
            <span>feel ready.</span>
          </h2>

          <p>
            Real experiences from people who used Resmind
            to understand, improve, and strengthen their resumes.
          </p>

        </div>


        {/* =========================================
            TESTIMONIAL GRID
        ========================================= */}

        <div className="testimonials__grid">

          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card"
              key={index}
            >

              <div className="testimonial-card__top">

                <span className="testimonial-card__quote">
                  “
                </span>

                <h3>
                  {testimonial.quote}
                </h3>

                <p>
                  {testimonial.text}
                </p>

              </div>


              <div className="testimonial-card__author">

                <div className="testimonial-card__avatar">
                  {testimonial.name.charAt(0)}
                </div>

                <div className="testimonial-card__details">

                  <strong>
                    {testimonial.name}
                  </strong>

                  <span>
                    {testimonial.role}
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;