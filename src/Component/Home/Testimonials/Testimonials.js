import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader/Loader";
import "./testimonials.css";
import { MdArrowForward, MdArrowOutward } from "react-icons/md";

const Testimonials = ({ limit }) => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    import("./testimonialDetails.json")
      .then((data) => {
        setTestimonialData(data.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("appear");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
  
      cardsRef.current.forEach((item) => {
        if (item) observer.observe(item);
      });
  
      return () => {
        cardsRef.current.forEach((item) => {
          if (item) observer.unobserve(item);
        });
      };
    }, [testimonialData]);

  if (loading) {
    return <Loader />;
  }

  const displayedTestimonials = limit
    ? testimonialData.slice(0, limit)
    : testimonialData;

  return (
    <>
      <div className="exp-title">
        <h1 className="title name skill-title">Testimonials</h1>
      </div>
      <div className="testimonials_section">
        {displayedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card exp-text-box"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div>
              <p
                className="testimonial-text"
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

      {limit && testimonialData.length > limit && (
        <div className="see-more-container">
          <button
            className="btn btn-color-1"
            onClick={() => navigate("/testimonials")}
            
          >
            See More <MdArrowForward className="btn-icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default Testimonials;
