import React from "react";
import "./home.css";
import profilePic from "../../../assets/profile-pic.jpeg";
import resume from "../../../assets/Sarthak-Chatterjee Resume.pdf";
import { MdMail, MdOutlineFileDownload } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Home = () => {
  const openResume = () => {
    window.open(resume);
  };

  const goToContact = () => {
    document.location.href = "#contact";
  };

  return (
    <section id="profile">
      <div className="section__pic-container">
        <img src={profilePic} alt="Sarthak Chatterjee profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">
          I am Sarthak, a 23 years old Software Engineer. Currently, I am
          working at <span>Tech Mahindra</span> as an Associate Software
          Engineer. My expertise is in Full Stack Development. As a MERN stack
          developer with a strong passion for creating dynamic and efficient web
          applications, I am really excited to share my skills, projects and
          experiences. Hello, welcome to my space. I'm
        </p>
        <h1 className="title name">Sarthak Chatterjee</h1>
        <p className="section__text__p2">Software Engineer</p>
        <div className="btn-container">
          <button className="btn btn-color-2" onClick={openResume}>
            Download CV <MdOutlineFileDownload className="btn-icon" />
          </button>
          <button className="btn btn-color-1" onClick={goToContact}>
            Contact Info <MdMail className="btn-icon" />
          </button>
        </div>
        <div id="socials-container">
          <a
            href="https://www.linkedin.com/in/sarthak-chatterjee-/"
            target="_blank"
            className="icon icon-hover fade-in"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/sarthakc20"
            target="_blank"
            className="icon icon-hover fade-in"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
