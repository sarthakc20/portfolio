import React, { useEffect, useRef, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./testimonials.css";
import { MdArrowOutward } from "react-icons/md";

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);

  const testimonialsRef = useRef(null);

  useEffect(() => {
    import("./testimonialDetails.json")
      .then((data) => {
        setTestimonialData(data.default);
        setLoading(false); // Hide loader when data is ready
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false); // Hide loader even if there's an error
      });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currenttestimonialsRef = testimonialsRef.current;
    if (currenttestimonialsRef) {
      observer.observe(currenttestimonialsRef);
    }

    return () => {
      if (currenttestimonialsRef) {
        observer.unobserve(currenttestimonialsRef);
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {loading && <Loader />}
      <div className="exp-title">
        <h1 className="title name skill-title">Testimonials</h1>
      </div>
      <div className="testimonials_section" ref={testimonialsRef}>
        {testimonialData.map((testimonial, index) => (
          <div key={index} className="testimonial-card exp-text-box">
            <div>
              <p className="testimonial-text"
                dangerouslySetInnerHTML={{ __html: testimonial.testimonial }}
              />
            </div>
            <div className="testimonial-witness_name">
              <h2>
                -{" "}
                <a href={testimonial.linkedin_link} target="_blank">
                  {testimonial.witnessName} <MdArrowOutward />
                </a>
              </h2>
              <p>{testimonial.witnessDesignation}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonials;
