import React from "react";
import "./testimonials.css";

const TEXT_LINE_WIDTHS = ["100%", "95%", "90%", "85%", "75%", "55%"];

const TestimonialSkeletonCard = () => (
  <div className="testimonial-skeleton-card exp-text-box" aria-hidden="true">
    <div className="testimonial-skeleton-text">
      {TEXT_LINE_WIDTHS.map((width, index) => (
        <div
          key={index}
          className="testimonial-skeleton-bar"
          style={{ width }}
        />
      ))}
    </div>
    <div className="testimonial-skeleton-author">
      <div className="testimonial-skeleton-bar testimonial-skeleton-bar--name" />
      <div className="testimonial-skeleton-bar testimonial-skeleton-bar--role" />
    </div>
  </div>
);

const TestimonialsSkeleton = ({ count = 4 }) => {
  return (
    <>
      <div className="exp-title">
        <h1 className="title name skill-title">Testimonials</h1>
      </div>
      <div
        className="testimonials_section"
        aria-busy="true"
        aria-label="Loading testimonials"
      >
        {Array.from({ length: count }, (_, index) => (
          <TestimonialSkeletonCard key={index} />
        ))}
      </div>
    </>
  );
};

export default TestimonialsSkeleton;
