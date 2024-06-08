import React from "react";
import "./experience.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
import TM from "../../assets/tm.webp";
import INEURON from "../../assets/ineuron.jpg";

const Experience = () => {
  return (
    <div className="exp">
      <div className="exp-title">
        <h1 className="title name">Experience</h1>
      </div>

      <div className="timeline">
        <div className="container left-container">
        <img src={TM} alt="TechM" />
          <div className="text-box">
            <h2>Tech Mahindra</h2>
            <p className="designation">Associate Software Engineer</p>
            <small>
              <FaCalendarAlt className="btn-icon" /> Mar 2024 - Present
            </small>
            <div>
              <h3>XDS</h3>
              <p>
              <FaCircleChevronRight className="exp-icon"/> Currently doing training on frontend development (HTML, CSS,
                JavaScript, ReactJS, Shopify partner, Liquid and, other
                frameworks).
              </p>
            </div>
            <div>
              <h3>Foundation Training</h3>
              <p>
              <FaCircleChevronRight className="exp-icon"/> Trained on HTML, CSS, JavaScript, Basic Python, Agile & Scrum,
                Linux and Shell, DSA and, SQL.
              </p>
            </div>
          </div>
        </div>

        <div className="container right-container">
        <img src={INEURON} alt="iNeuron" />
          <div className="text-box">
            <h2>iNeuron.ai</h2>
            <p className="designation">Full Stack Developer Intern</p>
            <small>
              <FaCalendarAlt className="btn-icon" /> Jul 2023 - Sep 2023
            </small>
            <div>
              <h3>ReactJS</h3>
              <h3>NodeJS</h3>
              <h3>ExpressJS</h3>
              <h3>Redux</h3>
              <h3>Mongodb</h3>
              <p>
              <FaCircleChevronRight className="exp-icon"/> Developed a MERN Stack E-Commerce web app includes user
                authentication, payment method, and a powerful admin panel.
              </p>
            </div>
            <div>
              <p>
              <FaCircleChevronRight className="exp-icon"/> The frontend is developed using ReactJS which fetches data from
                MongoDB.
              </p>
            </div>
            <div>
              <p><FaCircleChevronRight className="exp-icon"/> Implemented Redux for state management.</p>
            </div>
            <div>
              <p><FaCircleChevronRight className="exp-icon"/> Secured the application with jwt authentication.</p>
            </div>
            <div>
              <p>
              <FaCircleChevronRight className="exp-icon"/> Created an Admin Panel to manage products, users, orders, and
                roles.
              </p>
            </div>
            <div>
              <p>
              <FaCircleChevronRight className="exp-icon"/> Incorporated Stripe payment gateway for secure and seamless
                payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
