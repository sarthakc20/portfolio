import React, { useState } from "react";
import "./home.css";
import resume from "../../assets/Sarthak-Chatterjee-Resume-.pdf";
import { MdMail, MdOutlineFileDownload } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import Skills from "./Skills/Skills.js";
import Contact from "./Contact/Contact.js";
import Testimonials from "./Testimonials/Testimonials.js";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openResume = () => {
    window.open(resume);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const profilePic =
    "https://res.cloudinary.com/dfl9wcmy4/image/upload/f_auto,q_auto/v1/my%20portfolio/zje1qybdxdxxwenhnokh";

  // Dynamically calculate age
  const calculateAge = (birthYear, birthMonth, birthDay) => {
    const today = new Date();
    let age = today.getFullYear() - birthYear;

    // Check if birthday has occurred this year
    if (
      today.getMonth() < birthMonth - 1 ||
      (today.getMonth() === birthMonth - 1 && today.getDate() < birthDay)
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <section id="profile" className="max-width">
        <div className="section__pic-container">
          <img src={profilePic} alt="Sarthak Chatterjee profile picture" />
        </div>
        <div className="section__text">
          <p className="section__text__p1">
            I am a {calculateAge(2000, 11, 20)} years old Software Engineer
            currently working at <span>Tech Mahindra</span> as an Associate Software
            Engineer. My expertise lies in Frontend Development and Shopify
            Development, with a strong focus on building high-performance,
            scalable web applications. I am passionate about crafting seamless
            and engaging UX, and I bring solid experience in
            developing dynamic, efficient solutions across various platforms.
            I'm excited to share my skills, projects, and professional journey.
            Hello, welcome to my space. I'm
          </p>
          <h1 className="title name">Sarthak Chatterjee</h1>
          <p className="section__text__p2">Software Engineer</p>
          <div className="btn-container">
            <button className="btn btn-color-2" onClick={openResume}>
              Download CV <MdOutlineFileDownload className="btn-icon" />
            </button>
            <button className="btn btn-color-1" onClick={toggleModal}>
              Contact Info <MdMail className="btn-icon" />
            </button>
          </div>
          <div id="socials-container">
            <a
              href="https://www.linkedin.com/in/sarthak-chatterjee-/"
              target="_blank"
              className="icon icon-hover fade-in"
            >
              <FaLinkedin className="icon-color" />
            </a>
            <a
              href="https://github.com/sarthakc20"
              target="_blank"
              className="icon icon-hover fade-in"
            >
              <FaGithub className="icon-color" />
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="max-width">
        <Skills />
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Contact Info</h2>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/sarthak-chatterjee-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a href="mailto:sarthatc@gmail.com">
                <FaEnvelope /> Mail
              </a>
              <a
                href="https://www.instagram.com/sarthak_chatterjee_/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram /> Instagram
              </a>
            </div>
          </div>
        </div>
      )}

      <section id="testimonials" className="max-width">
        <Testimonials limit={4} />
      </section>

      <section id="contact" className="max-width">
        <Contact />
      </section>
    </>
  );
};

export default Home;
