import React from "react";
import "./footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer max-width">
      <div className="footer-line"></div>
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/sarthak-chatterjee-/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <FaLinkedin />
          </a>
          <a href="https://github.com/sarthakc20" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/sarthak_chatterjee_/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/sarthak.chatterjee.1"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <FaFacebook />
          </a>
        </div>
        <div className="footer-copy">
          &copy; Sarthak Chatterjee {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
