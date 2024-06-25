import React, { useEffect, useRef } from "react";
import "./contact.css";
import { FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const Contact = () => {

  const contactRef = useRef(null);

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

    const currentcontactRef = contactRef.current;
    if (currentcontactRef) {
      observer.observe(currentcontactRef);
    }

    return () => {
      if (currentcontactRef) {
        observer.unobserve(currentcontactRef);
      }
    };
  }, []);
  return (
    <section id="contact">
      <div className="contact-container">
        <h2 className="title name">Contact Me</h2>
        <div className="contact-inner-container" ref={contactRef}>
        <p className="contact-text">
          Feeling social? Let's connect! Whether you have a project in mind or
          just want to chat about the latest tech trends, I'm here for you.
          <br />
          <br />
          Drop me a message, and let's make something awesome together!
        </p>
        <div className="contact-socials">
          <a
            href="https://www.linkedin.com/in/sarthak-chatterjee-/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:sarthak@example.com" className="social-icon">
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/sarthak_chatterjee_/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="humor-text">
          P.S. I'm also available for impromptu coffee meetups. Just saying!
        </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
